import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';

type MainLayoutProps = {
  isScroll: boolean; // 전체 화면에 스크롤이 적용되게 할지 말지 결정
  children: React.ReactElement | React.ReactElement[] | string;
};

const MainLayout: FC<MainLayoutProps> = (props) => {
  const { isScroll, children } = props;

  return <div {...stylex.props(Styles.container(isScroll))}>{children}</div>;
};

export default MainLayout;

const Styles = stylex.create({
  container: (isScroll) => ({
    width: '100%',
    height: '100%',
    margin: '0 auto',
    maxWidth: '767px',
    overflowY: isScroll ? 'auto' : 'hidden',
  }),
});
