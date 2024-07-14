import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';
import { Typography, colors } from '../../../../../public/styles/vars.stylex';

type MyPageInputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent) => void;
};

/**
 * 마이페이지용 input
 */
const MyPageInput: FC<MyPageInputProps> = (props) => {
  const { label, value, onChange } = props;

  return (
    <div {...stylex.props(Styles.Container)}>
      <span {...stylex.props(Styles.Label, Typography.SubTextLargeSemiBold)}>{label}</span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        {...stylex.props(Styles.Input, Typography.TextSmallRegular)}
      />
    </div>
  );
};

export default MyPageInput;

const Styles = stylex.create({
  Container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  Label: {
    color: colors.gray60,
  },
  Input: {
    width: '100%',
    padding: '16px',
    boxShadow: `inset 0 0 0 1px ${colors.gray40}`,
    border: 'none',
    borderRadius: '4px',
    color: colors.black500,
  },
});
