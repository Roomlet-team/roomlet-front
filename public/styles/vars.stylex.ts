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
