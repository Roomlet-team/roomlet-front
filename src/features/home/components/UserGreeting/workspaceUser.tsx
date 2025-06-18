import ProfileImg from '@src/components/ui/ProfileImg';
import stylex from '@stylexjs/stylex';
import React, { FC } from 'react';
import useGetWorkspaceMainInfoQuery from '../../queries/useGetWorkspaceMainInfoQuery';
import Link from 'next/link';
import AlarmOutlined from '@src/components/icons/AlarmOutlined';

/**
 * 홈 화면에서 워크스페이스에 가입된 사용자에게 환영하는 내용을 담은 컴포넌트
 */
const WorkspaceUserGreeting = () => {
  const { data } = useGetWorkspaceMainInfoQuery();

  return (
    <div {...stylex.props(Styles.container)}>
      {/* 유저 정보 */}
      <div {...stylex.props(Styles.userInfoContainer)}>
        <ProfileImg src={data?.memberInfo.profileImgKey} size={50} borderProperties={{ radius: '50%' }} />
        <div {...stylex.props(Styles.textContent)}>
          <p {...stylex.props(Styles.greetingText)}>룸렛에 오신걸 환영해요 🖐🏻</p>
          <p {...stylex.props(Styles.nicknameText)}>{data?.memberInfo.displayName}님</p>
        </div>
      </div>

      {/* 알림 이동 링크 */}
      <Link href="/alarm">
        <AlarmOutlined width={24} height={24} />
      </Link>
    </div>
  );
};

export default WorkspaceUserGreeting;

const Styles = stylex.create({
  container: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  userInfoContainer: {
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
