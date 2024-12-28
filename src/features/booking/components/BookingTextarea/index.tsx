import React, { FC, useState } from 'react';
import stylex from '@stylexjs/stylex';
import { Typography, colors } from '../../../../../public/styles/vars.stylex';

interface BookingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const BookingTextarea: FC<BookingTextareaProps> = (props) => {
  const { ...anotherProps } = props;

  return <textarea {...stylex.props(Styles.textarea, Typography.SubTextLargeRegular)} {...anotherProps} />;
};

export default BookingTextarea;

const Styles = stylex.create({
  textarea: {
    width: '100%',
    padding: '12px',
    color: colors.black500,
    border: `1px solid ${colors.gray40}`,
    borderRadius: '12px',
    outline: 'none',
    resize: 'none',
    '::placeholder': {
      color: colors.gray60,
    },
  },
});
