import dayjs from 'dayjs';
import stylex from '@stylexjs/stylex';
import React, { FC } from 'react';
import { Typography, colors } from '../../../../../../public/styles/vars.stylex';
import type { TimeItemType } from '@src/features/booking/types';

type TimeOptionListProps = {
  onSelect: (value: TimeItemType) => void;
};

const TimeOptionList: FC<TimeOptionListProps> = (props) => {
  const { onSelect } = props;
  const initTime = '2024-05-09 08:30';
  const optionList = Array(15)
    .fill('')
    .map((_, idx) => ({
      name: dayjs(initTime)
        .add(30 * idx, 'minute')
        .format('A HH:mm'), // 오전, 오후를 시간과 함께 나타냄
      value: dayjs(initTime)
        .add(30 * idx, 'minute')
        .format('HH:mm'), // 시간만 나타냄
    }));

  const handleClickTime = (timeObj: TimeItemType) => {
    onSelect(timeObj);
  };

  return (
    <div {...stylex.props(Styles.TimeListWrapper)}>
      <ul {...stylex.props(Styles.TimeList)}>
        {React.Children.toArray(
          optionList.map((item) => (
            <li {...stylex.props(Styles.TimeItem, Typography.SubTextLargeMedium)} onClick={() => handleClickTime(item)}>
              {item.name}
            </li>
          ))
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
});
