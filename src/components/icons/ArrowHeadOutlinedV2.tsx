import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';
import { IconProps } from './types';

const ArrowHeadOutlinedV2: FC<IconProps> = (props) => {
  const { width, height, color, rotate } = props;

  return (
    <svg
      {...stylex.props(Styles.Wrapper(rotate))}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      {...props}
    >
      <g clipPath="url(#a)">
        <path fill={color || '#333'} d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default ArrowHeadOutlinedV2;

const Styles = stylex.create({
  Wrapper: (rotate) => ({
    transform: `rotate(${rotate || 0}deg)`,
  }),
});
