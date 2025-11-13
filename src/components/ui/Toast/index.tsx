import React, { FC } from 'react';
import { Slide, toast } from 'react-toastify';
import styles from './styles/styles.module.css';
import { Typography } from '../../../../public/styles/vars.stylex';
import stylex from '@stylexjs/stylex';
import CircleCheckmarkFilled from '@src/components/icons/CircleCheckmarkFilled';
import CircleFailFilled from '@src/components/icons/CircleFailFilled';
import Spinner from '@src/components/icons/Spinner';

interface ToastProps {
  message: string;
  type?: 'success' | 'pending' | 'error';
}

export const ToastContent: FC<ToastProps> = (props) => {
  const { message, type } = props;
  const typeIcon = {
    success: <CircleCheckmarkFilled width={24} height={24} />,
    pending: <Spinner width={24} height={24} spin />,
    error: <CircleFailFilled width={24} height={24} />,
  };

  return (
    <div {...stylex.props(Styles.Message, Typography.TextSmallMedium)}>
      <div {...stylex.props(Styles.IconWrapper)}>{typeIcon[type]}</div>
      <span>{message}</span>
    </div>
  );
};

const Toast: FC<ToastProps> = (props) => {
  const { message, type = 'success' } = props;

  return toast(<ToastContent message={message} type={type} />, {
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
