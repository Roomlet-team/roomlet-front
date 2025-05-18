import React, { FC } from 'react';
import { IconProps } from './types';

const OutWorkspaceOutlined: FC<IconProps> = (props) => {
  const { width, height } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...props}>
      <path
        stroke="#242C33"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M11 20H2M11 4.562V20.72a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.562M11 4H8a2 2 0 0 0-2 2v14M14 12h.01M22 20h-3"
      />
    </svg>
  );
};

export default OutWorkspaceOutlined;
