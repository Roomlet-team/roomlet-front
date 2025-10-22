import React, { FC, useEffect } from 'react';
import stylex from '@stylexjs/stylex';
import { colors } from '../../../../public/styles/vars.stylex';

interface BottomSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement | React.ReactElement[] | string;
}

/**
 * Bottom Sheet 공통 컴포넌트
 */
const BottomSheet: FC<BottomSheetProps> = (props) => {
  const { children, id, onClick, ...anotherProps } = props;

  const handleClickMask = (func) => async (e) => {
    const mainLayoutElement = document.getElementById('main-layout');

    /* onClick 함수가 실행된 후에 main-layout의 overflow를 auto로 변경 */
    const isClick = await new Promise((resolve) => {
      onClick(e);
      resolve(true);
    });

    if (isClick) mainLayoutElement.style.overflow = 'auto';
  };

  useEffect(() => {
    const mainLayoutElement = document.getElementById('main-layout');
    // BottomSheet 오픈 시 main-layout의 overflow를 hidden으로 변경
    if (mainLayoutElement) {
      mainLayoutElement.style.overflow = 'hidden';
    }
  }, []);

  return (
    <div id={id}>
      <div {...anotherProps} {...stylex.props(Styles.MaskWrapper)} onClick={handleClickMask(onClick)} />
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
    overflow: 'hidden',
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
