import React, { FC } from 'react';
import { IconProps } from './types';

const RemoveUserOutlined: FC<IconProps> = (props) => {
  const { width, height } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...props}>
      <path
        stroke="#999"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 16h6m-10-2.5H6.5c-1.396 0-2.093 0-2.661.172a4 4 0 0 0-2.667 2.667C1 16.907 1 17.604 1 19M13.5 5.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0"
      />
    </svg>
  );
};

export default RemoveUserOutlined;
