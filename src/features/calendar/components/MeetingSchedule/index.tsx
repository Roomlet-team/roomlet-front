import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';
import useGetWorkspaceCongressListQuery from '@src/queries/workspace/useGetWorkspaceCongressListQuery';
import dayjs from 'dayjs';
import router from 'next/router';
import { colors } from 'public/styles/vars.stylex';

const MeetingSchedule: FC<{ selectDate: string }> = ({ selectDate }) => {
  const { data } = useGetWorkspaceCongressListQuery({
    date: selectDate,
  });

  const handleMeetingClick = (congressId: number) => {
    router.push(`/reservations/${congressId}`);
  };

  return (
    <div {...stylex.props(Styles.container)}>
      <h3 {...stylex.props(Styles.selectedDateTitle)}>{dayjs(selectDate).format('D.ddd')}</h3>
      <div {...stylex.props(Styles.meetingListContent)}>
        {data?.congressList.length > 0 ? (
          data?.congressList.map((item) => (
            <div {...stylex.props(Styles.meetingContent)} onClick={() => handleMeetingClick(item.CongressId)}>
              <div {...stylex.props(Styles.meetingCategoryLine(item.congressCategory.hexcode))} />
              <div {...stylex.props(Styles.detailContent)}>
                <div {...stylex.props(Styles.infoContent)}>
                  <p {...stylex.props(Styles.titleText('#333'))}>{item.congressTitle}</p>
                  <p {...stylex.props(Styles.timeText)}>
                    {item.startTime} ~ {item.endTime}
                  </p>
                </div>
                <div {...stylex.props(Styles.categoryTag(item.congressCategory.hexcode))}>
                  {item.congressCategory.categoryName}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div {...stylex.props(Styles.meetingContent)}>
            <div {...stylex.props(Styles.meetingCategoryLine(colors.gray40))} />
            <div {...stylex.props(Styles.detailContent)}>
              <div {...stylex.props(Styles.infoContent)}>
                <p {...stylex.props(Styles.titleText('#7D7F85'))}>회의가 없습니다</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingSchedule;

const Styles = stylex.create({
  container: {
    width: '100%',
    height: 'calc(100vh - 532px)',
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
    cursor: 'pointer',
  },
  meetingCategoryLine: (hexcode) => ({
    width: '4px',
    borderRadius: '20px',
    backgroundColor: hexcode,
  }),
  detailContent: { width: '100%', display: 'flex', justifyContent: 'space-between' },
  infoContent: { display: 'flex', flexDirection: 'column', gap: '8px' },
  titleText: (color) => ({ fontSize: '1.6rem', fontWeight: '500', lineHeight: '2.4rem', color }),
  timeText: { fontSize: '1.4rem', fontWeight: '400', lineHeight: '2rem', color: 'var(--Gray-10)' },
  categoryTag: (hexcode) => ({
    padding: '4px 8px',
    alignSelf: 'center',
    backgroundColor: hexcode,
    borderRadius: '20px',
    fontSize: '1.2rem',
    fontWeight: 500,
    lineHeight: '100%',
    color: 'var(--Base-White)',
  }),
});
