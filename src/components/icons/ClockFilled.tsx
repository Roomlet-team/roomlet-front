import React, { FC } from 'react';
import { IconProps } from './types';

const ClockFilled: FC<IconProps> = (props) => {
  const { width, height } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...props}>
      <circle cx={7} cy={7} r={5} fill="#BBB" stroke="#BBB" />
      <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M7 4.25v3.208l3.208-1.375" />
    </svg>
  );
};
export default ClockFilled;
