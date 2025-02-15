import React, { useState } from 'react';
import stylex from '@stylexjs/stylex';
import GnbNavLayout from '@src/layouts/GnbNavLayout';
import MonthlyCalendar from '@src/features/calendar/components/MonthlyCalendar';
import MeetingSchedule from '@src/features/calendar/components/MeetingSchedule';
import CirclePlusFilled from '@src/components/icons/CirclePlusFilled';
import Link from 'next/link';
import dayjs from 'dayjs';

const Calendar = () => {
  const [selectDate, setSelectDate] = useState<string>(dayjs().format('YYYY-MM-DD'));

  const handleSelectDate = (date: string) => {
    setSelectDate(date);
  };

  return (
    <GnbNavLayout>
      {/* 월간 캘린더 */}
      <MonthlyCalendar onSelectDate={handleSelectDate} />
      {/* 캘린더에서 선택한 날짜에 대한 회의 리스트 보는 영역 */}
      <MeetingSchedule selectDate={selectDate} />

      {/* 예약하기 링크 (플로팅) */}
      <div {...stylex.props(Styles.CreateReservationWrapper)}>
        <Link href="/booking">
          <CirclePlusFilled width={56} height={56} />
        </Link>
      </div>
    </GnbNavLayout>
  );
};

export default Calendar;

const Styles = stylex.create({
  CreateReservationWrapper: {
    position: 'absolute',
    bottom: '90px',
    right: '16px',
    zIndex: 1,
  },
});
