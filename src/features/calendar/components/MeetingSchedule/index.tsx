import React from 'react';
import stylex from '@stylexjs/stylex';

const MeetingSchedule = () => {
  return (
    <div {...stylex.props(Styles.container)}>
      <h3 {...stylex.props(Styles.selectedDateTitle)}>7.수</h3>
      <div {...stylex.props(Styles.meetingListContent)}>
        <div {...stylex.props(Styles.meetingContent)}>
          <div {...stylex.props(Styles.meetingCategoryLine)} />
          <div {...stylex.props(Styles.detailContent)}>
            <div {...stylex.props(Styles.infoContent)}>
              <p {...stylex.props(Styles.titleText)}>룸렛 회의</p>
              <p {...stylex.props(Styles.timeText)}>9시 ~ 10시</p>
            </div>
            <div {...stylex.props(Styles.categoryTag)}>기획</div>
          </div>
        </div>
        <div {...stylex.props(Styles.meetingContent)}>
          <div {...stylex.props(Styles.meetingCategoryLine)} />
          <div {...stylex.props(Styles.detailContent)}>
            <div {...stylex.props(Styles.infoContent)}>
              <p {...stylex.props(Styles.titleText)}>룸렛 회의</p>
              <p {...stylex.props(Styles.timeText)}>9시 ~ 10시</p>
            </div>
            <div {...stylex.props(Styles.categoryTag)}>기획</div>
          </div>
        </div>
        <div {...stylex.props(Styles.meetingContent)}>
          <div {...stylex.props(Styles.meetingCategoryLine)} />
          <div {...stylex.props(Styles.detailContent)}>
            <div {...stylex.props(Styles.infoContent)}>
              <p {...stylex.props(Styles.titleText)}>룸렛 회의</p>
              <p {...stylex.props(Styles.timeText)}>9시 ~ 10시</p>
            </div>
            <div {...stylex.props(Styles.categoryTag)}>기획</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingSchedule;

const Styles = stylex.create({
  container: {
    width: '100%',
    height: 'calc(100vh - 549px)',
    padding: '16px',
    borderTop: '1px solid #E2E2E2',
    overflowY: 'auto',
  },
  selectedDateTitle: {
    paddingBottom: '16px',
    fontSize: '2rem',
    fontWeight: '700',
    lineHeight: '2.6rem',
  },
  meetingListContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  meetingContent: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    gap: '16px',
  },
  meetingCategoryLine: {
    width: '4px',
    borderRadius: '20px',
    backgroundColor: 'var(--Red-300)',
  },
  detailContent: { width: '100%', display: 'flex', justifyContent: 'space-between' },
  infoContent: { display: 'flex', flexDirection: 'column', gap: '8px' },
  titleText: { fontSize: '1.6rem', fontWeight: '500', lineHeight: '2.4rem' },
  timeText: { fontSize: '1.4rem', fontWeight: '400', lineHeight: '2rem', color: 'var(--Gray-10)' },
  categoryTag: {
    padding: '4px 8px',
    alignSelf: 'center',
    backgroundColor: 'var(--Red-300)',
    borderRadius: '20px',
    fontSize: '1.2rem',
    fontWeight: 500,
    lineHeight: '100%',
    color: 'var(--Base-White)',
  },
});
