import React, { FC, useEffect, useRef, useState } from 'react';
import stylex from '@stylexjs/stylex';
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import Picker from 'react-mobile-picker';
// import 'react-calendar/dist/Calendar.css';
import { Shadows, Typography, colors } from '../../../../../../public/styles/vars.stylex';
import ArrowHeadOutlinedV2 from '@src/components/icons/ArrowHeadOutlinedV2';
import TriangleFilled from '@src/components/icons/TriangleFilled';
import { useDispatch, useSelector } from 'react-redux';
import { saveSelectBookingDate } from '@src/features/booking/slices/booking';
import { RootState } from '@src/store';

type MiniCalendarProps = {
  onClose: (status: boolean) => void;
};

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const MiniCalendar: FC<MiniCalendarProps> = (props) => {
  const { onClose } = props;
  const { selectBookingDate } = useSelector((state: RootState) => state.booking);
  const [year, setYear] = useState<number>(dayjs().year());
  const [month, setMonth] = useState<number>(dayjs().month());
  const [day, setDay] = useState<number>(dayjs().date());
  const dispatch = useDispatch();
  const dateSelections = {
    year: Array(300).map((_, idx) => 1800 + idx),
    month: Array(11).map((_, idx) => 1 + idx),
    day: Array(30).map((_, idx) => 1 + idx),
  };

  const handleFormatDay = (locale, date) => dayjs(date).format('D');

  const handleFormatShortWeekday = (locale, date) => {
    const day = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return day[Number(dayjs(date).format('d'))];
  };

  const handleClickPrevMonth = () => {
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

  const handleChangeDate = (value) => {
    const selectDateArr = dayjs(value).format('YYYY-M-D').split('-');

    const selectYear = selectDateArr[0];
    const selectMonth = selectDateArr[1];
    const selectDay = selectDateArr[2];

    setYear(+selectYear);
    setMonth(+selectMonth);
    setDay(+selectDay);
  };

  const handleClickCancel = () => {
    onClose(false);
  };

  const handleClickSave = () => {
    onClose(false);
    dispatch(saveSelectBookingDate(dayjs(`${year}-${month}-${day}`).format('YYYY-MM-DD')));
  };

  useEffect(() => {
    if (!selectBookingDate) {
      setYear(dayjs().year());
      setMonth(dayjs().month());
      setDay(dayjs().day());
    } else {
      const selectDateArr = dayjs(selectBookingDate).format('YYYY-M-D').split('-');

      const selectYear = selectDateArr[0];
      const selectMonth = selectDateArr[1];
      const selectDay = selectDateArr[2];

      setYear(+selectYear);
      setMonth(+selectMonth);
      setDay(+selectDay);
    }
  }, []);

  return (
    <div {...stylex.props(Styles.Wrapper)}>
      <div {...stylex.props(Styles.MoveDateContainer)}>
        <button type="button" {...stylex.props(Styles.DatePickerBtn, Typography.SubtitleSmallBold)}>
          {year}년 {month}월
          <TriangleFilled width={24} height={24} />
        </button>
        <div {...stylex.props(Styles.MonthMoveBtnContainer)}>
          <button type="button" onClick={handleClickPrevMonth}>
            <ArrowHeadOutlinedV2 width={24} height={24} rotate={180} />
          </button>
          <button type="button" onClick={handleClickNextMonth}>
            <ArrowHeadOutlinedV2 width={24} height={24} />
          </button>
        </div>
      </div>
      <Calendar
        onChange={handleChangeDate}
        value={new Date(year, month - 1, day)} // month는 0~11까지라서 -1을 해줌.
        showNavigation={false}
        formatDay={handleFormatDay}
        formatShortWeekday={handleFormatShortWeekday} // 요일을 표현하는 방식 커스텀
        locale="en-GB"
        activeStartDate={new Date(year, month - 1, day)} // month는 0~11까지라서 -1을 해줌.
        calendarType="gregory" // 일주일의 시작이 sun으로 시작되게 수정
        tileClassName="mini-calendar"
      />
      <div {...stylex.props(Styles.CancelAndSaveBtnContainer)}>
        <button
          type="button"
          onClick={handleClickCancel}
          {...stylex.props(BtnStyles.CommonBtn, BtnStyles.Cancel, Typography.SubTextLargeMedium)}
        >
          취소
        </button>
        <button
          type="button"
          onClick={handleClickSave}
          {...stylex.props(BtnStyles.CommonBtn, BtnStyles.Save, Typography.SubTextLargeMedium)}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default MiniCalendar;

const Styles = stylex.create({
  Wrapper: {
    width: '286px', // 설정한 너비에 맞게 일주일에 표현되는 일 수가 달라짐
    position: 'absolute',
    top: '56px',
    left: 0,
    background: colors.white500,
    boxShadow: Shadows.Shadow1,
    border: `1px solid ${colors.gray30}`,
    borderRadius: '12px',
  },
  MoveDateContainer: {
    margin: '16px 16px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  DatePickerBtn: {
    display: 'flex',
    alignItems: 'flex-end',
    lineHeight: 1,
  },
  MonthMoveBtnContainer: {
    display: 'flex',
    gap: '8px',
    height: '24px',
  },
  CancelAndSaveBtnContainer: {
    margin: '0 16px 28px',
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
  },
});

const BtnStyles = stylex.create({
  CommonBtn: {
    padding: '6px 16px',
    borderRadius: '50px',
  },
  Cancel: {
    color: colors.gray50,
    boxShadow: `inset 0 0 0 1px ${colors.gray30}`,
  },
  Save: {
    color: colors.white500,
    background: colors.red500,
  },
});
