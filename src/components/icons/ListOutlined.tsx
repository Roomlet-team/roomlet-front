import React, { FC } from 'react';
import type { IconProps } from './types';

const ListOutlined: FC<IconProps> = (props) => {
  const { width, height } = props;

  return (
    <svg width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        clipRule="evenodd"
        d="M8.244 2h7.361c.077 0 .153.005.228.015a5.733 5.733 0 015.334 5.7v8.572A5.733 5.733 0 0115.423 22H8.244A5.733 5.733 0 012.5 16.285v-8.57A5.733 5.733 0 018.244 2z"
        stroke="#A7ABAD"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.167 8.714a1 1 0 000-2v2zm-5.334-1h-1a1 1 0 001 1v-1zm1-5.7a1 1 0 10-2 0h2zM10.5 17.666a1 1 0 100-2v2zm-4-2a1 1 0 100 2v-2zm9.333-2a1 1 0 100-2v2zm-9.333-2a1 1 0 100 2v-2zm14.667-4.952h-5.334v2h5.334v-2zm-4.334 1v-5.7h-2v5.7h2zM10.5 15.666h-4v2h4v-2zm5.333-4H6.5v2h9.333v-2z"
        fill="#A7ABAD"
      />
    </svg>
  );
};

export default ListOutlined;
