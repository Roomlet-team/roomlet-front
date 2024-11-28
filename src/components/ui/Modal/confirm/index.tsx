import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';
import Modal from '..';
import { colors, Typography } from '../../../../../public/styles/vars.stylex';
import { ModalProps } from '../types';
import { createRoot } from 'react-dom/client';

let root = null;
const confirmModalId = 'confirm-modal';

interface ConfirmModalProps {
  content: string;
  onOk: (e: React.MouseEvent) => void;
  onCancel: (e: React.MouseEvent) => void;
  okBtnName?: string;
  cancelBtnName?: string;
}

const ConfirmModal: FC<ConfirmModalProps> = (props) => {
  const { content, onOk, onCancel, okBtnName, cancelBtnName } = props;

  /**
   * 모달 닫기
   */
  const close = () => {
    const targetConfirmModalElement = document.getElementById(confirmModalId);

    if (targetConfirmModalElement) {
      root.unmount(targetConfirmModalElement);
    }
  };

  /**
   * 취소 버튼을 눌렀을 때
   */
  const handleClickCancel = (e) => {
    // onCancel가 존재하면, onCandle 함수 실행
    if (onCancel) {
      onCancel(e);
    }

    // 모달 닫기
    close();
  };

  /**
   * 확인 버튼을 눌렀을 때
   */
  const handleClickOk = (e) => {
    // onOk가 존재하면, onOk 함수 실행
    if (onOk) {
      onOk(e);
    }

    // 모달 닫기
    close();
  };

  return (
    <Modal isOpen>
      <div {...stylex.props(Styles.container)}>
        <p {...stylex.props(Typography.SubTextLargeRegular, Styles.content)}>{content}</p>
        <div {...stylex.props(Styles.btnContainer)}>
          <button
            type="button"
            onClick={handleClickCancel}
            {...stylex.props(Styles.cancelBtn, Typography.SubTextLargeSemiBold)}
          >
            {cancelBtnName || '취소'}
          </button>
          <button
            type="button"
            onClick={handleClickOk}
            {...stylex.props(Styles.okBtn, Typography.SubTextLargeSemiBold)}
          >
            {okBtnName || '확인'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

const confirm = (props: ConfirmModalProps) => {
  // body 태그에 div 태그를 추가하여 모달 띄우기
  const divElement = document.createElement('div');
  divElement.id = confirmModalId;
  document.body.appendChild(divElement);
  root = createRoot(divElement);

  root.render(<ConfirmModal {...props} />);
};

export { confirm };

const Styles = stylex.create({
  container: {
    maxWidth: '300px',
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
