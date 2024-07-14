import React from 'react';
import stylex, { props } from '@stylexjs/stylex';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Typography, colors } from '../../../../../public/styles/vars.stylex';
import CloseOutlined from '@src/components/icons/CloseOutlined';

// fromNow를 사용하기 위해 플러그인 사용
dayjs.extend(relativeTime);

/**
 * 알람 리스트 컴포넌트
 */
const AlarmList = () => {
  const data = [
    {
      id: 1,
      isRead: false,
      category: 'reservation',
      content: `'레나'님의 회의가 예약되었어요.`,
      createdAt: '2024-05-24',
    },
    {
      id: 2,
      isRead: true,
      category: 'reservation',
      content: `'레나'님의 회의가 예약되었어요.`,
      createdAt: '2024-05-24',
    },
  ];

  const alarmCategoryInfo = {
    reservation: { imgKey: 'public/images/alarm/checked 1.png', korean: '예약' },
    invite: { imgKey: 'public/images/alarm/plus 1.png', korean: '초대' },
    change: { imgKey: 'public/images/alarm/shuffle 1.png', korean: '변경' },
    notice: { imgKey: 'public/images/alarm/volume-up 1.png', korean: '공지' },
    remind: { imgKey: 'public/images/alarm/bell 1.png', korean: '리마인드' },
  };

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id} {...stylex.props(AlarmStyles.Item, !item.isRead && AlarmStyles.NotRead)}>
          {/* 알람 정보 */}
          <div {...stylex.props(AlarmStyles.InfoContainer)}>
            {/* 읽었는지 안 읽었는지 체크하는 dot */}
            <div {...stylex.props(AlarmStyles.DotWrapper)}>
              {item.isRead ? '' : <span {...stylex.props(AlarmStyles.Dot)} />}
            </div>

            {/* 카테고리 이미지 */}
            <div {...stylex.props(AlarmStyles.ImgWrapper)}>
              <img
                src={`${process.env.NEXT_PUBLIC_S3_URL}/${alarmCategoryInfo[item.category].imgKey}`}
                alt={alarmCategoryInfo[item.category].korean}
                width={24}
              />
            </div>

            {/* 카테고리와 알람내용, 날짜 */}
            <div>
              <p {...stylex.props(Typography.SubTextLargeMedium, AlarmStyles.CategoryText)}>
                {alarmCategoryInfo[item.category].korean}
              </p>
              <p {...stylex.props(Typography.TextSmallMedium, AlarmStyles.ContentText)}>{item.content}</p>
              <p {...stylex.props(Typography.CaptionRegularRegular, AlarmStyles.DateText)}>
                {dayjs(item.createdAt).fromNow()}
              </p>
            </div>
          </div>

          {/* 알람 삭제 */}
          <button type="button">
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
    width: '100%',
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
});
