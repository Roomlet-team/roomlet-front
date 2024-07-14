import React, { FC } from 'react';
import { IconProps } from './types';

const SettingOutlined: FC<IconProps> = (props) => {
  const { width, height } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...props}>
      <path
        stroke="#242C33"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m9.35 19.371.585 1.315a2.212 2.212 0 0 0 4.044 0l.585-1.315a2.43 2.43 0 0 1 2.47-1.423l1.43.152a2.212 2.212 0 0 0 2.022-3.502l-.847-1.164a2.43 2.43 0 0 1-.46-1.434c0-.513.163-1.014.465-1.429l.846-1.163a2.211 2.211 0 0 0-2.022-3.502l-1.43.152a2.43 2.43 0 0 1-1.47-.312 2.43 2.43 0 0 1-1-1.117l-.589-1.315a2.212 2.212 0 0 0-4.044 0L9.35 4.63c-.207.468-.557.86-1 1.117-.445.256-.96.365-1.47.312l-1.434-.152a2.212 2.212 0 0 0-2.023 3.502l.847 1.163a2.43 2.43 0 0 1 0 2.858l-.847 1.163a2.211 2.211 0 0 0 2.023 3.502l1.43-.152a2.43 2.43 0 0 1 2.474 1.43"
      />
      <path
        stroke="#242C33"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.955 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
      />
    </svg>
  );
};

export default SettingOutlined;
