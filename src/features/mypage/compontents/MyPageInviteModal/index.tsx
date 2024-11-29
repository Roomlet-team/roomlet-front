import React, { FC } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import stylex from '@stylexjs/stylex';
import Modal from '@src/components/ui/Modal';
import usePostInviteCodeQuery from '../../queries/usePostInviteCodeQuery';
import CopyOutlined from '@src/components/icons/CopyOutlined';
import { colors, Typography } from '../../../../../public/styles/vars.stylex';

interface MyPageInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 마이페이지 멤버 초대 모달 컴포넌트
 */
const MyPageInviteModal: FC<MyPageInviteModalProps> = (props) => {
  const { isOpen, onClose } = props;
  const { data } = usePostInviteCodeQuery();
  const copyUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/invite?InviteId=${data?.inviteInfo.InviteId}`;

  const handleClickClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen}>
      <div {...stylex.props(Styles.Container)}>
        <p {...stylex.props(Typography.SubTextLargeRegular)}>함께할 멤버를 초대해 보세요.</p>
        <div {...stylex.props(Styles.CopyTextContainer)}>
          <input
            type="text"
            readOnly
            {...stylex.props(Typography.SubTextLargeRegular, Styles.CopyTextInput)}
            value={copyUrl}
          />
          {/* 복사 버튼 */}
          <CopyToClipboard text={copyUrl}>
            <button>
              <CopyOutlined width={24} height={24} />
            </button>
          </CopyToClipboard>
        </div>

        {/* 닫기 */}
        <button type="button" onClick={handleClickClose} {...stylex.props(Typography.SubTextLargeSemiBold)}>
          닫기
        </button>
      </div>
    </Modal>
  );
};

export default MyPageInviteModal;

const Styles = stylex.create({
  Container: {
    width: '300px',
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: colors.white500,
    borderRadius: '16px',
  },
  CopyTextContainer: {
    margin: '12px 0 16px',
    padding: '12px 16px',
    display: 'flex',
    gap: '8px',
    border: `1px solid ${colors.gray40}`,
    borderRadius: '8px',
  },
  CopyTextInput: {
    border: 'none',
    outline: 'none',
    color: '#666666',
  },
});
