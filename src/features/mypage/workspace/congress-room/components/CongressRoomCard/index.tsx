import React, { FC, useCallback, useState } from 'react';
import stylex from '@stylexjs/stylex';
import { colors, Typography } from '../../../../../../../public/styles/vars.stylex';
import { CongressRoomInfoItem } from '@src/queries/congress/useGetCongressRoomListQuery';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { saveCongressRoomList } from '../../slice/congressRoom';

interface CongressRoomCardProps {
  data: CongressRoomInfoItem;
  isEdit?: boolean;
}

/**
 *  회의실 정보에서 보여줄 회의실 카드 컴포넌트 (회의실 이름 및 설명 수정 기능 포함)
 */
const CongressRoomCard: FC<CongressRoomCardProps> = (props) => {
  const { data, isEdit } = props;
  const dispatch = useDispatch();
  const { editCongressRoomList } = useSelector((state: RootState) => state.congressRoom);
  const meetingRoomCubeImgUrl = `${process.env.NEXT_PUBLIC_S3_URL}/public/images/mypage/meeting-room-cube.png`;

  // 회의실 이름 및 설명값 변경을 다루는 함수
  const handleChangeData = useCallback(
    (key: 'roomName' | 'roomDescription') => (e) => {
      const value = e.target.value;
      const mappingCongressRoomList = editCongressRoomList.map((item) =>
        item.RoomId === data.RoomId ? { ...item, [key]: value } : item
      );
      const index = editCongressRoomList.findIndex((item) => item.RoomId === data.RoomId);

      if (index === -1) {
        return null;
      }

      const updateCongressRoomList = [...editCongressRoomList];
      updateCongressRoomList[index] = { ...updateCongressRoomList[index], [key]: value };

      dispatch(saveCongressRoomList(mappingCongressRoomList));
    },
    [editCongressRoomList, data.RoomId, dispatch]
  );

  return (
    <div {...stylex.props(Styles.Container)}>
      <img src={meetingRoomCubeImgUrl} width={24} height={24} />
      <div {...stylex.props(Styles.InfoContainer)}>
        {isEdit ? (
          // 수정 상태일 때
          <>
            <input
              type="text"
              value={data.roomName}
              onChange={handleChangeData('roomName')}
              {...stylex.props(Styles.TextInput, Typography.TextSmallMedium)}
            />
            <input
              type="text"
              value={data.roomDescription}
              onChange={handleChangeData('roomDescription')}
              {...stylex.props(Styles.TextInput, Typography.TextSmallMedium)}
            />
          </>
        ) : (
          // 수정이 아닌 상태일 때
          <>
            <p {...stylex.props(Typography.TextSmallMedium)}>{data?.roomName}</p>
            <p {...stylex.props(Typography.SubTextLargeMedium)}>{data?.roomDescription}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CongressRoomCard;

const Styles = stylex.create({
  Container: {
    padding: '16px',
    display: 'flex',
    gap: '12px',
    border: `1px solid ${colors.gray20}`,
    borderRadius: '16px',
    background: colors.white500,
  },
  InfoContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  TextInput: {
    width: '100%',
    padding: '4px',
    background: colors.gray20,
    border: 'none',
  },
});
