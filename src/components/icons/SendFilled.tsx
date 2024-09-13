import React, { FC } from 'react';
import { IconProps } from './types';

const SendFilled: FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <rect width={32} height={32} fill="#B5312C" rx={16} />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.89 16.24h-4.648m-.071.247-1.973 5.894c-.155.463-.233.694-.177.837a.42.42 0 0 0 .28.253c.147.041.37-.059.815-.26l14.121-6.354c.435-.195.652-.293.72-.429a.42.42 0 0 0 0-.375c-.068-.135-.285-.233-.72-.429L10.111 9.268c-.444-.2-.665-.3-.813-.259a.42.42 0 0 0-.28.253c-.056.142.021.373.174.835l1.98 5.963c.026.079.039.119.044.16a.4.4 0 0 1 0 .108 1 1 0 0 1-.045.16"
    />
  </svg>
);
export default SendFilled;
