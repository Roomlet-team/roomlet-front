import React, { useState } from 'react';
import stylex from '@stylexjs/stylex';
import ReservationList from '@src/features/reservation/components/ReservationList';
import ReservationListHeader from '@src/features/reservation/components/ReservationListHeader';
import GnbNavLayout from '@src/layouts/GnbNavLayout';
import DateWheelPicker from '@src/features/calendar/components/DateWheelPicker';
import ArrowHeadOutlinedV2 from '@src/components/icons/ArrowHeadOutlinedV2';
import dayjs from 'dayjs';
import useGetWorkspaceCongressListQuery from '@src/queries/workspace/useGetWorkspaceCongressListQuery';
import { useRouter } from 'next/router';

const Reservations = () => {
  const router = useRouter();
  const { my: queryMy, cc: queryCc, roomIds: queryRoomIds } = router.query;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [year, setYear] = useState<number>(dayjs().year());
  const [month, setMonth] = useState<number>(dayjs().month() + 1);
  const [day, setDay] = useState<number>(dayjs().date());
  const { data } = useGetWorkspaceCongressListQuery({
    date: year && month && day ? dayjs(`${year}-${month}-${day}`).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
    ...(queryMy ? { my: queryMy as string } : {}),
    ...(queryCc ? { cc: queryCc as string } : {}),
    ...(queryRoomIds ? { RoomId: queryRoomIds as string } : {}),
  });

  const handleClickDateWheel = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectDateWheelPicker = (date) => {
    setYear(+date.year);
    setMonth(+date.month);
    setDay(+date.day);
  };

  return (
    <>
      <GnbNavLayout backgroundColor="#FAFAFA">
        {/*  날짜 선택 버튼 */}
        <h1 {...stylex.props(Styles.dateTitle)} onClick={handleClickDateWheel}>
          {dayjs(`${year}-${month}-${day}`).format('YY년 M월 D일 ddd요일')}
          <ArrowHeadOutlinedV2 width={24} height={24} rotate={90} />
        </h1>
        {/* 예약 목록 헤더 */}
        <ReservationListHeader totalCount={data?.congressCount} />
        {/* 예약 목록 */}
        <ReservationList data={data} />
      </GnbNavLayout>

      {/* wheel 형태의 날짜 선택 컴포넌트 */}
      <DateWheelPicker
        isOpen={isOpen}
        onClose={handleClickDateWheel}
        defaultValue={{ year: `${year}`, month: `${month}`, day: `${day}` }}
        onSelect={handleSelectDateWheelPicker}
      />
    </>
  );
};

export default Reservations;

const Styles = stylex.create({
  dateTitle: {
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    padding: '16px 20px',
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: '2.6rem',
    color: '#333333',
    cursor: 'pointer',
  },
});
