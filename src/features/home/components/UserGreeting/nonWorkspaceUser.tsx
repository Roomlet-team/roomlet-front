import ProfileImg from '@src/components/ui/ProfileImg';
import stylex from '@stylexjs/stylex';
import React, { FC } from 'react';
import useGetMyPageProfileQuery from '@src/features/mypage/profile/queries/useGetMyPageProfileQuery';

/**
 * 홈 화면에서 아직 워크스페이스에 가입되지 않은 사용자에게 인사를 하는 내용을 담은 컴포넌트
 */
const NonWorkspaceUserGreeting = () => {
  const { data } = useGetMyPageProfileQuery();

  return (
    <div {...stylex.props(Styles.container)}>
      <ProfileImg src={data?.profile.profileImgKey} size={50} borderProperties={{ radius: '50%' }} />
      <div {...stylex.props(Styles.textContent)}>
        <p {...stylex.props(Styles.greetingText)}>룸렛에 오신걸 환영해요 🖐🏻</p>
        <p {...stylex.props(Styles.nicknameText)}>{data?.profile.displayName}님</p>
      </div>
    </div>
  );
};

export default NonWorkspaceUserGreeting;

const Styles = stylex.create({
  container: {
    width: '100%',
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
