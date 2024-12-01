import React, { useEffect, useState } from 'react';
import stylex from '@stylexjs/stylex';
import GnbNavLayout from '@src/layouts/GnbNavLayout';
import Header from '@src/components/ui/Header';
import useGetCongressRoomListQuery from '@src/queries/congress/useGetCongressRoomListQuery';
import CongressRoomCard from '@src/features/mypage/workspace/congress-room/components/CongressRoomCard';
import { colors, Typography } from '../../../../public/styles/vars.stylex';
import { useDispatch, useSelector } from 'react-redux';
import { saveCongressRoomList } from '@src/features/mypage/workspace/congress-room/slice/congressRoom';
import { RootState } from '@src/store';

const MeetingRoom = () => {
  const { data } = useGetCongressRoomListQuery();
  const dispatch = useDispatch();
  const { editCongressRoomList } = useSelector((state: RootState) => state.congressRoom);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const completeBtnProps = {
    name: isEdit ? '완료' : '수정',
    isActive: isEdit,
    onClick: () => {
      setIsEdit(!isEdit);
    },
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(saveCongressRoomList(data.congressRoomList));
    }
  }, [isEdit]);

  return (
    <GnbNavLayout backgroundColor="#FAFAFA">
      <Header title="회의실" prevUrl="/mypage/workspace" rightBtnInfo={completeBtnProps} />

      {/* 회의실 개수 */}
      <div {...stylex.props(Styles.TotalCountWrapper, Typography.TextSmallMedium)}>
        전체 회의실 <span {...stylex.props(Styles.Count)}>{data?.congressRoomCount}</span>
      </div>

      {/* 회의실 목록 */}
      <div {...stylex.props(Styles.RoomListWrapper)}>
        {isEdit
          ? // 수정 상태 일 때
            editCongressRoomList.map((item) => <CongressRoomCard data={item} isEdit={isEdit} />)
          : // 수정 상태가 아닐 때
            data?.congressRoomList.map((item) => <CongressRoomCard data={item} />)}
      </div>
    </GnbNavLayout>
  );
};

export default MeetingRoom;

const Styles = stylex.create({
  TotalCountWrapper: {
    padding: '16px',
  },
  RoomListWrapper: {
    padding: '0 16px',
    display: 'flex',
    gap: '12px',
    flexDirection: 'column',
  },
  Count: {
    color: colors.red500,
  },
});
