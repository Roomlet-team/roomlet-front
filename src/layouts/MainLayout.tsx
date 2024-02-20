import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';

type MainLayoutProps = {
  children: React.ReactElement | React.ReactElement[] | string;
};

const MainLayout: FC<MainLayoutProps> = (props) => {
  const { children } = props;

  return <div {...stylex.props(Styles.container)}>{children}</div>;
};

export default MainLayout;

const Styles = stylex.create({
  container: {
    width: '100%',
    height: '100%',
    margin: '0 auto',
    maxWidth: '767px',
    overflowY: 'hidden',
  },
});
