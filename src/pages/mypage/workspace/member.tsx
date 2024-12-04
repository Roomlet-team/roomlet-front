import React from 'react';
import stylex from '@stylexjs/stylex';
import GnbNavLayout from '@src/layouts/GnbNavLayout';
import Header from '@src/components/ui/Header';
import { Typography } from '../../../../public/styles/vars.stylex';
import TeamToggle from '@src/features/mypage/workspace/member/components/TeamToggle';
import useGetTeamListQuery from '@src/queries/team/useGetTeamListQuery';

const Member = () => {
  const { data } = useGetTeamListQuery();

  const totalMemberCount = data?.teamList?.reduce(
    (prevValue, currentValue) => prevValue + currentValue?.memberList?.length,
    0
  );

  return (
    <GnbNavLayout>
      <Header title="멤버" prevUrl="/mypage/workspace" rightBtnInfo={null} />
      {/* 검색 */}

      {/* 전체 멤버수 */}
      <div {...stylex.props(Styles.TotalCountWrapper, Typography.TextSmallMedium)}>전체 멤버 ({totalMemberCount})</div>

      {/* 팀 목록 */}
      <div {...stylex.props(Styles.TeamListContainer)}>
        {data?.teamList?.map((item) => <TeamToggle key={item.TeamId} data={item} />)}
      </div>
    </GnbNavLayout>
  );
};

export default Member;

const Styles = stylex.create({
  TotalCountWrapper: {
    padding: '16px',
  },
  TeamListContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});
