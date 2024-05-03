import React, { FC, useEffect, useRef, useState } from 'react';
import stylex from '@stylexjs/stylex';
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { colors } from '../../../../../../public/styles/vars.stylex';

type MiniCalendarProps = {
  onClose: (status: boolean) => void;
};

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const MiniCalendar: FC<MiniCalendarProps> = (props) => {
  const [value, onChange] = useState<Value>(new Date());
  const [year, setYear] = useState<number>(dayjs().year());
  const [month, setMonth] = useState<number>(dayjs().month());
  const [day, setDay] = useState<number>(dayjs().date());

  const handleFormatDay = (locale, date) => dayjs(date).format('D');

  const handleFormatWeekday = (locale, date) => {
    // 해당 코드가 실행되지 않음.
    const day = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    console.log(['S', 'M', 'T', 'W', 'T', 'F', 'S'][Number(dayjs(date).format('d'))]);
    console.log(day[Number(dayjs(date).format('d'))], Number(dayjs(date).format('d')), 'dd');
    return day[Number(dayjs(date).format('d'))];
  };

  const handleClickPrevMonth = (e) => {
    const subtractMonthDate = dayjs(`${year}-${month}`).subtract(1, 'month').format('YYYY-M').split('-');
    const prevYear = subtractMonthDate[0];
    const prevMonth = subtractMonthDate[1];

    setYear(+prevYear);
    setMonth(+prevMonth);
  };

  const handleClickNextMonth = () => {
    const addMonthDate = dayjs(`${year}-${month}`).add(1, 'month').format('YYYY-M').split('-');
    const addYear = addMonthDate[0];
    const addMonth = addMonthDate[1];

    setYear(+addYear);
    setMonth(+addMonth);
  };

  return (
    <div {...stylex.props(Styles.Wrapper)}>
      <button type="button" onClick={handleClickPrevMonth}>
        이전
      </button>
      <button type="button" onClick={handleClickNextMonth}>
        다음
      </button>
      <Calendar
        onChange={onChange}
        value={new Date(year, month, day)}
        showNavigation={false}
        formatDay={handleFormatDay}
        formatWeekday={handleFormatWeekday}
        locale="en-GB"
        activeStartDate={new Date(year, month, day)}
        calendarType="gregory" // 일주일의 시작이 sun으로 시작되게 수정
      />
    </div>
  );
};

export default MiniCalendar;

const Styles = stylex.create({
  Wrapper: {
    width: '328px',
    position: 'absolute',
    background: colors.white500,
  },
});
