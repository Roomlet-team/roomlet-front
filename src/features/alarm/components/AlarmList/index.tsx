import React from 'react';
import stylex from '@stylexjs/stylex';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Typography, colors } from '../../../../../public/styles/vars.stylex';
import CloseOutlined from '@src/components/icons/CloseOutlined';
import useGetNotificationsInfiniteQuery from '@src/queries/alarm/useGetNotificationsInfiniteQuery';
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

  const alarmCategoryInfo = {
    reserve: { imgKey: 'public/images/alarm/checked 1.png', korean: '예약' },
    invite: { imgKey: 'public/images/alarm/plus 1.png', korean: '초대' },
    change: { imgKey: 'public/images/alarm/shuffle 1.png', korean: '변경' },
    remind: { imgKey: 'public/images/alarm/bell 1.png', korean: '리마인드' },
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  const handleAlarmClick = (e: React.MouseEvent, notificationId: number, congressId: number) => {
    e.preventDefault();
    patchNotifications({ NotificationId: notificationId, CongressId: congressId });
  };

  const handleClickDeleteAlarm = (e: React.MouseEvent, notificationId: number) => {
    e.preventDefault();
    deleteNotifications({ NotificationId: notificationId });
  };

  return (
    <ul>
      {notifications.map((item, index) => (
        <li
          key={item.NotificationId}
          // 마지막 항목에 Intersection Observer 적용
          ref={index === notifications.length - 1 ? loadMoreRef : undefined}
          {...stylex.props(AlarmStyles.Item)}
        >
          <a
            href="#"
            onClick={(e) => handleAlarmClick(e, item.NotificationId, item.CongressId)}
            {...stylex.props(AlarmStyles.Link, !item.checkedAt && AlarmStyles.NotRead)}
          >
            {/* 알람 정보 */}
            <div {...stylex.props(AlarmStyles.InfoContainer)}>
              {/* 읽었는지 안 읽었는지 체크하는 dot */}
              <div {...stylex.props(AlarmStyles.DotWrapper)}>
                {item.checkedAt ? '' : <span {...stylex.props(AlarmStyles.Dot)} />}
              </div>

              {/* 카테고리 이미지 */}
              <div {...stylex.props(AlarmStyles.ImgWrapper)}>
                <img
                  src={`${process.env.NEXT_PUBLIC_S3_URL}/${alarmCategoryInfo[item?.notificationType].imgKey}`}
                  alt={alarmCategoryInfo[item?.notificationType].korean}
                  width={24}
                />
              </div>

              {/* 카테고리와 알람내용, 날짜 */}
              <div>
                <p {...stylex.props(Typography.SubTextLargeMedium, AlarmStyles.CategoryText)}>
                  {alarmCategoryInfo[item?.notificationType].korean}
                </p>
                <p {...stylex.props(Typography.TextSmallMedium, AlarmStyles.ContentText)}>{item.content}</p>
                <p {...stylex.props(Typography.CaptionRegularRegular, AlarmStyles.DateText)}>
                  {dayjs(item.createdAt).fromNow()}
                </p>
              </div>
            </div>
          </a>

          {/* 알람 삭제 */}
          <button
            type="button"
            onClick={(e) => handleClickDeleteAlarm(e, item.NotificationId)}
            {...stylex.props(AlarmStyles.DeleteButton)}
          >
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
  },
  Link: {
    width: '100%',
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    textDecoration: 'none',
  },
  NotRead: {
    background: '#FFF3F3',
  },
  InfoContainer: {
    display: 'flex',
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
  ImgWrapper: {
    marginRight: '11px',
  },
  CategoryText: {
    marginBottom: '4px',
    color: colors.black300,
  },
  ContentText: {
    marginBottom: '4px',
    color: colors.black300,
  },
  DateText: {
    color: colors.gray60,
  },
  LoadingItem: {
    textAlign: 'center',
    padding: '16px',
  },
  DeleteButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    cursor: 'pointer',
  },
});
