import ReservationList from '@src/features/reservation/components/ReservationList';
import GnbNavLayout from '@src/layouts/GnbNavLayout';
import React from 'react';

const Reservations = () => {
  return (
    <GnbNavLayout backgroundColor="#FAFAFA">
      <ReservationList />
    </GnbNavLayout>
  );
};

export default Reservations;
