import React, { FC } from 'react';
import { IconProps } from './types';

const CirclePlusFilled: FC<IconProps> = (props) => {
  const { width, height } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 56 56" fill="none" {...props}>
      <g filter="url(#a)">
        <rect width={56} height={56} fill="#444" rx={28} shapeRendering="crispEdges" />
        <path
          fill="#fff"
          d="M19.714 13.286h-6.428v6.428A1.29 1.29 0 0 1 12 21a1.29 1.29 0 0 1-1.286-1.286v-6.428H4.286A1.29 1.29 0 0 1 3 12a1.29 1.29 0 0 1 1.286-1.286h6.428V4.286A1.29 1.29 0 0 1 12 3a1.29 1.29 0 0 1 1.286 1.286v6.428h6.428A1.29 1.29 0 0 1 21 12a1.29 1.29 0 0 1-1.286 1.286"
          transform="translate(16 16) scale(1)"
        />
      </g>
      <defs>
        <filter id="a" width={80} height={80} x={0} y={0} colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={6} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0.384314 0 0 0 0 0.427451 0 0 0 0 0.623529 0 0 0 0.12 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_2766_13938" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_2766_13938" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default CirclePlusFilled;
