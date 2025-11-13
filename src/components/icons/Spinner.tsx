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
      <path
        {...stylex.props(spin && Styles.SpinnerIcon)}
        fill="#E3E3E3"
        d="M19.333 11.997A7.333 7.333 0 1 1 12 4.664v1.333a6 6 0 1 0 6 6z"
      />
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
