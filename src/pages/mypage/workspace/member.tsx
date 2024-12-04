import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import stylex from '@stylexjs/stylex';
import Header from '@src/components/ui/Header';
import { colors, Typography } from '../../../../public/styles/vars.stylex';
import TeamToggle from '@src/features/mypage/workspace/member/components/TeamToggle';
import useGetTeamListQuery from '@src/queries/team/useGetTeamListQuery';
import { saveTeamList } from '@src/features/mypage/workspace/member/slices/member';
import { RootState } from '@src/store';
import PlusOutlined from '@src/components/icons/PlusOutlined';
import useRenderModal from '@src/hooks/ui/useRenderModal';
import MainLayout from '@src/layouts/MainLayout';
import AddTeamBottomSheet from '@src/features/mypage/workspace/member/components/AddTeamBottomSheet';

const Member = () => {
  const { data } = useGetTeamListQuery();
  const dispatch = useDispatch();
  const { editTeamList } = useSelector((state: RootState) => state.member);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { renderModal } = useRenderModal();

  const totalMemberCount = data?.teamList?.reduce(
    (prevValue, currentValue) => prevValue + currentValue?.memberList?.length,
    0
  );

  const completeBtnProps = {
    name: isEdit ? '완료' : '수정',
    isActive: isEdit,
    onClick: () => {
      setIsEdit(!isEdit);
    },
  };

  const handleClickAddTeam = () => {
    renderModal(AddTeamBottomSheet, null);
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(saveTeamList(data.teamList));
    }
  }, [isEdit]);

  return (
    <MainLayout>
      <Header title="멤버" prevUrl="/mypage/workspace" rightBtnInfo={completeBtnProps} />
      {/* 검색 */}

      <div {...{ ...stylex.props(Styles.Container) }}>
        {/* 전체 멤버수 */}
        <div {...stylex.props(Styles.TotalCountWrapper, Typography.TextSmallMedium)}>
          전체 멤버 ({totalMemberCount})
        </div>

        {/* 팀 목록 */}
        <div {...stylex.props(Styles.TeamListContainer)}>
          {isEdit
            ? editTeamList?.map((item) => <TeamToggle key={item.TeamId} data={item} isEdit={isEdit} />)
            : data?.teamList?.map((item) => <TeamToggle key={item.TeamId} data={item} />)}
        </div>

        {/* 팀 추가 */}
        {isEdit && (
          <button
            type="button"
            {...stylex.props(Styles.AddTeamBtn, Typography.TextSmallMedium)}
            onClick={handleClickAddTeam}
          >
            <PlusOutlined width={24} height={24} />
            <span>팀 추가</span>
          </button>
        )}
      </div>
    </MainLayout>
  );
};

export default Member;

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
    padding: '16px',
  },
  TeamListContainer: {
    width: '100%',
    height: 'calc(100vh - 212px)',
    display: 'flex',
    flexDirection: 'column',
  },
  AddTeamBtn: {
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
