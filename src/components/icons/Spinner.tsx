import React, { FC } from 'react';
import { IconProps } from './types';
import stylex from '@stylexjs/stylex';

interface SpinnerProps {
  spin?: boolean;
}

const Spinner: FC<IconProps & SpinnerProps> = (props) => {
  const { width, height, spin } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...props}>
      <g clipPath="url(#a)">
        <path
          {...stylex.props(spin && Styles.SpinnerIcon)}
          fill="#fff"
          d="M18.364 5.636 16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364"
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

export default Spinner;

const spinning = stylex.keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const Styles = stylex.create({
  SpinnerIcon: {
    animationName: spinning,
    animationDuration: '1s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    transformOrigin: '50% 50%',
  },
});
