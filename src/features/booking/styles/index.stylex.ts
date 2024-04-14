import { colors } from '@public/styles/vars.stylex';
import stylex from '@stylexjs/stylex';

export const BookingStyles = stylex.create({
  formItemInputWrapper: {
    padding: '14px 12px',
    boxShadow: `inset 0 0 0 1px ${colors.gray40}`,
    borderRadius: '12px',
  },
});
