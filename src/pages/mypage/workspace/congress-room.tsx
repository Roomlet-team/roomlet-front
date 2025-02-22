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
import PlusOutlined from '@src/components/icons/PlusOutlined';
import MainLayout from '@src/layouts/MainLayout';
import useRenderModal from '@src/hooks/ui/useRenderModal';
import AddCongressRoomBottomSheet from '@src/features/mypage/workspace/congress-room/components/AddCongressRoomBottomSheet';
import usePutCongressRoomQuery from '@src/features/mypage/workspace/congress-room/queries/usePutCongressRoomQuery';
import useGetMypageInfoQuery from '@src/features/mypage/queries/useGetMypageInfoQuery';

const MeetingRoom = () => {
  const { data: myInfoData } = useGetMypageInfoQuery();
  const { data } = useGetCongressRoomListQuery();
  const mutation = usePutCongressRoomQuery();
  const dispatch = useDispatch();
  const { editCongressRoomList, tempDeleteCongressRoomList } = useSelector((state: RootState) => state.congressRoom);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { renderModal } = useRenderModal();

  const completeBtnProps = {
    name: isEdit ? '완료' : '수정',
    isActive: isEdit,
    onClick: () => {
      const removeTempRoomIdCongressRoomList = editCongressRoomList.map((item) => {
        const { tempRoomId = null, ...anotherItem } = item;

        return tempRoomId ? anotherItem : item;
      });

      if (isEdit) {
        mutation.mutate({
          congressRoomList: removeTempRoomIdCongressRoomList,
          deleteCongressRoomList: tempDeleteCongressRoomList,
        });
      }
      setIsEdit(!isEdit);
    },
  };

  const handleClickAddCongressRoom = () => {
    renderModal(AddCongressRoomBottomSheet, null);
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(saveCongressRoomList(data.congressRoomList));
    }
  }, [isEdit]);

  return (
    <MainLayout backgroundColor="#FAFAFA">
      <Header
        title="회의실"
        prevUrl="/mypage/workspace"
        {...(myInfoData?.myInfo?.isAdmin ? { rightBtnInfo: completeBtnProps } : {})}
      />

      <div {...stylex.props(Styles.Container)}>
        {/* 회의실 개수 */}
        <div {...stylex.props(Styles.TotalCountWrapper, Typography.TextSmallMedium)}>
          전체 회의실{' '}
          <span {...stylex.props(Styles.Count)}>{isEdit ? editCongressRoomList?.length : data?.congressRoomCount}</span>
        </div>

        {/* 회의실 목록 */}
        <div {...stylex.props(Styles.RoomListWrapper)}>
          {isEdit
            ? // 수정 상태 일 때
              editCongressRoomList?.map((item) => <CongressRoomCard data={item} isEdit={isEdit} />)
            : // 수정 상태가 아닐 때
              data?.congressRoomList?.map((item) => <CongressRoomCard data={item} />)}
        </div>

        {/* 회의실 추가 */}
        {isEdit && (
          <button
            type="button"
            {...stylex.props(Styles.AddCongressRoomBtn, Typography.TextSmallMedium)}
            onClick={handleClickAddCongressRoom}
          >
            <PlusOutlined width={24} height={24} />
            <span>회의실 추가</span>
          </button>
        )}
      </div>
    </MainLayout>
  );
};

export default MeetingRoom;

const Styles = stylex.create({
  Container: {
    width: '100%',
    height: 'calc(100vh - 60px)',
    position: 'relative',
    padding: '16px',
    marginBottom: '24px',
    overflowY: 'auto',
  },
  TotalCountWrapper: {
    paddingBottom: '16px',
  },
  RoomListWrapper: {
    height: 'calc(100vh - 212px)',
    marginBottom: '24px',
    display: 'flex',
    gap: '12px',
    flexDirection: 'column',
  },
  Count: {
    color: colors.red500,
  },
  AddCongressRoomBtn: {
    width: '100%',
    padding: '16px',
    position: 'sticky',
    bottom: '8px',
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    alignItems: 'center',
    background: colors.red500,
    color: colors.white500,
    borderRadius: '20px',
  },
});
