import React, { FC, useState } from 'react';
import stylex from '@stylexjs/stylex';
import ProfileImg from '@src/components/ui/ProfileImg';
import { CongressListResponse } from '@src/queries/workspace/useGetWorkspaceCongressListQuery';
import { useRouter } from 'next/router';
import MarkerPinFilled from '@src/components/icons/MarkerPinFilled';
import ClockFilled from '@src/components/icons/ClockFilled';
import CircleAlertFilled from '@src/components/icons/CircleAlertFilled';
import { Typography } from '../../../../../public/styles/vars.stylex';

interface ReservationListProps {
  data: CongressListResponse;
}

const ReservationList: FC<ReservationListProps> = (props) => {
  const { data } = props;
  const router = useRouter();

  return (
    <section {...stylex.props(Styles.wrapper)}>
      <div {...stylex.props(Styles.meetingListContent)}>
        {data?.congressList.length > 0 ? (
          data?.congressList.map((item) => (
            <div
              {...stylex.props(Styles.meetingContent(item.congressCategory.hexcode))}
              onClick={() => router.push(`/reservations/${item.CongressId}`)}
            >
              <div {...stylex.props(Styles.detailContent)}>
                <div {...stylex.props(Styles.infoContent)}>
                  <p {...stylex.props(Styles.titleText)}>{item.congressTitle}</p>

                  {/* 시간 */}
                  <div {...stylex.props(Styles.textContainer)}>
                    <ClockFilled width={14} height={14} />
                    <p {...stylex.props(Styles.timeText)}>
                      {item.startTime} ~ {item.endTime}
                    </p>
                  </div>

                  {/* 회의실 */}
                  <div {...stylex.props(Styles.textContainer)}>
                    <MarkerPinFilled width={14} height={14} />
                    <p {...stylex.props(Styles.placeText)}>{item.congressRoom.roomName}</p>
                  </div>
                  <div {...stylex.props(Styles.profileListContent)}>
                    {/* {console.log(item.attendMemberList)} */}
                    {item.attendMemberList.map((item) => (
                      <div {...stylex.props(Styles.profileContent)}>
                        <ProfileImg
                          src={item?.profileImgUrl}
                          size={34}
                          borderProperties={{ color: '#D9D9D9', width: '1px', radius: '50%' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div {...stylex.props(Styles.categoryTag(item.congressCategory.hexcode))}>
                  {item.congressCategory.categoryName}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div {...stylex.props(Styles.emptyContentContainer)}>
            <CircleAlertFilled width={64} height={64} />
            <p {...stylex.props(Typography.TextSmallRegular)}>
              참여한 회의가 없습니다.
              <br />
              워크스페이스를 생성하여 회의를 만들어주세요!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReservationList;

const Styles = stylex.create({
  wrapper: {
    height: 'calc(100vh - 77px)',
    padding: '0 16px 16px',
    overflowY: 'auto',
  },
  hidePastMeetingToggleContent: {
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignContent: 'center',
    gap: '8px',
    fontSize: '1.4rem',
    lineHeight: '2rem',
    fontWeight: 500,
    color: '#818181',
  },
  meetingListContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  meetingContent: (hexcode) => ({
    cursor: 'pointer',
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'var(--Base-White)',
    borderLeft: `2px solid ${hexcode}`,
    borderRadius: '0 16px 16px 0',
    boxShadow: '0 4px 24px 0 rgba(44, 42, 61, 0.08)',
  }),
  detailContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  infoContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  titleText: {
    fontSize: '1.7rem',
    fontWeight: 700,
    lineHeight: '2.4rem',
    color: '#61686D',
  },
  timeText: {
    fontSize: '1.4rem',
    fontWeight: 500,
    lineHeight: '1.4rem',
    color: '#D56231',
  },
  placeText: {
    fontSize: '1.4rem',
    fontWeight: 500,
    lineHeight: '1.4rem',
    color: '#BBBBBB',
  },
  categoryTag: (hexcode) => ({
    display: 'flex',
    alignSelf: 'flex-start',
    padding: '4px 8px',
    backgroundColor: hexcode,
    borderRadius: '20px',
    fontSize: '1.2rem',
    fontWeight: 500,
    lineHeight: '100%',
    color: 'var(--Base-White)',
  }),
  profileListContent: {
    marginTop: '8px',
    display: 'flex',
  },
  profileContent: {
    marginInlineStart: '-8px',
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  emptyContentContainer: {
    marginTop: '124px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '22px',
    textAlign: 'center',
  },
});
