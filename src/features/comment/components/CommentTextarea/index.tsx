import React, { useEffect, useState } from 'react';
import stylex from '@stylexjs/stylex';
import useTextArea from '@src/hooks/useTextArea';
import { colors } from '../../../../../public/styles/vars.stylex';
import SendFilled from '@src/components/icons/SendFilled';
import { title } from 'process';

const CommentTextarea = () => {
  const [value, handleChangeValue] = useTextArea('');

  useEffect(() => {
    // 컨텐츠 양에 맞게 textarea가 자동으로 조절되게 하는 코드
    const commentTextarea = document.getElementById('comment');
    commentTextarea.style.height = '20px'; // 높이 리셋
    commentTextarea.style.height = `${commentTextarea.scrollHeight}px`; // 스크롤이 생기게 될 높이 설정
  }, [value]);

  return (
    <div {...stylex.props(Styles.container)}>
      <div {...stylex.props(Styles.textareaAndSubmitContainer)}>
        <textarea
          {...stylex.props(Styles.textarea)}
          id="comment"
          value={value}
          onChange={handleChangeValue}
          rows={1}
          placeholder="댓글을 입력해주세요."
        />
        <div {...stylex.props(Styles.iconWrapper)}>
          <SendFilled width={32} height={32} />
        </div>
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
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    border: `1px solid #d4d4d4`,
    borderRadius: '16px',
  },
  textarea: {
    width: '100%',
    maxHeight: '60px',
    padding: 0,
    border: 'none',
    resize: 'none',
    fontSize: '1.4rem',
    outline: 'none',
    overflow: 'auto',
    color: {
      default: colors.black500,
      ':placeholder': colors.gray60,
    },
  },
  iconWrapper: {
    lineHeight: 1,
    flexShrink: 0,
    alignSelf: 'flex-end',
  },
});
