import React, { FC } from 'react';
import type { IconProps } from './types';

const MypageOutlined = (props) => {
  const { width, height } = props;

  return (
    <svg width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12.25 21.75a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"
        stroke="#A7ABAD"
        strokeWidth={2}
        strokeMiterlimit={10}
      />
      <path
        d="M7.26 13.64a1.21 1.21 0 100-2.42 1.21 1.21 0 000 2.42zM17.24 13.64a1.21 1.21 0 100-2.42 1.21 1.21 0 000 2.42z"
        fill="#A7ABAD"
      />
      <path
        d="M13.61 14.84h-2.24a.46.46 0 01-.44-.59l1.5-5.06"
        stroke="#A7ABAD"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MypageOutlined;
