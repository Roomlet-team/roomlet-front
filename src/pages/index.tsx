import React from 'react';
import stylex from '@stylexjs/stylex';
import GnbNavLayout from '@src/layouts/GnbNavLayout';
import UserGreeting from '@src/features/home/components/UserGreeting';
import MeetingStatus from '@src/features/home/components/MeetingStatus';
import TimeLine from '@src/features/home/components/TimeLine';

const Home = () => {
  console.log('');

  return (
    <GnbNavLayout backgroundColor="#FAFAFA">
      {/* 프로필 섹션 */}
      <section {...stylex.props(Styles.userGreetingSection)}>
        <UserGreeting />
      </section>
      {/* 회의 현황 섹션 */}
      <section {...stylex.props(Styles.meetingStatusSection)}>
        <h2 {...stylex.props(Styles.sectionTitle)}>회의 현황</h2>
        <MeetingStatus />
      </section>
      {/* 타임 라인 섹션 */}
      <section {...stylex.props(Styles.timeLineSection)}>
        <h2 {...stylex.props(Styles.sectionTitle, Styles.timeLineSectionTitle)}>타임라인</h2>
        <TimeLine />
      </section>
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
    height: '100%',
  },
  sectionTitle: {
    marginBottom: '16px',
    fontSize: '1.6rem',
    fontWeight: '600',
    lineHeight: '2.4rem',
    color: '#616161',
  },
  timeLineSectionTitle: {
    padding: '0 16px',
  },
});
