import React from 'react';
import stylex from '@stylexjs/stylex';
import RoomletLogo from '@asset/logo_roomlet.svg';
import RoomletTextLogo from '@asset/logo_text_roomlet.svg';
import GoogleLogo from '@features/authentication/assets/google_logo.svg';
import MainLayout from '@src/layouts/MainLayout';

const Login = () => {
  const snsLoginList = [{ id: 1, logo: <GoogleLogo />, name: 'Google' }];

  return (
    <MainLayout>
      <div {...stylex.props(LogoStyles.content)}>
        <RoomletLogo />
        <RoomletTextLogo />
      </div>
      <div {...stylex.props(SnsLoginStyles.content)}>
        {snsLoginList.map((item) => (
          <button type="button" key={item.id} {...stylex.props(SnsLoginStyles.button)}>
            <span>{item.logo}</span>
            <span>{item.name}&nbsp;계정으로 시작하기</span>
          </button>
        ))}
      </div>
      <p {...stylex.props(TermsStyles.text)}>
        시작하기를 누르는 것으로 계정 연동에 대한{' '}
        <a {...stylex.props(TermsStyles.link)} href="/">
          이용약관
        </a>
        과{' '}
        <a {...stylex.props(TermsStyles.link)} href="/">
          개인정보 처리방침
        </a>
        에 동의하고 서비스를 이용합니다.
      </p>
    </MainLayout>
  );
};

export default Login;

const LogoStyles = stylex.create({
  content: {
    marginTop: '142px',
    marginBottom: '264px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '24px',
  },
});

const SnsLoginStyles = stylex.create({
  content: {
    width: '100%',
    marginBottom: '24px',
  },
  button: {
    width: '100%',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '56px',
    border: '1px solid #E6E6E6',
    borderRadius: '8px',
    fontSize: '1.4rem',
    background: 'var(--Base-White)',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '1.8rem' /* 128.571% */,
  },
});

const TermsStyles = stylex.create({
  text: {
    color: '#A6A6A6',
    textAlign: 'center',
    fontSize: '1.2rem',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '1.6rem' /* 133.333% */,
    textAlignLast: 'center',
    wordBreak: 'keep-all',
  },
  link: {
    textDecorationLine: 'underline',
    textUnderlinePosition: 'under',
    color: '#A6A6A6',
  },
});
