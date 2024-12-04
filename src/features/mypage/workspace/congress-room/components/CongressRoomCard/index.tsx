import React, { FC, useCallback, useState } from 'react';
import stylex from '@stylexjs/stylex';
import { colors, Shadows, Typography } from '../../../../../../../public/styles/vars.stylex';
import { CongressRoomInfoItem } from '@src/queries/congress/useGetCongressRoomListQuery';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { saveCongressRoomList, tempRemoveCongressRoom } from '../../slice/congressRoom';
import CircleCloseFilled from '@src/components/icons/CircleCloseFilled';
import { editCongressRoomItem } from '../../types/congressRoom';

interface CongressRoomCardProps {
  data: editCongressRoomItem;
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

  const handleClickTempDelete = () => {
    dispatch(tempRemoveCongressRoom(data.tempRoomId ? { tempRoomId: data.tempRoomId } : { ...data }));
  };

  return (
    <div {...stylex.props(Styles.Container(isEdit))}>
      <img src={meetingRoomCubeImgUrl} width={24} height={24} />
      <div {...stylex.props(Styles.InputAndRemoveContainer)}>
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

        {/* 임시 제거 */}
        {isEdit && (
          <button type="button" onClick={handleClickTempDelete}>
            <CircleCloseFilled width={24} height={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CongressRoomCard;

const Styles = stylex.create({
  Container: (isEdit: boolean) => ({
    padding: '16px',
    display: 'flex',
    gap: '12px',
    boxShadow: isEdit ? Shadows.Shadow1 : `inset 0 0 0 1px ${colors.gray20}`,
    borderRadius: '16px',
    background: colors.white500,
  }),
  InfoContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  TextInput: {
    width: '100%',
    padding: '4px 8px',
    background: colors.gray20,
    border: 'none',
    borderRadius: '4px',
  },
  InputAndRemoveContainer: {
    width: '100%',
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  },
});
