import React, { FC } from 'react';
import { IconProps } from './types';

const BellOutlined: FC<IconProps> = (props) => {
  const { width, height } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...props}>
      <path
        stroke="#242C33"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M14 21h-4m8-13A6 6 0 0 0 6 8c0 3.09-.78 5.206-1.65 6.605-.735 1.18-1.102 1.771-1.089 1.936.015.182.054.252.2.36.133.099.731.099 1.928.099H18.61c1.196 0 1.794 0 1.927-.098.147-.11.186-.179.2-.361.014-.165-.353-.755-1.088-1.936C18.78 13.206 18 11.09 18 8"
      />
    </svg>
  );
};

export default BellOutlined;
