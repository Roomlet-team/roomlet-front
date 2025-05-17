import React, { FC, useEffect, useRef, useState } from 'react';
import stylex from '@stylexjs/stylex';
import { BookingStyles } from '../../styles/index.stylex';
import { Typography, colors } from '../../../../../public/styles/vars.stylex';
import TimeOptionList from './TimeOptionList';
import type { TimeItemType } from '../../types';
import useGetWorkspaceCongressRoomTimQuery from '../../queries/useGetMemberListQuery copy';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';

type BookingTimePickerProps = {
  placeholder: string;
  roomId: number | null;
  startDt?: TimeItemType;
  onSelect: (value: TimeItemType) => void;
  defaultValue: TimeItemType | null;
};

const BookingTimePicker: FC<BookingTimePickerProps> = (props) => {
  const { selectBookingDate } = useSelector((state: RootState) => state.booking);
  const { placeholder, onSelect, roomId, startDt, defaultValue } = props;
  const [isTimeOptionOpen, setIsTimeOptionOpen] = useState<boolean>(false);
  const [selectTime, setSelectTime] = useState<TimeItemType>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const reserDateWithoutHyphens = selectBookingDate?.split('-').join('');

  const { data } = useGetWorkspaceCongressRoomTimQuery(roomId, reserDateWithoutHyphens, {
    ...(startDt ? { startDtNumber: dayjs(startDt.value).valueOf() } : {}),
  });

  const handleClickTime = () => {
    setIsTimeOptionOpen(true);
  };

  const handleClickOutside = ({ target }) => {
    if (!timeRef?.current?.contains(target)) {
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

  useEffect(() => {
    if (defaultValue) {
      setSelectTime(defaultValue);
    }
  }, [defaultValue]);

  // 예약 날짜가 변경되면 선택된 시간 초기화
  useEffect(() => {
    if (selectBookingDate) {
      setSelectTime(null);
    }
  }, [selectBookingDate]);

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
      {isTimeOptionOpen && <TimeOptionList onSelect={handleSelectTime} data={data} isDate={!!selectBookingDate} />}
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
