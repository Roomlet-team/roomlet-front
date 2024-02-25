import React from 'react';
import GnbNavLayout from '@src/layouts/GnbNavLayout';
import MonthlyCalendar from '@src/features/calendar/components/MonthlyCalendar';
import MeetingSchedule from '@src/features/calendar/components/MeetingSchedule';

const Calendar = () => {
  return (
    <GnbNavLayout>
      {/* 월간 캘린더 */}
      <MonthlyCalendar />
      {/* 캘린더에서 선택한 날짜에 대한 회의 리스트 보는 영역 */}
      <MeetingSchedule />
    </GnbNavLayout>
  );
};

export default Calendar;
