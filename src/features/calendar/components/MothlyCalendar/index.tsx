import dayjs from 'dayjs';
import React from 'react';
import stylex from '@stylexjs/stylex';

const MonthlyCalendar = () => {
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

  return (
    <div>
      <h1 {...stylex.props(Styles.currentMonthText)}>{dayjs().format('YYYY.MM')}</h1>
      <table>
        <thead>
          <tr>{React.Children.toArray(dayOfTheWeek.map((day) => <th>{day}</th>))}</tr>
        </thead>
        <tbody>
          {React.Children.toArray(
            Array(numOfWeek)
              .fill('')
              .map((_, weekIdx) => (
                <tr>
                  {React.Children.toArray(
                    Array(7)
                      .fill('')
                      .map((_, dateIdx) => {
                        const dateValue = weekIdx * 7 - startDay + (dateIdx + 1);
                        // 이번달
                        if (dateValue > 0 && dateValue <= lastDateOfTheMonth) {
                          return <td>{dateValue}</td>;
                        }
                        // 지난달
                        if (dateValue <= 0) {
                          return <td>{dateValue + lastDateOfTheLastMonth + 2}</td>;
                        }
                        // 다음달
                        if (dateValue > lastDateOfTheMonth) {
                          return <td>{dateValue - lastDateOfTheMonth}</td>;
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
});
