import stylex from '@stylexjs/stylex';

// [ ] ts 사용하여 정의하기
export const colors = stylex.defineVars({
  black500: '#1A1A1A',
  black400: '#242C33',
  black300: '#444444',
  black200: '#5A5E62',
  gray900: '#4A4A4A',
  gray700: '#61686D',
  gray60: '#999999',
  gray50: '#A7ABAD',
  gray40: '#D9D9D9',
  gray30: '#E3E3E3',
  white500: '#FFFFFF',
  white5: 'rgba(255, 255, 255, 0.5)',
  red500: '#B5312C',
  red300: '#D14444',
  red50: '#D56231',
  blue300: '#087BFF',
  yellow300: '#FF8329',
  green300: '#67BC8F',
});

export const BackgroundColor = stylex.defineVars({
  gradientBlackBg: 'linear-gradient(219deg, #384149 0%, #000 100%);',
});

export const Typography = stylex.create({
  // Title
  TitleLargeBold: {
    fontWeight: '700',
    fontSize: '2.4rem',
    lineHeight: '4rem',
  },
  TitleRegularBold: {
    fontWeight: '700',
    fontSize: '2rem',
    lineHeight: '2.6rem',
  },
  TitleSmallSemiBold: {
    fontWeight: '600',
    fontSize: '1.8rem',
    lineHeight: '2.6rem',
  },
  // Subtitle
  SubtitleLargeBold: {
    fontWeight: '700',
    fontSize: '1.7rem',
    lineHeight: '2.4rem',
  },
  SubtitleRegularBold: {
    fontWeight: '700',
    fontSize: '1.6rem',
    lineHeight: '2.4rem',
  },
  SubtitleRegularSemiBold: {
    fontWeight: '600',
    fontSize: '1.6rem',
    lineHeight: '2.4rem',
  },
  SubtitleSmallBold: {
    fontWeight: '700',
    fontSize: '1.4rem',
    lineHeight: '2rem',
  },
  // Text
  TextXLargeBold: {
    fontWeight: '700',
    fontSize: '2.8rem',
    lineHeight: '3.4rem',
  },
  TextLargeBold: {
    fontWeight: '500',
    fontSize: '2.4rem',
    lineHeight: '3.2rem',
  },
  TextRegularBold: {
    fontWeight: '700',
    fontSize: '1.8rem',
    lineHeight: '2.6rem',
  },
  TextSmallMedium: {
    fontWeight: '500',
    fontSize: '1.6rem',
    lineHeight: '2.4rem',
  },
  TextSmallRegular: {
    fontWeight: '400',
    fontSize: '1.6rem',
    lineHeight: '2.4rem',
  },
  // SubText
  SubTextLargeSemiBold: {
    fontWeight: '600',
    fontSize: '1.4rem',
    lineHeight: '2rem',
  },
  SubTextLargeMedium: {
    fontWeight: '500',
    fontSize: '1.4rem',
    lineHeight: '2rem',
  },
  SubTextLargeRegular: {
    fontWeight: '400',
    fontSize: '1.4rem',
    lineHeight: '2rem',
  },
  SubTextRegularSemiBold: {
    fontWeight: '600',
    fontSize: '1.2rem',
    lineHeight: '1.8rem',
  },
  // Caption
  CaptionLargeRegular: {
    fontWeight: '400',
    fontSize: '1.3rem',
    lineHeight: '1.8rem',
  },
  CaptionRegularRegular: {
    fontWeight: '400',
    fontSize: '1.2rem',
    lineHeight: '1.6rem',
  },
  // Tag
  TagLargeMedium: {
    fontWeight: '500',
    fontSize: '1.3rem',
    lineHeight: '1.8rem',
  },
  TagRegularMedium: {
    fontWeight: '400',
    fontSize: '1.2rem',
    lineHeight: '100%',
  },
  // Nav
  NavLargeMedium: {
    fontWeight: '500',
    fontSize: '1.2rem',
    lineHeight: '100%',
  },
  NavLargeRegular: {
    fontWeight: '400',
    fontSize: '1.2rem',
    lineHeight: '100%',
  },
});

export const Shadows = stylex.defineVars({
  Shadow1: '0 4px 16px 0px rgba(87, 56, 56, 0.12)',
});
