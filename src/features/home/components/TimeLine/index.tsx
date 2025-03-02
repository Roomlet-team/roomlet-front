import React, { useState } from 'react';
import stylex from '@stylexjs/stylex';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import useGetWorkspaceCongressListQuery from '@src/queries/workspace/useGetWorkspaceCongressListQuery';
import dayjs from 'dayjs';
import Link from 'next/link';
import { colors, Typography } from '../../../../../public/styles/vars.stylex';
import Toggle from '@src/components/ui/Toggle';

/**
 * 홈 화면의 타임라인을 나타내는 컴포넌트
 * - 워크스페이스가 존재하지 않는 경우에 대한 화면도 같이 구현함.
 */
const TimeLine = () => {
  const { isWorkspace } = useSelector((state: RootState) => state.workspace);
  const [isMyMeeting, setIsMyMeeting] = useState<boolean>(false);
  const { data } = useGetWorkspaceCongressListQuery({
    date: dayjs().format('YYYY-MM-DD'),
    ...(isMyMeeting ? { my: 1 } : {}),
  });

  const handleChangeToggle = () => {
    setIsMyMeeting(!isMyMeeting);
  };

  return (
    <>
      <div {...stylex.props(Styles.timeLineSectionHeader)}>
        <h2 {...stylex.props(Typography.SubtitleRegularSemiBold, Styles.sectionTitle)}>타임라인</h2>
        <div {...stylex.props(Typography.SubTextLargeMedium, Styles.timeLineSectionToggle)}>
          <span>나의 회의만 보기</span>
          <Toggle theme="black400" onChange={handleChangeToggle} />
        </div>
      </div>
      {isWorkspace ? (
        // 워크스페이스가 존재할 때 보여지는 타임 라인
        <div {...stylex.props(Styles.container)}>
          {/* 회의가 있는 경우에만 타임라인 구분선 표시 */}
          {data?.congressList.length > 0 && <div {...stylex.props(Styles.timeAndMeetingDivider(isWorkspace))} />}

          <div {...stylex.props(Styles.scrollContainer)}>
            {/* 회의가 있는 경우에만 타임라인 내용 표시 */}
            {data?.congressList.length > 0 ? (
              data?.congressList.map((item) => (
                <div {...stylex.props(Styles.timeAndMeetingContent)}>
                  <div {...stylex.props(Styles.timeContent)}>
                    <span {...stylex.props(Styles.timeText)}>{item.startTime}</span>
                    <div {...stylex.props(Styles.timeDot)} />
                  </div>

                  <Link href={`/reservations/${item.CongressId}`} {...stylex.props(Styles.meetingLink)}>
                    <div {...stylex.props(Styles.meetingContent)}>
                      <div {...stylex.props(Styles.detailContent(item.congressCategory.hexcode))}>
                        <p {...stylex.props(Styles.titleText)}>{item.congressTitle}</p>
                        <div {...stylex.props(Styles.categoryTag(item.congressCategory.hexcode))}>
                          {item.congressCategory.categoryName}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              // 회의가 존재하지 않을 때 보여지는 문구
              <div {...stylex.props(Styles.NoScheduleContainer)}>
                <p {...stylex.props(Typography.SubTextLargeRegular)}>
                  오늘 예정된 회의가 없어요. <br />
                  새로운 회의를 생성해보세요
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        // 워크스페이스가 존재하지 않을 때 보여지는 문구
        <div {...stylex.props(Styles.NoScheduleContainer)}>
          <p {...stylex.props(Typography.SubTextLargeRegular)}>
            오늘 예정된 회의가 없어요. <br />
            새로운 회의를 생성해보세요
          </p>
        </div>
      )}
    </>
  );
};

export default TimeLine;

const Styles = stylex.create({
  timeLineSectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
    padding: '2px 16px',
  },
  timeLineSectionToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#818181',
  },
  sectionTitle: {
    color: '#616161',
  },
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
  scrollContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    width: '100%',
    height: 'calc(100vh - 374px)',
    paddingTop: '30px',
    paddingBottom: '70px',
    position: 'absolute',
    top: 0,
    left: 0,
    overflowY: 'auto',
  },
  timeAndMeetingDivider: (isWorkspace) => ({
    position: 'absolute',
    top: 0,
    left: '67px',
    height: isWorkspace ? '100vh' : '100%',
    borderRight: '1px solid #E2E2E2',
  }),
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
    width: '47px',
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
  detailContent: (hexcode) => ({
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'var(--Base-White)',
    borderLeft: `2px solid ${hexcode}`,
    borderRadius: '0 16px 16px 0',
  }),
  titleText: {
    fontSize: '1.4rem',
    fontWeight: 700,
    lineHeight: '2rem',
    color: '#61686D',
  },
  categoryTag: (hexcode) => ({
    padding: '4px 8px',
    backgroundColor: hexcode,
    borderRadius: '20px',
    fontSize: '1.2rem',
    fontWeight: 500,
    lineHeight: '100%',
    color: 'var(--Base-White)',
  }),
  NoScheduleContainer: {
    width: '100%',
    height: 'calc(100vh - 374px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
    color: colors.gray900,
    backgroundColor: '#FAFAFA',
    position: 'relative',
    borderTop: '1px solid #F2F2F2',
    borderBottom: '1px solid #F2F2F2',
    textAlign: 'center',
  },
  meetingLink: {
    width: '100%',
    textDecoration: 'none',
  },
});
