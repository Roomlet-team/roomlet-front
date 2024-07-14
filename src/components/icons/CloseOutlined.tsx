import React, { FC } from 'react';
import { IconProps } from './types';

const CloseOutlined: FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <path
      fill="#61686D"
      d="m12.666 4.272-.94-.94L8 7.059 4.273 3.332l-.94.94L7.06 7.999l-3.727 3.726.94.94L8 8.94l3.726 3.726.94-.94L8.94 8z"
      opacity={0.3}
    />
  </svg>
);
export default CloseOutlined;
