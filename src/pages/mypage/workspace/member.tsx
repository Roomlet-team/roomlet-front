import React from 'react';
import stylex from '@stylexjs/stylex';
import Header from '@src/components/ui/Header';
import { colors, Typography } from '../../../../public/styles/vars.stylex';
import TeamToggle from '@src/features/mypage/workspace/member/components/TeamToggle';
import useGetTeamListQuery from '@src/queries/team/useGetTeamListQuery';
import PlusOutlined from '@src/components/icons/PlusOutlined';
import useRenderModal from '@src/hooks/ui/useRenderModal';
import MainLayout from '@src/layouts/MainLayout';
import AddTeamBottomSheet from '@src/features/mypage/workspace/member/components/AddTeamBottomSheet';
import useGetMypageInfoQuery from '@src/features/mypage/queries/useGetMypageInfoQuery';

const Member = () => {
  const { data: myInfoData } = useGetMypageInfoQuery();
  const { data } = useGetTeamListQuery();
  const { renderModal } = useRenderModal();

  const totalMemberCount = data?.teamList?.reduce(
    (prevValue, currentValue) => prevValue + currentValue?.memberList?.length,
    0
  );

  const handleClickAddTeam = () => {
    renderModal(AddTeamBottomSheet, null);
  };

  return (
    <MainLayout>
      <Header title="멤버" prevUrl="/mypage/workspace" />
      {/* 검색 */}

      <div {...{ ...stylex.props(Styles.Container) }}>
        {/* 전체 멤버수 */}
        <div {...stylex.props(Styles.TotalCountWrapper, Typography.TextSmallMedium)}>
          전체 멤버 ({totalMemberCount})
        </div>

        {/* 팀 목록 */}
        <div {...stylex.props(Styles.TeamListContainer)}>
          {data?.teamList?.map((item, idx) => <TeamToggle key={item.TeamId} data={item} teamIdx={idx} />)}
        </div>

        {/* 팀 추가 */}
        {['admin', 'owner'].includes(myInfoData?.myInfo.role) && (
          <div {...stylex.props(Styles.AddTeamBtnContainer)}>
            <button
              type="button"
              {...stylex.props(Styles.AddTeamBtn, Typography.TextSmallMedium)}
              onClick={handleClickAddTeam}
            >
              <PlusOutlined width={24} height={24} />
              <span>팀 추가</span>
            </button>
          </div>
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
    overflowY: 'auto',
  },
  TotalCountWrapper: {
    padding: '16px',
  },
  TeamListContainer: {
    width: '100%',
    // height: 'calc(100vh - 400px)',
    marginBottom: '80px',
    display: 'flex',
    flexDirection: 'column',
  },
  AddTeamBtnContainer: {
    width: 'calc(100% - 32px)',
    maxWidth: '735px',
    padding: '16px',
    position: 'fixed',
    bottom: '0',
    background: colors.white500,
  },
  AddTeamBtn: {
    width: '100%',
    padding: '16px',
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    alignItems: 'center',
    background: colors.red500,
    color: colors.white500,
    borderRadius: '20px',
  },
});
