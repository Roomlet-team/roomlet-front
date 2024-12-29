import React, { FC, useEffect, useRef, useState } from 'react';
import stylex from '@stylexjs/stylex';
import { BookingStyles } from '../../styles/index.stylex';
import { Typography, colors } from '../../../../../public/styles/vars.stylex';
import TimeOptionList from './TimeOptionList';
import type { TimeItemType } from '../../types';
import useGetWorkspaceCongressRoomTimQuery from '../../queries/useGetMemberListQuery copy';

type BookingTimePickerProps = {
  placeholder: string;
  roomId: number;
  reserDate: string;
  startTime?: string;
  onSelect: (value: TimeItemType) => void;
};

const BookingTimePicker: FC<BookingTimePickerProps> = (props) => {
  const { placeholder, onSelect, roomId, reserDate, startTime } = props;
  const [isTimeOptionOpen, setIsTimeOptionOpen] = useState<boolean>(false);
  const [selectTime, setSelectTime] = useState<TimeItemType>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const reserDateWithoutHyphens = reserDate?.split('-').join('');

  const { data } = useGetWorkspaceCongressRoomTimQuery(roomId, reserDateWithoutHyphens, {
    ...(startTime ? { startTime: selectTime.value } : {}),
  });

  const handleClickTime = () => {
    setIsTimeOptionOpen(true);
  };

  const handleClickOutside = ({ target }) => {
    if (!timeRef.current.contains(target)) {
      setIsTimeOptionOpen(false);
    }
  };

  const handleSelectTime = (value: TimeItemType) => {
    setSelectTime(value);
    setIsTimeOptionOpen(false);
    onSelect(value);
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div {...stylex.props(BookingStyles.formItemInputWrapper, Styles.Wrapper)} ref={timeRef}>
      <button
        type="button"
        onClick={handleClickTime}
        {...stylex.props(BookingStyles.formItemInputWrapper, Typography.SubTextLargeRegular, Styles.TimePickerBtn)}
      >
        {selectTime?.name ? (
          <span {...stylex.props(BookingStyles.selectedValueText)}>{selectTime?.name}</span>
        ) : (
          placeholder
        )}
      </button>
      {isTimeOptionOpen && <TimeOptionList onSelect={handleSelectTime} data={data} reserDate={reserDate} />}
    </div>
  );
};

export default BookingTimePicker;

const Styles = stylex.create({
  Wrapper: {
    width: '100%',
    position: 'relative',
    zIndex: 1,
  },
  TimePickerBtn: {
    width: '100%',
    padding: 0,
    border: 'none',
    background: 'none',
    outline: 'none',
    color: colors.gray60,
    boxShadow: 'none',
    textAlign: 'left',
  },
});
