import React, { FC, ReactElement, use, useEffect } from 'react';
import dynamic from 'next/dynamic';
import stylex from '@stylexjs/stylex';
import { BackgroundColor } from '../../../../public/styles/vars.stylex';
import { ModalProps } from './types';

const Portal = dynamic(() => import('../Portal'), {
  ssr: false,
});

const Modal: FC<ModalProps> = (props) => {
  const { children, isOpen } = props;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    isOpen && (
      <Portal>
        <div {...stylex.props(Styles.container)}>{children}</div>
      </Portal>
    )
  );
};

export default Modal;

const Styles = stylex.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.5)',
    color: BackgroundColor.gradientBlackBg,
    zIndex: 100, // 9999는 토스트 메시지를 사용하는 경우를 고려해서 사용하지 말 것
  },
});
