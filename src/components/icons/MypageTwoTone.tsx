import React, { FC } from 'react';
import type { IconProps } from './types';

const MypageTwoTone: FC<IconProps> = (props) => {
  const { width, height } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...props}>
      <path
        fill="#C7CDDF"
        stroke="#242C33"
        strokeMiterlimit={10}
        strokeWidth={2}
        d="M12.25 21.75a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19Z"
      />
      <path
        fill="#242C33"
        stroke="#242C33"
        d="M7.97 12.429a.71.71 0 1 1-1.42 0 .71.71 0 0 1 1.42 0ZM17.95 12.429a.71.71 0 1 1-1.42 0 .71.71 0 0 1 1.42 0Z"
      />
      <path
        stroke="#242C33"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.61 14.838h-2.24a.46.46 0 0 1-.44-.59l1.5-5.06"
      />
    </svg>
  );
};
export default MypageTwoTone;
