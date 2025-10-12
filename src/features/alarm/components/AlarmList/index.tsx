import React from 'react';
import stylex from '@stylexjs/stylex';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Typography, colors } from '../../../../../public/styles/vars.stylex';
import CloseOutlined from '@src/components/icons/CloseOutlined';
import useGetNotificationsInfiniteQuery, { AlarmCategory } from '@src/queries/alarm/useGetNotificationsInfiniteQuery';
import useIntersectionObserver from '@src/hooks/useIntersectionObserver';
import { useAlarmCategory } from '../../contexts/AlarmCategoryContext';
import usePatchNotificationsQuery from '../../queries/usePatchNotificationsQuery';
import useDeleteNotificationsQuery from '../../queries/useDeleteNotificationsQuery';

// fromNow를 사용하기 위해 플러그인 사용
dayjs.extend(relativeTime);

/**
 * 알람 리스트 컴포넌트
 */
const AlarmList = () => {
  const { category } = useAlarmCategory();
  const { mutate: patchNotifications } = usePatchNotificationsQuery();
  const { mutate: deleteNotifications } = useDeleteNotificationsQuery();

  const { notifications, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useGetNotificationsInfiniteQuery(
    { alarmCategory: category }
  );

  const loadMoreRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  const alarmCategoryInfo: Record<
    AlarmCategory,
    { imgKey: string; korean: string; title?: string; isDisplayNameInTitle?: boolean }
  > = {
    reserve: {
      imgKey: 'public/images/alarm/checked 1.png',
      korean: '예약',
      isDisplayNameInTitle: true,
    },
    invite: {
      imgKey: 'public/images/alarm/plus 1.png',
      korean: '초대',
      isDisplayNameInTitle: true,
    },
    change: {
      imgKey: 'public/images/alarm/shuffle 1.png',
      korean: '변경',
      isDisplayNameInTitle: false,
    },
    remind: {
      imgKey: 'public/images/alarm/bell 1.png',
      korean: '리마인드',
      isDisplayNameInTitle: false,
    },
  };

  const handleAlarmClick = (e: React.MouseEvent, notificationId: number, congressId: number) => {
    e.preventDefault();
    patchNotifications({ NotificationId: notificationId, CongressId: congressId });
  };

  const handleClickDeleteAlarm = (e: React.MouseEvent, notificationId: number) => {
    e.preventDefault();
    deleteNotifications({ NotificationId: notificationId });
  };

  if (notifications.length === 0) {
    return <div {...stylex.props(AlarmStyles.EmptyText, Typography.TextSmallRegular)}>알람이 없습니다.</div>;
  }

  return (
    <ul>
      {notifications.map((item, index) => (
        <li
          key={item.NotificationId}
          // 마지막 항목에 Intersection Observer 적용
          ref={index === notifications.length - 1 ? loadMoreRef : undefined}
          {...stylex.props(AlarmStyles.Item, !item.checkedAt && AlarmStyles.NotRead)}
        >
          <a
            href="#"
            onClick={(e) => handleAlarmClick(e, item.NotificationId, item.CongressId)}
            {...stylex.props(AlarmStyles.Link)}
          >
            {/* 알람 정보 */}
            <div {...stylex.props(AlarmStyles.InfoContainer)}>
              {/* 읽었는지 안 읽었는지 체크하는 dot */}
              <div {...stylex.props(AlarmStyles.DotWrapper)}>
                {item.checkedAt ? '' : <span {...stylex.props(AlarmStyles.Dot)} />}
              </div>

              {/* 카테고리 이미지 */}
              <div {...stylex.props(AlarmStyles.CategoryImgWrapper)}>
                <img
                  src={`${process.env.NEXT_PUBLIC_S3_URL}/${alarmCategoryInfo[item?.notificationType].imgKey}`}
                  alt={alarmCategoryInfo[item?.notificationType].korean}
                  {...stylex.props(AlarmStyles.CategoryImg)}
                />
              </div>

              {/* 카테고리와 알람내용, 날짜 */}
              <div {...stylex.props(AlarmStyles.ContentContainer)}>
                <div {...stylex.props(AlarmStyles.CategoryAndDateContainer)}>
                  <span {...stylex.props(Typography.SubTextLargeMedium, AlarmStyles.CategoryText)}>
                    {alarmCategoryInfo[item?.notificationType].korean}
                  </span>
                  <span {...stylex.props(AlarmStyles.Circle)} />
                  <span {...stylex.props(Typography.CaptionRegularRegular, AlarmStyles.DateText)}>
                    {dayjs(item.createdAt).fromNow()}
                  </span>
                </div>

                <div {...stylex.props(Typography.SubtitleRegularBold, AlarmStyles.MainTitleText)}>
                  {alarmCategoryInfo[item?.notificationType].isDisplayNameInTitle ? (
                    <div {...stylex.props(AlarmStyles.DisplayNameContainer)}>
                      <span {...stylex.props(AlarmStyles.Quotes)}>{"'"}</span>
                      <span {...stylex.props(AlarmStyles.DisplayName)}>{item.congress.organizer.displayName}</span>
                      <span {...stylex.props(AlarmStyles.Quotes)}>{"'"}</span>
                    </div>
                  ) : (
                    ''
                  )}

                  <span>{item.content}</span>
                </div>

                <div {...stylex.props(AlarmStyles.CongressInfoContainer)}>
                  <p {...stylex.props(Typography.TextSmallRegular)}>회의 : {item.congress.congressTitle}</p>
                  <p {...stylex.props(Typography.TextSmallRegular)}>
                    일시 : {dayjs(item.congress.startDt).format('YYYY.MM.DD HH:mm')}
                  </p>
                </div>
              </div>
            </div>
          </a>

          {/* 알람 삭제 */}
          <button type="button" onClick={(e) => handleClickDeleteAlarm(e, item.NotificationId)}>
            <CloseOutlined width={16} height={16} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default AlarmList;

const AlarmStyles = stylex.create({
  Item: {
    position: 'relative',
    padding: '16px 12px 16px 16px',
    display: 'flex',
    alignItems: 'flex-start',
  },
  Link: {
    width: '100%',
    display: 'flex',
    minWidth: 0,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    textDecoration: 'none',
  },
  NotRead: {
    background: '#FFF3F3',
  },
  InfoContainer: {
    width: '100%',
    display: 'flex',
    minWidth: 0,
    whiteSpace: 'nowrap',
  },
  DotWrapper: {
    width: '4px',
  },
  Dot: {
    width: '4px',
    height: '4px',
    display: 'inline-block',
    background: colors.red300,
    borderRadius: '50%',
    verticalAlign: 'top',
  },
  CategoryImgWrapper: {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '11px',
  },
  CategoryImg: {
    flexShrink: 0,
  },
  CategoryText: {
    color: colors.black300,
  },
  MainTitleText: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
    paddingBottom: '6px',
    marginBottom: '6px',
    color: colors.black300,
    borderBottom: `1px solid ${colors.gray30}`,
  },
  DateText: {
    color: colors.gray60,
  },
  LoadingItem: {
    textAlign: 'center',
    padding: '16px',
  },

  Circle: {
    width: '3px',
    height: '3px',
    display: 'inline-block',
    background: colors.gray60,
  },
  CategoryAndDateContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  DisplayNameContainer: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 0, // flex item이 축소될 수 있도록 함
    whiteSpace: 'nowrap',
  },
  DisplayName: {
    flex: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  ContentContainer: {
    width: '100%',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    whiteSpace: 'nowrap',
  },
  Quotes: {
    whiteSpace: 'nowrap',
  },
  CongressInfoContainer: {
    color: colors.black300,
  },
  EmptyText: {
    textAlign: 'center',
    padding: '16px',
    color: colors.gray60,
  },
});
