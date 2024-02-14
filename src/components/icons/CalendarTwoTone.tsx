import React, { FC } from 'react';
import type { IconProps } from './types';

const CalendarTwoTone: FC<IconProps> = (props) => {
  const { width, height } = props;

  return (
    <svg width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3 10.4c0-2.24 0-3.36.436-4.216a4 4 0 011.748-1.748C6.04 4 7.16 4 9.4 4h5.2c2.24 0 3.36 0 4.216.436a4 4 0 011.748 1.748C21 7.04 21 8.16 21 10.4v5.2c0 2.24 0 3.36-.436 4.216a4 4 0 01-1.748 1.748C17.96 22 16.84 22 14.6 22H9.4c-2.24 0-3.36 0-4.216-.436a4 4 0 01-1.748-1.748C3 18.96 3 17.84 3 15.6v-5.2z"
        fill="#C7CDDF"
      />
      <path
        d="M3 10h18M8 6V2m8 4V2M9.4 22h5.2c2.24 0 3.36 0 4.216-.436a4 4 0 001.748-1.748C21 18.96 21 17.84 21 15.6v-5.2c0-2.24 0-3.36-.436-4.216a4 4 0 00-1.748-1.748C17.96 4 16.84 4 14.6 4H9.4c-2.24 0-3.36 0-4.216.436a4 4 0 00-1.748 1.748C3 7.04 3 8.16 3 10.4v5.2c0 2.24 0 3.36.436 4.216a4 4 0 001.748 1.748C6.04 22 7.16 22 9.4 22z"
        stroke="#242C33"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CalendarTwoTone;
