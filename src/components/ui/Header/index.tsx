import React, { FC } from 'react';
import Link from 'next/link';
import stylex from '@stylexjs/stylex';
import { Typography } from '../../../../public/styles/vars.stylex';
import ArrowHeadOutlined from '@src/components/icons/ArrowHeadOutlined';

type HeaderProps = {
  title: string; // 제목
  prevUrl?: string; // 이전으로 이동할 url
};

const Header: FC<HeaderProps> = (props) => {
  const { title, prevUrl } = props;

  return (
    <div {...stylex.props(Styles.container)}>
      {prevUrl && (
        <Link href={prevUrl}>
          <ArrowHeadOutlined width={24} height={24} />
        </Link>
      )}
      <h1 {...stylex.props(Typography.TitleSmallSemiBold)}>{title}</h1>
    </div>
  );
};

export default Header;

const Styles = stylex.create({
  container: {
    display: 'flex',
    padding: '16px',
    gap: '16px',
    alignItems: 'center',
  },
});
