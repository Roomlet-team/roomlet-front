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
    lineHeight: '3.4rem',
  },
  TitleLargeSemiBold: {
    fontWeight: '600',
    fontSize: '2.4rem',
    lineHeight: '3.4rem',
  },
  TitleLargeMedium: {
    fontWeight: '500',
    fontSize: '2.4rem',
    lineHeight: '3.4rem',
  },
  TitleLargeRegular: {
    fontWeight: '400',
    fontSize: '2.4rem',
    lineHeight: '3.4rem',
  },
  TitleRegularSemiBold: {
    fontWeight: '600',
    fontSize: '2.2rem',
    lineHeight: '2.6rem',
  },
  TitleSmallBold: {
    fontWeight: '700',
    fontSize: '2rem',
    lineHeight: '2.4rem',
  },
  TitleSmallSemiBold: {
    fontWeight: '600',
    fontSize: '2rem',
    lineHeight: '2.4rem',
  },
  TitleSmallSemiBold32: {
    fontWeight: '600',
    fontSize: '2rem',
    lineHeight: '3.2rem',
  },
  // Subtitle
  SubtitleLargeBold32: {
    fontWeight: '700',
    fontSize: '1.7rem',
    lineHeight: '3.2rem',
  },
  SubtitleLargeSemiBold: {
    fontWeight: '600',
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
  SubtitleSmallSemiBold: {
    fontWeight: '600',
    fontSize: '1.4rem',
    lineHeight: '2.2rem',
  },
  // Text
  TextXLargeSemiBold: {
    fontWeight: '600',
    fontSize: '3.2rem',
    lineHeight: '3.8rem',
  },
  TextLargeMedium: {
    fontWeight: '500',
    fontSize: '2rem',
    lineHeight: '2.4rem',
  },
  TextRegularBold: {
    fontWeight: '700',
    fontSize: '1.8rem',
    lineHeight: '2.6rem',
  },
  TextRegularMedium: {
    fontWeight: '500',
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
  TextSmallRegular32: {
    fontWeight: '400',
    fontSize: '1.6rem',
    lineHeight: '3.2rem',
  },
  // Caption
  CaptionLargeSemiBold: {
    fontWeight: '600',
    fontSize: '1.5rem',
    lineHeight: '2.4rem',
  },
  CaptionLargeRegular: {
    fontWeight: '400',
    fontSize: '1.5rem',
    lineHeight: '2.4rem',
  },
  CaptionRegularMedium: {
    fontWeight: '500',
    fontSize: '1.4rem',
    lineHeight: '2rem',
  },
  CaptionRegularRegular: {
    fontWeight: '400',
    fontSize: '1.4rem',
    lineHeight: '2rem',
  },
  // Tag
  TagLargeSemiBold: {
    fontWeight: '600',
    fontSize: '1.3rem',
    lineHeight: '1.4rem',
  },
  TagLargeMedium: {
    fontWeight: '500',
    fontSize: '1.3rem',
    lineHeight: '1.4rem',
  },
  TagLargeRegular: {
    fontWeight: '400',
    fontSize: '1.3rem',
    lineHeight: '1.4rem',
  },
  TagRegularRegular: {
    fontWeight: '400',
    fontSize: '1.2rem',
    lineHeight: '1.6rem',
  },
  TagSmallMedium: {
    fontWeight: '500',
    fontSize: '1rem',
    lineHeight: '1rem',
  },
});
