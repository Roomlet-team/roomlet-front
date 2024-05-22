import React, { FC } from 'react';
import { IconProps } from './types';

const CheckmarkOutlined: FC<IconProps> = (props) => {
  const { width, height } = props;

  return (
    <svg width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 3.4 4.75 7 11 1" />
    </svg>
  );
};

export default CheckmarkOutlined;
