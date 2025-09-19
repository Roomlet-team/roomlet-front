import React, { FC } from 'react';
import { IconProps } from './types';

const CircleOwnerFilled: FC<IconProps> = (props) => {
  const { width, height } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...props}>
      <rect width={19} height={19} x={0.5} y={0.5} fill="#fff" rx={9.5} />
      <rect width={19} height={19} x={0.5} y={0.5} stroke="#E2E2E2" rx={9.5} />
      <g stroke="#B5312C" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.167} clipPath="url(#a)">
        <path
          fill="#B5312C"
          d="M9.744 4.909a.292.292 0 0 1 .511 0l1.722 3.269a.583.583 0 0 0 .885.171l2.495-2.137a.292.292 0 0 1 .465.303l-1.653 5.977a.58.58 0 0 1-.558.428H6.39a.584.584 0 0 1-.558-.428L4.178 6.515a.292.292 0 0 1 .466-.302L7.138 8.35a.583.583 0 0 0 .884-.172z"
        />
        <path d="M5.917 15.25h8.167" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M3 3h14v14H3z" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default CircleOwnerFilled;
