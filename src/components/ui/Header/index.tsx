import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import stylex from '@stylexjs/stylex';
import { Typography, colors } from '../../../../public/styles/vars.stylex';
import ArrowHeadOutlined from '@src/components/icons/ArrowHeadOutlined';
import useBackNavigation from '@src/hooks/useBackNavigation';

type HeaderProps = {
  title?: string; // 제목
  prevOnClick?: () => void;
  rightBtnInfo?: {
    name: string;
    isActive: boolean;
    onClick: (e) => void;
  };
};

const Header: FC<HeaderProps> = (props) => {
  const { title, prevOnClick, rightBtnInfo } = props;
  const { goBackOrHome } = useBackNavigation();

  return (
    <div {...stylex.props(Styles.container, rightBtnInfo && Styles.withRightBtn)}>
      <button type="button" onClick={prevOnClick || goBackOrHome}>
        <ArrowHeadOutlined width={24} height={24} />
      </button>

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
    background: colors.white500,
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
