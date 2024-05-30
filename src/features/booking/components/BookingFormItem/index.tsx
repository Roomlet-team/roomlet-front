import React, { FC, ReactElement } from 'react';
import stylex from '@stylexjs/stylex';
import { Typography, colors } from '../../../../../public/styles/vars.stylex';

type BookingFormItemProps = {
  label: string;
  required?: boolean;
  rules?: { required: boolean; message: string }[];
  children: ReactElement | string | number;
};

const BookingFormItem: FC<BookingFormItemProps> = (props) => {
  const { label, required, rules, children } = props;

  return (
    <div {...stylex.props(Styles.container, Typography.SubtitleRegularSemiBold)}>
      <label>
        {label}
        {/* 필수 입력일 때 */}
        {required && <span {...stylex.props(Styles.requiredText)}>*</span>}
      </label>
      <div>{children}</div>
    </div>
  );
};

export default BookingFormItem;

const Styles = stylex.create({
  container: {
    marginBottom: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  labelText: {
    color: colors.black500,
  },
  requiredText: {
    color: colors.red500,
  },
});
