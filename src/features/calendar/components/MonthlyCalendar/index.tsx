import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import stylex from '@stylexjs/stylex';

const MonthlyCalendar = () => {
  const [monthList, setMonthList] = useState<string[]>(['2024-02']);
  const [selectDate, setSelectDate] = useState<number>(dayjs().date());
  const dayOfTheWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const getCurrentMonth = (ym) => dayjs(ym).month();
  const getStartDay = (ym) => Number(dayjs(ym).startOf('month').month(getCurrentMonth(ym)).day()); // 1일에 해당하는 요일
  //   const endDay = Number(dayjs('2024-03').endOf('month').month(currentMonth).day()); // 마지막날에 해당하는 요일
  const getLastDateOfTheMonth = (ym) => Number(dayjs('2024-03').month(getCurrentMonth(ym)).endOf('month').format('DD')); // 이번달의 마지막 날
  const getNumOfWeek = (ym) => Math.floor(getLastDateOfTheMonth(ym) / 7) + (getStartDay(ym) > 4 ? 2 : 1); // 1일이 금요일부터 시작되면 한 주를 더 해준다.
  const getLastDateOfTheLastMonth = (ym) =>
    Number(
      dayjs(ym)
        .subtract(1, 'month')
        .endOf('month')
        .month(0 - 1 === -1 ? 11 : 0)
        .format('DD')
    ); // 지난달의 마지막 날

  const getColorDay = (day) => {
    switch (day) {
      // 일요일
      case 0:
        return 'var(--Red-300)';
      // 토요일
      case 6:
        return 'var(--Blue-300)';
      default:
        return '#5F5656';
    }
  };

  const handleClickDate = (date) => {
    setSelectDate(date);
  };

  useEffect(() => {
    setMonthList(['2024-01', ...monthList, '2024-03']);
  }, []);

  return (
    <div {...stylex.props(Styles.scrollWrapper)}>
      {monthList.map((ym) => (
        <div {...stylex.props(Styles.scrollContent)}>
          <div {...stylex.props(Styles.monthlyContent)}>
            <h1 {...stylex.props(Styles.currentMonthText)}>{dayjs(ym).format('YYYY.MM')}</h1>
            <table {...stylex.props(Styles.calenderContent)}>
              <thead>
                <tr {...stylex.props(Styles.daysContent)}>
                  {React.Children.toArray(
                    dayOfTheWeek.map((day, idx) => <th {...stylex.props(Styles.dayText(getColorDay(idx)))}>{day}</th>)
                  )}
                </tr>
              </thead>
              <tbody>
                {React.Children.toArray(
                  Array(getNumOfWeek(ym))
                    .fill('')
                    .map((_, weekIdx) => (
                      <tr {...stylex.props(Styles.weekContent)}>
                        {React.Children.toArray(
                          Array(7)
                            .fill('')
                            .map((_, dateIdx) => {
                              const dateValue = weekIdx * 7 - getStartDay(ym) + (dateIdx + 1);
                              // 이번달
                              if (dateValue > 0 && dateValue <= getLastDateOfTheMonth(ym)) {
                                return (
                                  <td {...stylex.props(Styles.dateContent)}>
                                    <button
                                      type="button"
                                      onClick={() => handleClickDate(dateValue)}
                                      {...stylex.props(
                                        Styles.currentMonthDateText(getColorDay(dateIdx)),
                                        dateValue === selectDate && Styles.selectedDate
                                      )}
                                    >
                                      <span {...stylex.props(Styles.dateText)}>{dateValue}</span>
                                    </button>
                                  </td>
                                );
                              }
                              // 지난달
                              if (dateValue <= 0) {
                                return (
                                  <td {...stylex.props(Styles.dateContent)}>
                                    <button
                                      type="button"
                                      onClick={() => handleClickDate(dateValue)}
                                      {...stylex.props(
                                        Styles.notCurrentMonthDateText,
                                        Styles.dateBtn,
                                        dateValue === selectDate && Styles.selectedDate
                                      )}
                                    >
                                      <span {...stylex.props(Styles.dateText)}>
                                        {dateValue + getLastDateOfTheLastMonth(ym)}
                                      </span>
                                    </button>
                                  </td>
                                );
                              }
                              // 다음달
                              if (dateValue > getLastDateOfTheMonth(ym)) {
                                return (
                                  <td {...stylex.props(Styles.dateContent)}>
                                    <button
                                      type="button"
                                      onClick={() => handleClickDate(dateValue)}
                                      {...stylex.props(
                                        Styles.notCurrentMonthDateText,
                                        Styles.dateBtn,
                                        dateValue === selectDate && Styles.selectedDate
                                      )}
                                    >
                                      <span {...stylex.props(Styles.dateText)}>
                                        {dateValue - getLastDateOfTheMonth(ym)}
                                      </span>
                                    </button>
                                  </td>
                                );
                              }
                            })
                        )}
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MonthlyCalendar;

const Styles = stylex.create({
  scrollWrapper: {
    display: 'flex',
    overflow: 'auto',
    scrollSnapType: 'x mandatory',
    '::-webkit-scrollbar': {
      // 스크롤바 보이지 않게 설정
      backgroundColor: 'rgba(0,0,0,0)',
    },
  },
  scrollContent: { width: '100%', height: 'auto', display: 'flex', flexShrink: 0, scrollSnapAlign: 'start' },
  monthlyContent: { width: '100%', height: '100%' },
  currentMonthText: {
    padding: '16px 20px',
    fontSize: '2rem',
    fontWeight: '700',
    lineHeight: '2.6rem',
    color: '#333333',
  },
  calenderContent: {
    width: '100%',
    fontSize: '1.6rem',
    fontWeight: '700',
    lineHeight: '2.4rem',
    color: '#5F5656',
  },
  daysContent: {
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  dayText: (color) => ({
    width: '24px',
    height: '24px',
    display: 'flex',
    justifyContent: 'center',
    color,
  }),
  weekContent: {
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  dateContent: {
    width: '24px',
    height: '24px',
    display: 'flex',
    justifyContent: 'center',
  },
  currentMonthDateText: (color) => ({
    color,
  }),
  notCurrentMonthDateText: {
    color: '#E2E2E2',
  },
  dateText: {
    paddingTop: '1px',
  },
  dateBtn: {
    width: '24px',
    height: '24px',
    background: 'none',
    border: 'none',
  },
  selectedDate: {
    width: '24px',
    height: '24px',
    display: 'flex',
    flexShrink: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: `var(--Base-White)`,
    backgroundColor: '#191616',
    borderRadius: '50%',
    fontSize: '1.4rem',
    lineHeight: '1rem',
    fontWeight: '600',
  },
});
