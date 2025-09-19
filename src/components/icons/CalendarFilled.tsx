import React, { FC } from 'react';
import { IconProps } from './types';

const CalendarFilled: FC<IconProps> = (props) => {
  const { width, height } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...props}>
      <g clipPath="url(#a)">
        <path
          fill="#B5312C"
          d="M8.25 2c.691 0 1.25.559 1.25 1.25V4.5h5V3.25c0-.691.559-1.25 1.25-1.25S17 2.559 17 3.25V4.5h1.875c1.035 0 1.875.84 1.875 1.875V8.25H3.25V6.375c0-1.035.84-1.875 1.875-1.875H7V3.25C7 2.559 7.559 2 8.25 2m-5 7.5h17.5v10.625c0 1.035-.84 1.875-1.875 1.875H5.125a1.875 1.875 0 0 1-1.875-1.875zm12.852 4.414a.937.937 0 0 0-1.324-1.324l-3.712 3.71-1.836-1.835a.937.937 0 0 0-1.324 1.324l2.5 2.5a.934.934 0 0 0 1.324 0z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M3.25 2h17.5v20H3.25z" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default CalendarFilled;
