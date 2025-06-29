import React from 'react';
import stylex from '@stylexjs/stylex';
import { colors, Shadows, Typography } from '../../public/styles/vars.stylex';
import MainLayout from '@src/layouts/MainLayout';
import Link from 'next/link';

const Home = () => {
  const descriptions = [
    {
      id: 1,
      title: '설치 없이 바로 예약, 언제 어디서든',
      content: '모바일 웹으로 실시간 회의실 현황을 확인하고, 터치 몇 번으로 빠르게 예약하세요.',
      icon: '',
    },
    {
      id: 2,
      title: '모든 회의 준비는 한 곳에서 관리',
      content: '회의 개최, 참석자 등 웹에서 통합 관리, 중요한 내용은 놓치지 않습니다.',
      icon: '',
    },
    {
      id: 3,
      title: '팀 워크스페이스로 생산성 극대화',
      content: '간편한 멤버 초대와 워크스페이스 관리가 웹에서 가능합니다.',
      icon: '',
    },
  ];

  return (
    <MainLayout isScroll>
      <section {...stylex.props(Styles.heroSection)}>
        <h1 {...stylex.props(Typography.TitleRegularBold, Styles.title)}>
          룸렛: 모바일에서 바로
          <br />
          스마트 회의실 예약
        </h1>

        <p {...stylex.props(Typography.TextSmallMedium, Styles.heroDescription)}>
          설치 없이 웹에서 즉시 시작!
          <br />
          회의실 눈치싸움은 이제 그만!
        </p>

        <Link href="/login" {...stylex.props(Styles.startLink, Styles.isRedButton, Typography.SubTextRegularBold)}>
          무료로 룸렛 시작하기
        </Link>
      </section>

      <section {...stylex.props(Styles.featuresSection)}>
        {descriptions.map((item) => (
          <div key={item.id} {...stylex.props(Styles.featureItem)}>
            <div {...stylex.props(Styles.featureIcon)}>{item.icon}</div>
            <div {...stylex.props(Styles.featureBody)}>
              <h3 {...stylex.props(Typography.SubTextRegularBold)}>{item.title}</h3>
              <p {...stylex.props(Typography.SubTextLargeRegular)}>{item.content}</p>
            </div>
          </div>
        ))}
      </section>

      <section {...stylex.props(Styles.ctaSection)}>
        <div {...stylex.props(Styles.ctaBody)}>
          <h2 {...stylex.props(Typography.TitleRegularBold, Styles.ctaTitle)}>룸렛으로 팀의 회의를 시작하세요!</h2>
          <p {...stylex.props(Typography.SubTextLargeRegular, Styles.ctaContent)}>
            지금 바로 로그인 후 무료로 시작해보세요.
          </p>

          <Link href="/login" {...stylex.props(Styles.startLink, Styles.isWhiteButton, Typography.SubTextRegularBold)}>
            무료로 룸렛 시작하기
          </Link>

          <Link href="/login" {...stylex.props(Styles.alreadyHaveAccountLink, Typography.CaptionRegularRegular)}>
            이미 계정이 있으신가요? 로그인
          </Link>
        </div>
      </section>

      <footer {...stylex.props(Styles.footer)}>
        <div {...stylex.props(Styles.footerLinks)}>
          <Link href="/" {...stylex.props(Typography.CaptionRegularRegular, Styles.footerLink)}>
            이용약관
          </Link>
          <Link href="/" {...stylex.props(Typography.CaptionRegularRegular, Styles.footerLink)}>
            개인정보 처리방침
          </Link>
        </div>

        <p {...stylex.props(Typography.CaptionRegularRegular, Styles.footerCopyright)}>Copyright © 2025 룸렛</p>
      </footer>
    </MainLayout>
  );
};

export default Home;

const Styles = stylex.create({
  heroSection: {
    // 히어로 섹션 스타일
    padding: '64px 25px 30px',
    backgroundColor: colors.white500,
    textAlign: 'center',
    color: colors.black300,
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  startLink: {
    width: '100%',
    display: 'block',
    padding: '10px',
    borderRadius: '12px',
    textAlign: 'center',
    textDecoration: 'none',
    boxShadow: Shadows.Shadow1,
  },
  isRedButton: {
    backgroundColor: colors.red500,
    color: colors.white500,
  },
  isWhiteButton: {
    backgroundColor: colors.white500,
    color: colors.red500,
  },
  heroDescription: {
    marginBottom: '20px',
  },
  featuresSection: {
    // 기능 소개 섹션 스타일
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '24px 25px',
    backgroundColor: colors.gray20,
  },
  featureItem: {
    // 각 기능 아이템 스타일
    display: 'flex',
    gap: '16px',
    padding: '16px',
    backgroundColor: colors.white500,
    borderRadius: '12px',
  },
  featureIcon: {
    flexShrink: 0,
    width: '44px',
    height: '44px',
    backgroundColor: '#EDF2FE',
    borderRadius: '8px',
  },
  featureBody: {},
  ctaSection: {
    // CTA 섹션 스타일
    backgroundColor: colors.gray20,
    textAlign: 'center',
  },
  ctaBody: {
    // CTA 컨텐츠 스타일
    padding: '30px 26px',
    textAlign: 'center',
    backgroundColor: colors.red500,
    borderRadius: '24px 24px 0 0',
  },
  ctaTitle: {
    marginBottom: '18px',
    color: colors.white500,
  },
  ctaContent: {
    marginBottom: '18px',
    color: colors.gray20,
  },
  alreadyHaveAccountLink: {
    display: 'block',
    marginTop: '18px',
    color: colors.gray20,
    textDecoration: 'underline',
  },
  footer: {
    // 푸터 스타일
    padding: '28px',
  },
  footerLinks: {
    marginBottom: '4px',
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
  },
  footerLink: {
    textDecoration: 'none',
    color: colors.gray700,
  },
  footerCopyright: {
    textAlign: 'center',
    color: colors.gray60,
  },
});
