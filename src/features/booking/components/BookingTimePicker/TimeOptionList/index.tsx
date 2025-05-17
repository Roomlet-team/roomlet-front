import dayjs from 'dayjs';
import stylex from '@stylexjs/stylex';
import React, { FC } from 'react';
import { Typography, colors } from '../../../../../../public/styles/vars.stylex';
import type { TimeItemType } from '@src/features/booking/types';
import { CongressRoomTimeList } from '@src/features/booking/queries/useGetMemberListQuery copy';

type TimeOptionListProps = {
  onSelect: (value: TimeItemType) => void;
  data: CongressRoomTimeList | undefined;
};

const TimeOptionList: FC<TimeOptionListProps> = (props) => {
  const { onSelect, data } = props;
  const optionList = data?.timeList
    .map((item, idx) => {
      const displayTime = item.dateTime;

      // 현재 시간 이후의 시간들만 출력되게 구현
      return (
        item.isValid &&
        dayjs().isBefore(dayjs(displayTime)) && {
          name: `${dayjs(displayTime).format('A HH:mm')}`, // 오전, 오후를 시간과 함께 나타냄
          value: displayTime,
        }
      );
    })
    .filter((item) => !!item); // 시간 값이 존재하지 않는 요소를 걸러냄

  const handleClickTime = (timeObj: TimeItemType) => {
    onSelect(timeObj);
  };

  return (
    <div {...stylex.props(Styles.TimeListWrapper)}>
      <ul {...stylex.props(Styles.TimeList)}>
        {optionList && optionList.length > 0 ? (
          React.Children.toArray(
            optionList?.map((item) => (
              <li
                {...stylex.props(Styles.TimeItem, Typography.SubTextLargeMedium)}
                onClick={() => handleClickTime(item)}
              >
                {item.name}
              </li>
            ))
          )
        ) : (
          <li {...stylex.props(Styles.TimeItem, Styles.NoTime, Typography.SubTextLargeMedium)}>
            예약 가능한
            <br />
            시간이 없어요.
          </li>
        )}
      </ul>
    </div>
  );
};

export default TimeOptionList;

const Styles = stylex.create({
  TimeListWrapper: {
    width: '120px',
    height: '136px',
    padding: '16px 16px',
    position: 'absolute',
    top: '58px',
    left: '0',
    background: colors.white500,
    boxShadow: `inset 0 0 0 1px ${colors.gray30} `,
    overflow: 'auto',
    borderRadius: '8px',
  },
  TimeList: {
    display: 'flex',
    gap: '8px',
    flexDirection: 'column',
  },
  TimeItem: {
    padding: 0,
    border: 'none',
    background: 'none',
    outline: 'none',
    color: colors.gray900,
    cursor: 'pointer',
  },
  NoTime: {
    textAlign: 'center',
    color: colors.gray50,
  },
});
