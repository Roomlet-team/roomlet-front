import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';

import Calendar from 'react-calendar';
import stylex from '@stylexjs/stylex';

import dayjs from 'dayjs';
import { Typography } from 'public/styles/vars.stylex';

const MonthlyCalendar = () => {
  const [date, setDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  const [slides, setSlides] = useState([
    dayjs().format('YYYY-MM-DD'),
    dayjs().add(1, 'month').format('YYYY-MM-DD'),
    dayjs().add(2, 'month').format('YYYY-MM-DD'),
  ]);
  let sliderRef = useRef(null);

  const handleChangeDate = (value) => {
    const selectedDate = dayjs(value).format('YYYY-MM-DD');

    setDate(selectedDate);
  };

  const handleFormatDay = (locale, date) => dayjs(date).format('D');

  const handleFormatShortWeekday = (locale, date) => {
    const day = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return day[Number(dayjs(date).format('d'))];
  };

  const settings = {
    slidesToShow: 1,
    swipeToSlide: true,
    infinite: false,
    adaptiveHeight: true,
    initialSlide: 0, // 기본적으로 1번 인덱스의 슬라이드 표시
    afterChange: (current, next) => {
      if (current === 0) {
        const prevMonth = dayjs(slides[0]).subtract(1, 'month').format('YYYY-MM-DD');

        setSlides([prevMonth, ...slides]);
      }
      if (current === slides.length - 1) {
        const nextMonth = dayjs(slides[slides.length - 1])
          .add(1, 'month')
          .format('YYYY-MM-DD');

        setSlides([...slides, nextMonth]);
      }
    },
  };

  return (
    <>
      <div {...stylex.props(Styles.SliderWrapper)}>
        <Slider {...settings} ref={sliderRef}>
          {slides.map((slideContent, index) => (
            <div key={index}>
              <div style={{ height: '460px' }}>
                <p {...stylex.props(Styles.CurrentSlideMonth, Typography.TitleRegularBold)}>
                  {dayjs(slideContent).format('YYYY.M')}
                </p>
                <Calendar
                  onChange={handleChangeDate}
                  value={dayjs(date).toDate()} // dayjs를 Date로 변환
                  showNavigation={false}
                  formatDay={handleFormatDay}
                  formatShortWeekday={handleFormatShortWeekday} // 요일을 표현하는 방식 커스텀
                  locale="en-GB"
                  activeStartDate={dayjs(slideContent).toDate()} // dayjs를 Date로 변환
                  calendarType="gregory" // 일주일의 시작이 sun으로 시작되게 수정
                  tileClassName="main-calendar-title"
                  className="main-calendar"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default MonthlyCalendar;

const Styles = stylex.create({
  SliderWrapper: {
    height: '406px',
  },
  CurrentSlideMonth: {
    padding: '16px',
  },
});
