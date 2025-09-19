import React, { FC } from 'react';
import { IconProps } from './types';

const PeopleFilled: FC<IconProps> = (props) => {
  const { width, height } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...props}>
      <g clipPath="url(#a)">
        <path
          fill="#B5312C"
          d="M6.5 4a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M18 4a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M2 13.334A3.336 3.336 0 0 1 5.334 10H6.67c.497 0 .969.11 1.394.303A4.001 4.001 0 0 0 9.357 14H2.665A.67.67 0 0 1 2 13.334M14.666 14h-.022a4 4 0 0 0 1.353-3 4.3 4.3 0 0 0-.06-.697A3.3 3.3 0 0 1 17.332 10h1.335A3.336 3.336 0 0 1 22 13.334c0 .37-.3.666-.666.666zM9 11a3 3 0 1 1 6 0 3 3 0 0 1-6 0m-3 8.166C6 16.866 7.866 15 10.166 15h3.668c2.3 0 4.166 1.866 4.166 4.166 0 .459-.372.834-.834.834H6.834A.834.834 0 0 1 6 19.166"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M2 4h20v16H2z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PeopleFilled;
