import React, { FC } from 'react';
import { IconProps } from './types';

const CircleFailFilled: FC<IconProps> = (props) => {
  const { width, height } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...props}>
      <g clipPath="url(#a)">
        <path
          fill="#fff"
          d="M17.414 8.889 14.303 12l3.111 3.111-2.303 2.303L12 14.303l-3.111 3.111-2.303-2.303L9.697 12 6.586 8.889l2.303-2.303L12 9.697l3.111-3.111z"
        />
        <path
          fill="#B5312C"
          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10m0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CircleFailFilled;
