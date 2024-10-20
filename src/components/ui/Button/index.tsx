import React, { FC, ReactElement } from 'react';
import stylex from '@stylexjs/stylex';
import { colors } from '../../../../public/styles/vars.stylex';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  key?: React.Key;
  children: ReactElement | string | number;
}

const Button: FC<ButtonProps> = (props) => {
  const { children, ...anotherProps } = props;

  return (
    <button {...stylex.props(Styles.button)} {...anotherProps}>
      {children}
    </button>
  );
};

export default Button;

const Styles = stylex.create({
  button: {
    width: '100%',
    padding: '13px 99px',
    borderRadius: '12px',
    background: colors.red500,
    fontSize: '1.6rem',
    lineHeight: '2.4rem',
    color: colors.white500,
  },
});
