import React from 'react';
import stylex from '@stylexjs/stylex';
import GnbNavLayout from '@src/layouts/GnbNavLayout';
import UserGreeting from '@src/features/home/components/UserGreeting';
import MeetingStatus from '@src/features/home/components/MeetingStatus';

const Home = () => {
  console.log('');

  return (
    <GnbNavLayout backgroundColor="#FAFAFA">
      {/* 프로필 섹션 */}
      <UserGreeting />
      {/* 회의 현황 섹션 */}
      <section {...stylex.props(Styles.meetingStatusSection)}>
        <h2 {...stylex.props(Styles.sectionTitle)}>회의 현황</h2>
        <MeetingStatus />
      </section>
      {/* 타임 라인 섹션 */}
    </GnbNavLayout>
  );
};

export default Home;

const Styles = stylex.create({
  meetingStatusSection: {
    width: '100%',
    padding: '0 16px',
    marginBottom: '24px',
  },
  sectionTitle: {
    marginBottom: '16px',
    fontSize: '1.6rem',
    fontWeight: '600',
    lineHeight: '2.4rem',
    color: '#616161',
  },
});
