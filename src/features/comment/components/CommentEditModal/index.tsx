import React, { FC } from 'react';
import Header from '@src/components/ui/Header';
import Modal from '@src/components/ui/Modal';
import { CommentListItem } from '../../queries/useGetWorkspaceCongressCommentQuery';
import stylex from '@stylexjs/stylex';
import { colors } from '../../../../../public/styles/vars.stylex';
import { useDispatch } from 'react-redux';
import { hideModal } from '@src/slices/modal';
import useTextArea from '@src/hooks/useTextArea';
import usePatchCongressCommentQuery from '../../queries/usePatchCongressCommentQuery';

interface CommentEditModalProps {
  data: CommentListItem;
}

const CommentEditModal: FC<CommentEditModalProps> = (props) => {
  const { data } = props;
  const [content, handleChangeContent] = useTextArea(data.content);
  const mutation = usePatchCongressCommentQuery();
  const dispatch = useDispatch();

  const prevOnClick = () => {
    dispatch(hideModal());
  };

  const handleClickComplete = () => {
    mutation.mutate({
      CommentId: data.CommentId,
      content,
    });
  };

  return (
    <Modal isOpen>
      <div {...stylex.props(Styles.container)}>
        <Header
          title="댓글 수정"
          prevOnClick={prevOnClick}
          rightBtnInfo={{ name: '완료', isActive: true, onClick: handleClickComplete }}
        />

        {/* 수정할 댓글 내용 */}
        <textarea value={content} onChange={handleChangeContent} {...stylex.props(Styles.textarea)} />
      </div>
    </Modal>
  );
};

export default CommentEditModal;

const Styles = stylex.create({
  container: {
    width: '767px',
    maxWidth: '100%',
    height: '100vh',
    background: colors.white500,
  },
  textarea: {
    width: '100%',
    height: '100%',
    padding: '12px 28px',
    background: colors.white500,
    border: 'none',
    outline: 'none',
    resize: 'none',
    fontSize: '1.4rem',
    lineHeight: '2rem',
    fontWeight: '400',
    color: '#333333',
  },
});
