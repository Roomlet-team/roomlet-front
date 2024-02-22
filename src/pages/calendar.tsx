import React from 'react';
import GnbNavLayout from '@src/layouts/GnbNavLayout';
import MonthlyCalendar from '@src/features/calendar/components/MothlyCalendar';

const Calendar = () => {
  return (
    <GnbNavLayout>
      <MonthlyCalendar />
    </GnbNavLayout>
  );
};

export default Calendar;
