import React, { FC, useState } from 'react';
import stylex from '@stylexjs/stylex';
import { BookingStyles } from '../../styles/index.stylex';
import { Typography, colors } from '../../../../../public/styles/vars.stylex';

type BookingTextInputProps = {
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const BookingTextInput: FC<BookingTextInputProps> = (props) => {
  const { placeholder, value, onChange } = props;

  return (
    <div {...stylex.props(BookingStyles.formItemInputWrapper)}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...stylex.props(Styles.inputText, Typography.SubTextLargeRegular)}
      />
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
