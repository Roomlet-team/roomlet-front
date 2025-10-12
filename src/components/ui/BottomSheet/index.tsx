import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';
import { colors } from '../../../../public/styles/vars.stylex';

interface BottomSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement | React.ReactElement[] | string;
}

/**
 * Bottom Sheet 공통 컴포넌트
 */
const BottomSheet: FC<BottomSheetProps> = (props) => {
  const { children, id, ...anotherProps } = props;

  return (
    <div id={id}>
      <div {...anotherProps} {...stylex.props(Styles.MaskWrapper)} />
      <div {...stylex.props(Styles.ContentWrapper)}>{children}</div>
    </div>
  );
};

export default BottomSheet;

const Styles = stylex.create({
  MaskWrapper: {
    width: '100%',
    height: '100dvh',
    position: 'sticky',
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
  },
  ContentWrapper: {
    zIndex: 11,
    width: '100%',
    height: 'auto',
    position: 'absolute',
    bottom: 0,
    borderRadius: '16px 16px 0 0 ',
    background: colors.white500,
  },
});
