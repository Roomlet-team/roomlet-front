import React, { FC, useState } from 'react';
import stylex from '@stylexjs/stylex';
import { BookingStyles } from '../../styles/index.stylex';
import { Typography, colors } from '../../../../../public/styles/vars.stylex';

interface BookingTextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const BookingTextInput: FC<BookingTextInputProps> = (props) => {
  const { ...anotherProps } = props;

  return (
    <div {...stylex.props(BookingStyles.formItemInputWrapper)}>
      <input type="text" {...anotherProps} {...stylex.props(Styles.inputText, Typography.SubTextLargeRegular)} />
    </div>
  );
};

export default BookingTextInput;

const Styles = stylex.create({
  inputText: {
    width: '100%',
    color: colors.black500,
    border: 'none',
    outline: 'none',
    '::placeholder': {
      color: colors.gray60,
    },
  },
});
