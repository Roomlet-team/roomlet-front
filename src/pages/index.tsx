import React, { useState } from 'react';
import stylex from '@stylexjs/stylex';
import GnbNavLayout from '@src/layouts/GnbNavLayout';
import WorkspaceUserGreeting from '@src/features/home/components/UserGreeting/workspaceUser';
import NonWorkspaceUserGreeting from '@src/features/home/components/UserGreeting/nonWorkspaceUser';
import MeetingStatus from '@src/features/home/components/MeetingStatus';
import TimeLine from '@src/features/home/components/TimeLine';
import { colors, Typography } from '../../public/styles/vars.stylex';
import PlusOutlined from '@src/components/icons/PlusOutlined';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';

const Home = () => {
  const { isWorkspace } = useSelector((state: RootState) => state.workspace);

  return (
    <GnbNavLayout backgroundColor="#FAFAFA">
      {/* 프로필 섹션 */}
      <section {...stylex.props(Styles.userGreetingSection)}>
        {isWorkspace ? <WorkspaceUserGreeting /> : <NonWorkspaceUserGreeting />}
      </section>
      {/* 회의 현황 섹션 */}
      <section {...stylex.props(Styles.meetingStatusSection)}>
        <h2 {...stylex.props(Styles.sectionTitle)}>회의 현황</h2>
        <MeetingStatus />
      </section>
      {/* 타임 라인 섹션 */}
      <section {...stylex.props(Styles.timeLineSection)}>
        <TimeLine />
      </section>

      {/* 워크스페이스가 없는 경우 */}
      {!isWorkspace && (
        <div {...stylex.props(Styles.CreateWorkspaceBtnWrapper)}>
          {/* 워크스페이스 등록하기 버튼 */}
          <Link
            href="/mypage/create-workspace"
            {...stylex.props(Typography.SubtitleSmallBold, Styles.CreateWorkspaceBtn)}
          >
            <PlusOutlined width={24} height={24} />
            워크스페이스 등록하기
          </Link>
        </div>
      )}
    </GnbNavLayout>
  );
};

export default Home;

const Styles = stylex.create({
  userGreetingSection: {
    width: '100%',
    padding: '0 16px',
    paddingTop: '16px',
    marginBottom: '32px',
  },
  meetingStatusSection: {
    width: '100%',
    padding: '0 16px',
    marginBottom: '24px',
  },
  timeLineSection: {
    height: 'fit-content',
  },
  sectionTitle: {
    marginBottom: '16px',
    fontSize: '1.6rem',
    fontWeight: '600',
    lineHeight: '2.4rem',
    color: '#616161',
  },
  CreateWorkspaceBtnWrapper: {
    position: 'relative',
    padding: '0 16px',
  },
  CreateWorkspaceBtn: {
    maxWidth: '735px',
    width: 'calc(100% - 32px)',
    padding: '15px',
    position: 'fixed',
    bottom: '101px',
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '16px',
    background: colors.gray900,
    color: colors.white500,
    textDecoration: 'none',
  },
});
