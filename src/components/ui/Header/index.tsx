import React, { FC } from 'react';
import Link from 'next/link';
import stylex from '@stylexjs/stylex';
import { Typography, colors } from '../../../../public/styles/vars.stylex';
import ArrowHeadOutlined from '@src/components/icons/ArrowHeadOutlined';

type HeaderProps = {
  title: string; // 제목
  prevUrl?: string; // 이전으로 이동할 url
  rightBtnInfo?: {
    name: string;
    isActive: boolean;
    onClick: (e) => void;
  };
};

const Header: FC<HeaderProps> = (props) => {
  const { title, prevUrl, rightBtnInfo } = props;

  return (
    <div {...stylex.props(Styles.container, rightBtnInfo && Styles.withRightBtn)}>
      {prevUrl && (
        <Link href={prevUrl}>
          <ArrowHeadOutlined width={24} height={24} />
        </Link>
      )}
      <h1 {...stylex.props(Typography.TitleSmallSemiBold)}>{title}</h1>
      {/* 오른쪽 상단에 배치되는 버튼 */}
      {rightBtnInfo && (
        <button
          type="button"
          onClick={rightBtnInfo.onClick}
          {...stylex.props(
            Typography.SubTextLargeRegular,
            Styles.rightBtn,
            rightBtnInfo.isActive && Styles.isActiveRightBtn
          )}
        >
          {rightBtnInfo.name}
        </button>
      )}
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
  withRightBtn: {
    justifyContent: 'space-between',
  },
  rightBtn: {
    padding: 0,
    color: colors.gray50,
  },
  isActiveRightBtn: {
    color: '#3859CE',
  },
});
