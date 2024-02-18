import ProfileImg from '@src/components/ui/ProfileImg';
import stylex from '@stylexjs/stylex';
import React, { FC } from 'react';

/**
 * 홈 화면에서 사용자에게 인사를 하는 내용을 담은 컴포넌트
 */
const UserGreeting = () => {
  return (
    <div {...stylex.props(Styles.container)}>
      <ProfileImg src={null} size={50} borderProperties={{ radius: '50%' }} />
      <div {...stylex.props(Styles.textContent)}>
        <p {...stylex.props(Styles.greetingText)}>룸렛에 오신걸 환영해요 🖐🏻</p>
        <p {...stylex.props(Styles.nicknameText)}>닉네임님</p>
      </div>
    </div>
  );
};

export default UserGreeting;

const Styles = stylex.create({
  container: {
    marginBottom: '32px',
    width: '100%',
    padding: '0 16px',
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  textContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  greetingText: {
    fontSize: '1.4rem',
    fontWeight: '400',
    lineHeight: '1.8rem',
    color: '#999999',
  },
  nicknameText: {
    fontSize: '1.8rem',
    fontWeight: '700',
    lineHeight: '2.4rem',
    color: '#333333',
  },
});
