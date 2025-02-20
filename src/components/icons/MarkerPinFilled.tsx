import React, { FC } from 'react';
import { IconProps } from './types';

const MarkerPinFilled: FC<IconProps> = (props) => {
  const { width, height } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...props}>
      <path
        fill="#BBB"
        d="M7 12.83c.583-2.916 4.667-3.255 4.667-7a4.667 4.667 0 1 0-9.334 0c0 3.745 4.084 4.084 4.667 7"
      />
      <path fill="#BBB" d="M7 7.58a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5" />
      <path
        stroke="#BBB"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 12.83c.583-2.916 4.667-3.255 4.667-7a4.667 4.667 0 1 0-9.334 0c0 3.745 4.084 4.084 4.667 7"
      />
      <path
        stroke="#BBB"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 7.58a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5"
      />
      <circle cx={7} cy={6} r={2} fill="#fff" />
    </svg>
  );
};
export default MarkerPinFilled;
