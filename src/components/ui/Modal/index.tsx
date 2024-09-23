import React, { FC, ReactElement } from 'react';
import dynamic from 'next/dynamic';
import stylex from '@stylexjs/stylex';
import { BackgroundColor } from '../../../../public/styles/vars.stylex';
import { ModalProps } from './types';

const Portal = dynamic(() => import('../Portal'), {
  ssr: false,
});

const Modal: FC<ModalProps> = (props) => {
  const { children, isOpen } = props;

  return (
    isOpen && (
      <Portal>
        <div {...stylex.props(Styles.container)}>
          <div className="modal-content">{children}</div>
        </div>
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
  },
});
