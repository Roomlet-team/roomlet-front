import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';
import Modal from '..';
import { colors, Typography } from '../../../../../public/styles/vars.stylex';
import { ModalProps } from '../types';

type AlertModalProps = {
  content: string;
  onOk: (e) => void;
  okBtnName?: string;
};

const AlertModal: FC<ModalProps & AlertModalProps> = (props) => {
  const { content, onOk, okBtnName } = props;

  return (
    <Modal isOpen>
      <div {...stylex.props(Styles.container)}>
        <p {...stylex.props(Typography.SubTextLargeRegular, Styles.content)}>{content}</p>
        <button type="button" onClick={onOk} {...stylex.props(Styles.okBtn, Typography.SubTextLargeSemiBold)}>
          {okBtnName || '닫기'}
        </button>
      </div>
    </Modal>
  );
};

export default AlertModal;

const Styles = stylex.create({
  container: {
    minWidth: '300px',
    width: '100%',
    padding: '24px 16px',
    background: colors.white500,
    borderRadius: '16px',
  },
  content: {
    marginBottom: '24px',
    whiteSpace: 'pre-line',
    color: '#666666',
    textAlign: 'center',
  },
  okBtn: {
    width: '100%',
    padding: '15px',
    background: colors.red500,
    color: colors.white500,
    borderRadius: '16px',
  },
});
