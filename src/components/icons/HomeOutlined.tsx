import React, { FC } from 'react';
import type { IconProps } from './types';

const HomeOutlined: FC<IconProps> = (props) => {
  const { width, height } = props;

  return (
    <svg width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        clipPath="url(#prefix__clip0_1420_2649)"
        stroke="#A7ABAD"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19.841 8.294l-6-4.663a3 3 0 00-3.683 0l-6 4.663A2.996 2.996 0 003 10.659v8.093A2.247 2.247 0 005.25 21h13.5A2.251 2.251 0 0021 18.752V10.66c0-.925-.427-1.799-1.159-2.366zM16 15c-2.21 1.333-5.792 1.333-8 0" />
      </g>
      <defs>
        <clipPath id="prefix__clip0_1420_2649">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default HomeOutlined;
