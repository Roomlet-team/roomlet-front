import React from 'react';
import useGlobalRouter from '@src/hooks/useGlobalRouter';
import stylex from '@stylexjs/stylex';
import RoomletLogo from '@assets/logo_roomlet.svg';
import RoomletTextLogo from '@assets/logo_text_roomlet.svg';
import GoogleLogo from '@features/authentication/assets/google_logo.svg';
import MainLayout from '@src/layouts/MainLayout';
import SEOHead from '@src/components/ui/SEOHead';
import { Typography, colors } from '../../public/styles/vars.stylex';
import { TERMS } from '@src/constant/terms';

const Login = () => {
  const router = useGlobalRouter();
  const { prev_url } = router.query;
  const defaultPrevUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/home`;
  const snsLoginList = [
    {
      id: 1,
      logo: <GoogleLogo />,
      name: 'Google',
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/auth/google?prev_url=${prev_url || defaultPrevUrl}`,
    },
  ];

  const handleClickSnsLogin = (url) => {
    router.push(url);
  };

  return (
    <>
      <SEOHead title="로그인 | 룸렛" description="룸렛 로그인 페이지 입니다." url={{ pathname: '/login' }} />

      <MainLayout>
        <div {...stylex.props(LogoStyles.content)}>
          <RoomletLogo />
          <RoomletTextLogo />
        </div>

        <div {...stylex.props(SnsLoginStyles.chromeRecommendContainer)}>
          <p {...stylex.props(SnsLoginStyles.chromeRecommendText, Typography.SubTextLargeRegular)}>
            원활한 서비스 이용을 위해
            <br /> <span {...stylex.props(SnsLoginStyles.chromeBold)}>Chrome 브라우저</span> 사용을 권장해요
          </p>
        </div>

        <div {...stylex.props(SnsLoginStyles.content)}>
          {snsLoginList.map((item) => (
            <button
              type="button"
              key={item.id}
              {...stylex.props(SnsLoginStyles.button)}
              onClick={() => handleClickSnsLogin(item.url)}
            >
              <span>{item.logo}</span>
              <span>{item.name}&nbsp;계정으로 시작하기</span>
            </button>
          ))}
        </div>

        <p {...stylex.props(TermsStyles.text)}>
          시작하기를 누르는 것으로 계정 연동에 대한{' '}
          <a {...stylex.props(TermsStyles.link)} href={TERMS.SERVICE_AGREE}>
            이용약관
          </a>
          과{' '}
          <a {...stylex.props(TermsStyles.link)} href={TERMS.PRIVACY_AGREE}>
            개인정보 처리방침
          </a>
          에 동의하고 서비스를 이용합니다.
        </p>
      </MainLayout>
    </>
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
    padding: '0 16px',
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
  chromeRecommendContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  chromeIcon: {
    fontSize: '1.6rem',
  },
  chromeRecommendText: {
    color: colors.black500,
    textAlign: 'center',
  },
  chromeBold: {
    fontWeight: 700,
  },
});

const TermsStyles = stylex.create({
  text: {
    padding: '0 16px',
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
