import React, { useState } from 'react';
import stylex from '@stylexjs/stylex';
import useTextArea from '@src/hooks/useTextArea';
import { colors } from '../../../../../public/styles/vars.stylex';
import SendFilled from '@src/components/icons/SendFilled';

const CommentTextarea = () => {
  const [value, handleChangeValue] = useTextArea('');

  return (
    <div {...stylex.props(Styles.container)}>
      <div {...stylex.props(Styles.textareaAndSubmitContainer)}>
        <textarea
          {...stylex.props(Styles.textarea)}
          value={value}
          onChange={handleChangeValue}
          rows={1}
          placeholder="댓글을 입력해주세요."
        />
        <SendFilled width={32} height={32} />
      </div>
    </div>
  );
};

export default CommentTextarea;

const Styles = stylex.create({
  container: {
    padding: '16px',
    borderTop: `1px solid ${colors.gray20}`,
    background: colors.white500,
  },
  textareaAndSubmitContainer: {
    height: 'auto',
    padding: '12px',
    display: 'flex',
    gap: '16px',
    border: `1px solid #d4d4d4`,
    borderRadius: '16px',
  },
  textarea: {
    width: '100%',
    // height: '20px',
    padding: 0,
    border: 'none',
    resize: 'none',
  },
});
