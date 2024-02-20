import dayjs from 'dayjs';
import React from 'react';
import stylex from '@stylexjs/stylex';

const MonthlyCalendar = () => {
  return (
    <div>
      <h1 {...stylex.props(Styles.currentMonthText)}>{dayjs().format('YYYY.MM')}</h1>
    </div>
  );
};

export default MonthlyCalendar;

const Styles = stylex.create({
  wrapper: (backgroundColor) => ({ backgroundColor, height: '100%', paddingBottom: '90px' }),
  currentMonthText: {
    padding: '16px 20px',
    fontSize: '2rem',
    fontWeight: '700',
    lineHeight: '2.6rem',
    color: '#333333',
  },
});
