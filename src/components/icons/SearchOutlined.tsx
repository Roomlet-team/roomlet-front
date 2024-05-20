import React, { FC } from 'react';
import { IconProps } from './types';

const SearchOutlined: FC<IconProps> = (props) => {
  const { width, height } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...props}>
      <g clipPath="url(#a)">
        <path
          fill="#999"
          d="M11.625 10.5h-.592l-.21-.203A4.85 4.85 0 0 0 12 7.125 4.875 4.875 0 1 0 7.125 12a4.85 4.85 0 0 0 3.172-1.178l.203.21v.593l3.75 3.742 1.117-1.117zm-4.5 0A3.37 3.37 0 0 1 3.75 7.125 3.37 3.37 0 0 1 7.125 3.75 3.37 3.37 0 0 1 10.5 7.125 3.37 3.37 0 0 1 7.125 10.5"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h18v18H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default SearchOutlined;
