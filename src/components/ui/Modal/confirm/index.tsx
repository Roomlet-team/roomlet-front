import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';
import Modal from '..';
import { colors, Typography } from '../../../../../public/styles/vars.stylex';
import { ModalProps } from '../types';

type ConfirmModalProps = {
  content: string;
  onOk: (e: React.MouseEvent) => void;
  onCancel: (e: React.MouseEvent) => void;
  okBtnName?: string;
  cancelBtnName?: string;
};

const ConfirmModal: FC<ModalProps & ConfirmModalProps> = (props) => {
  const { content, onOk, onCancel, okBtnName, cancelBtnName } = props;

  return (
    <Modal isOpen>
      <div {...stylex.props(Styles.container)}>
        <p {...stylex.props(Typography.SubTextLargeRegular, Styles.content)}>{content}</p>
        <div {...stylex.props(Styles.btnContainer)}>
          <button type="button" onClick={onCancel} {...stylex.props(Styles.cancelBtn, Typography.SubTextLargeSemiBold)}>
            {cancelBtnName || '취소'}
          </button>
          <button type="button" onClick={onOk} {...stylex.props(Styles.okBtn, Typography.SubTextLargeSemiBold)}>
            {okBtnName || '확인'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;

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
  btnContainer: {
    display: 'flex',
    gap: '12px',
  },
  cancelBtn: {
    width: '100%',
    padding: '15px',
    background: colors.black400,
    color: colors.white500,
    borderRadius: '16px',
  },
  okBtn: {
    width: '100%',
    padding: '15px',
    background: colors.red500,
    color: colors.white500,
    borderRadius: '16px',
  },
});
