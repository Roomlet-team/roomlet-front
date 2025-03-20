import React, { FC } from 'react';
import { Slide, toast } from 'react-toastify';
import styles from './styles/styles.module.css';
import { Typography } from '../../../../public/styles/vars.stylex';
import stylex from '@stylexjs/stylex';
import CircleCheckmarkFilled from '@src/components/icons/CircleCheckmarkFilled';

interface ToastProps {
  message: string;
}

const MessageContent: FC<ToastProps> = (props) => {
  const { message } = props;

  return (
    <div {...stylex.props(Styles.Message, Typography.TextSmallMedium)}>
      <div {...stylex.props(Styles.IconWrapper)}>
        <CircleCheckmarkFilled width={24} height={24} />
      </div>
      <span>{message}</span>
    </div>
  );
};

const Toast: FC<ToastProps> = (props) => {
  const { message } = props;

  return toast(<MessageContent message={message} />, {
    position: 'bottom-center',
    autoClose: 1500,
    closeButton: false,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: styles['toast-container'],
    transition: Slide, // Bounce, Slide, Zoom, Flip, Fade
  });
};

export default Toast;

const Styles = stylex.create({
  Message: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  IconWrapper: {
    flexShrink: 0,
  },
});
