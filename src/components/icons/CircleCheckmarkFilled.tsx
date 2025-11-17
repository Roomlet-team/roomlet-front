import React, { FC } from 'react';
import { IconProps } from './types';

const CircleCheckmarkFilled: FC<IconProps> = (props) => {
  const { width, height } = props;

  return (
    <svg width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#a)">
        <path
          fill="#fff"
          d="m18.716 8.246.68.697-7.555 7.757-.716.736-4.842-4.97-.679-.698 2.313-2.374 3.207 3.293 5.959-6.117zM11.125 16l-4.124-4.234-.001.002 4.125 4.235L18 8.944l-.002-.002z"
        />
        <path
          fill="#00C68B"
          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10m-.997-6 7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414z"
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

export default CircleCheckmarkFilled;
