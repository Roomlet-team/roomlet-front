import dayjs from 'dayjs';
import React, { useState } from 'react';
import stylex from '@stylexjs/stylex';

const MonthlyCalendar = () => {
  const [selectDate, setSelectDate] = useState<number>(dayjs().date());
  const dayOfTheWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const currentMonth = dayjs().month();
  const startDay = Number(dayjs().startOf('month').month(currentMonth).day()); // 1일에 해당하는 요일
  //   const endDay = Number(dayjs().endOf('month').month(currentMonth).day()); // 마지막날에 해당하는 요일
  const lastDateOfTheMonth = Number(dayjs().month(currentMonth).endOf('month').format('DD')); // 이번달의 마지막 날
  const numOfWeek = Math.floor(lastDateOfTheMonth / 7) + (startDay > 4 ? 2 : 1); // 1일이 금요일부터 시작되면 한 주를 더 해준다.
  // 지난달
  const lastDateOfTheLastMonth = Number(
    dayjs()
      .endOf('month')
      .month(currentMonth - 1 === -1 ? 11 : currentMonth - 1)
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

  return (
    <div>
      <h1 {...stylex.props(Styles.currentMonthText)}>{dayjs().format('YYYY.MM')}</h1>
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
            Array(numOfWeek)
              .fill('')
              .map((_, weekIdx) => (
                <tr {...stylex.props(Styles.weekContent)}>
                  {React.Children.toArray(
                    Array(7)
                      .fill('')
                      .map((_, dateIdx) => {
                        const dateValue = weekIdx * 7 - startDay + (dateIdx + 1);
                        // 이번달
                        if (dateValue > 0 && dateValue <= lastDateOfTheMonth) {
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
                                <span {...stylex.props(Styles.dateText)}>{dateValue + lastDateOfTheLastMonth + 2}</span>
                              </button>
                            </td>
                          );
                        }
                        // 다음달
                        if (dateValue > lastDateOfTheMonth) {
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
                                <span {...stylex.props(Styles.dateText)}>{dateValue - lastDateOfTheMonth}</span>
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
    gap: '29px',
  },
  dayText: (color) => ({
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    color,
  }),
  weekContent: {
    padding: '16px 20px',
    display: 'flex',
    gap: '29px',
  },
  dateContent: {
    width: '24px',
    height: '24px',
    display: 'flex',
    flex: 1,
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
