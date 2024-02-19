import React from 'react';
import stylex from '@stylexjs/stylex';

/**
 * 홈 화면의 타임라인을 나타내는 컴포넌트
 */
const TimeLine = () => {
  return (
    <div {...stylex.props(Styles.container)}>
      <div {...stylex.props(Styles.timeAndMeetingDivider)} />
      <div {...stylex.props(Styles.timeAndMeetingContent)}>
        <div {...stylex.props(Styles.timeContent)}>
          <span {...stylex.props(Styles.timeText)}>09:00</span>
          <div {...stylex.props(Styles.timeDot)} />
        </div>
        <div {...stylex.props(Styles.meetingContent)}>
          <div {...stylex.props(Styles.detailContent)}>
            <p {...stylex.props(Styles.titleText)}>룸렛 회의</p>
            <div {...stylex.props(Styles.categoryTag)}>기획</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;

const Styles = stylex.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    backgroundColor: '#FAFAFA',
    paddingTop: '30px',
    position: 'relative',
    borderTop: '1px solid #F2F2F2',
  },
  timeAndMeetingDivider: {
    position: 'absolute',
    top: 0,
    left: '67px',
    height: '100%',
    borderRight: '1px solid #E2E2E2',
  },
  timeAndMeetingContent: {
    padding: '0 16px',
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
  },
  timeContent: {
    display: 'flex',
    alignItems: 'center',
  },
  timeText: {
    paddingRight: '9px',
    fontSize: '1.4rem',
    fontWeight: '400',
    lineHeight: '1.8rem',
    color: '#999999',
    textAlign: 'right',
  },
  timeDot: {
    zIndex: 1,
    width: '8px',
    height: '8px',
    display: 'inline-block',
    backgroundColor: '#444444',
    borderRadius: '50%',
  },
  meetingContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  detailContent: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'var(--Base-White)',
    borderLeft: '2px solid var(--Blue-300)',
    borderRadius: '0 16px 16px 0',
  },
  titleText: {
    fontSize: '1.4rem',
    fontWeight: 700,
    lineHeight: '2rem',
    color: '#61686D',
  },
  categoryTag: {
    padding: '4px 8px',
    backgroundColor: 'var(--Blue-300)',
    borderRadius: '20px',
    fontSize: '1.2rem',
    fontWeight: 500,
    lineHeight: '100%',
    color: 'var(--Base-White)',
  },
});
