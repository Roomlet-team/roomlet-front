import React, { useEffect, useRef, useState } from 'react';
import stylex from '@stylexjs/stylex';
import { BookingStyles } from '../../styles/index.stylex';
import CalendarOutlined from '@src/components/icons/CalendarOutlined';
import dayjs from 'dayjs';
import { Typography, colors } from '../../../../../public/styles/vars.stylex';
import MiniCalendar from './MiniCalendar';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';

const BookingDatePicker = () => {
  const { selectBookingDate } = useSelector((state: RootState) => state.booking);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleOutSideClick = (e: React.MouseEvent) => {
    console.log(calendarRef.current, e.target);
    if (calendarRef.current === e.target) {
      setIsCalendarOpen(false);
    }
  };

  const handleClickDate = () => {
    setIsCalendarOpen(true);
  };

  const handleCloseCalendar = (status: boolean) => {
    setIsCalendarOpen(status);
  };

  return (
    <div {...stylex.props(Styles.Wrapper, BookingStyles.formItemInputWithIconWrapper)} ref={calendarRef}>
      <button type="button" {...stylex.props(Styles.DatePickerBtn)} onClick={handleClickDate}>
        <CalendarOutlined width={24} height={24} />
        <span {...stylex.props(Styles.dateText, Typography.SubTextLargeRegular)}>
          {selectBookingDate ? dayjs(selectBookingDate).format('YYYY-MM-DD') : '날짜'}
        </span>
      </button>
      {isCalendarOpen && <MiniCalendar onClose={handleCloseCalendar} />}
    </div>
  );
};

export default BookingDatePicker;

const Styles = stylex.create({
  Wrapper: {
    width: '150px',
    position: 'relative',
    zIndex: 2,
  },
  dateText: {
    color: colors.gray60,
  },
  DatePickerBtn: {
    padding: 0,
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    outline: 'none',
  },
});
