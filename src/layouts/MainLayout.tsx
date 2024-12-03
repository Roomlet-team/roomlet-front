import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';
import { colors } from '../../public/styles/vars.stylex';

interface MainLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  isScroll?: boolean; // 전체 화면에 스크롤이 적용되게 할지 말지 결정
  backgroundColor?: string;
  children: React.ReactElement | React.ReactElement[] | string;
}

const MainLayout: FC<MainLayoutProps> = (props) => {
  const { isScroll, backgroundColor, children } = props;

  return (
    <div id="main-layout" {...stylex.props(Styles.container(isScroll, backgroundColor))}>
      {children}
    </div>
  );
};

export default MainLayout;

const Styles = stylex.create({
  container: (isScroll: boolean, backgroundColor: string) => ({
    width: '100%',
    height: '100%',
    margin: '0 auto',
    maxWidth: '767px',
    position: 'relative',
    overflowY: isScroll ? 'auto' : 'hidden',
    background: backgroundColor || colors.white500,
  }),
});
