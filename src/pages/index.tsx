import React from 'react';
import stylex from '@stylexjs/stylex';
import { colors, Shadows, Typography } from '../../public/styles/vars.stylex';
import MainLayout from '@src/layouts/MainLayout';
import Link from 'next/link';
import SEOHead from '@src/components/ui/SEOHead';

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

  const footerLinks = [
    {
      id: 1,
      title: '이용약관',
      href: 'https://www.notion.so/204bdfc5b2a780de83cae0ddc55c101d?source=copy_link',
    },
    {
      id: 2,
      title: '개인정보 처리방침',
      href: 'https://www.notion.so/204bdfc5b2a78038b177d3d6a3efa6f8?source=copy_link',
    },
  ];

  return (
    <MainLayout isScroll>
      <SEOHead
        title="룸렛 : 스마트 회의 관리 솔루션"
        description="설치없이 웹에서 바로 시작하는 룸렛! 모바일로 실시간 회의실 예약하고 모든 회의 준비와 팀 협업을 한 곳에서 관리하여 생산성을 극대화하세요."
        url={{ pathname: '/' }}
      />

      <section {...stylex.props(Styles.heroSection)}>
        <h1 {...stylex.props(Typography.TextXLargeBold, Styles.title)}>
          룸렛: 모바일에서 바로,
          <br />
          스마트 회의실 예약
        </h1>

        <p {...stylex.props(Typography.TextSmallRegular, Styles.heroDescription)}>
          설치 없이 웹에서 즉시 시작!
          <br />
          회의실 눈치싸움은 이제 그만.
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
              <h3 {...stylex.props(Typography.SubtitleRegularSemiBold)}>{item.title}</h3>
              <p {...stylex.props(Typography.CaptionLargeRegular)}>{item.content}</p>
            </div>
          </div>
        ))}
      </section>

      <section {...stylex.props(Styles.ctaSection)}>
        <div {...stylex.props(Styles.ctaBody)}>
          <h2 {...stylex.props(Styles.ctaTitle)}>룸렛으로 팀의 회의를 시작하세요!</h2>
          <p {...stylex.props(Styles.ctaContent)}>지금 바로 로그인 후 무료로 시작해보세요.</p>

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
          {footerLinks.map((item) => (
            <Link href={item.href} key={item.id} target="_blank" {...stylex.props(Styles.footerLink)}>
              {item.title}
            </Link>
          ))}
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
    padding: '84px 16px 32px',
    backgroundColor: colors.white500,
    textAlign: 'center',
    color: colors.black300,
  },
  title: {
    marginBottom: '24px',
    textAlign: 'center',
  },
  startLink: {
    width: '100%',
    display: 'block',
    padding: '10px',
    borderRadius: '16px',
    textAlign: 'center',
    textDecoration: 'none',
    boxShadow: '0 4px 8px 0px rgba(87, 56, 56, 0.25)',
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
    marginBottom: '28px',
  },
  featuresSection: {
    // 기능 소개 섹션 스타일
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '32px 16px',
    backgroundColor: colors.gray20,
  },
  featureItem: {
    // 각 기능 아이템 스타일
    display: 'flex',
    gap: '12px',
    padding: '16px',
    backgroundColor: colors.white500,
    borderRadius: '12px',
  },
  featureIcon: {
    flexShrink: 0,
    width: '36px',
    height: '36px',
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
    padding: '24px 16px',
    textAlign: 'center',
    backgroundColor: colors.red500,
    borderRadius: '16px 16px 0 0',
  },
  ctaTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    lineHeight: '3.2rem',
    color: colors.white500,
  },
  ctaContent: {
    marginBottom: '18px',
    color: colors.gray20,
    fontWeight: '400',
    fontSize: '1.4rem',
    lineHeight: '1.8rem',
  },
  alreadyHaveAccountLink: {
    display: 'block',
    marginTop: '24px',
    color: colors.gray40,
    textDecoration: 'underline',
    fontWeight: '500',
    fontSize: '1.4rem',
    lineHeight: '1.8rem',
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
    fontWeight: '400',
    fontSize: '1.4rem',
    lineHeight: '1.8rem',
  },
  footerCopyright: {
    textAlign: 'center',
    color: colors.gray700,
    fontWeight: '400',
    fontSize: '1.4rem',
    lineHeight: '1.8rem',
  },
});
