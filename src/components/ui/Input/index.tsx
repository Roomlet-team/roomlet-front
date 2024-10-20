import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';
import { colors, Typography } from '../../../../public/styles/vars.stylex';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  key?: React.Key;
}

const Input: FC<InputProps> = (props) => {
  const { key, ...anotherProps } = props;

  return (
    <div key={key} {...stylex.props(Styles.Wrapper)}>
      <input type="text" {...anotherProps} {...stylex.props(Styles.input, Typography.SubTextLargeRegular)} />
    </div>
  );
};

export default Input;

const Styles = stylex.create({
  Wrapper: {
    width: '100%',
    padding: '14px 12px',
    borderRadius: '12px',
    boxShadow: `inset 0 0 0 1px ${colors.gray40}`,
    background: colors.white500,
  },
  input: {
    width: '100%',
    padding: 0,
    outline: 'none',
    border: 'none',
    '::placeholder': {
      color: colors.gray60,
    },
  },
});
