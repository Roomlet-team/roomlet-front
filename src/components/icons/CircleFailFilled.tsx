import React, { FC } from 'react';
import { IconProps } from './types';

const CircleFailFilled: FC<IconProps> = (props) => {
  const { width, height } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...props}>
      <path
        fill="#D14444"
        d="M12 2C6.429 2 2 6.429 2 12s4.429 10 10 10 10-4.429 10-10S17.571 2 12 2m3.857 15L12 13.143 8.143 17 7 15.857 10.857 12 7 8.143 8.143 7 12 10.857 15.857 7 17 8.143 13.143 12 17 15.857z"
      />
    </svg>
  );
};

export default CircleFailFilled;
