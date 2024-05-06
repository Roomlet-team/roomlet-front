import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';
import { IconProps } from './types';

const TriangleFilled: FC<IconProps> = (props) => {
  const { width, height, rotate } = props;

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
        <path fill="#333" d="m7 10 5 5 5-5z" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default TriangleFilled;

const Styles = stylex.create({
  Wrapper: (rotate) => ({
    transform: `rotate(${rotate || 0}deg)`,
  }),
});
