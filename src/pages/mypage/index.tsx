import React from 'react';
import Header from '@src/components/ui/Header';
import GnbNavLayout from '@src/layouts/GnbNavLayout';
import stylex from '@stylexjs/stylex';
import { colors } from '../.../../../../public/styles/vars.stylex';
import MypageSummaryProfile from '@src/features/mypage/compontents/MypageSummaryProfile';
import MypageMenu from '@src/features/mypage/compontents/MypageMenu';

const MyPageHome = () => {
  return (
    <GnbNavLayout backgroundColor={colors.white500}>
      <Header title="마이페이지" />
      {/* 프로필 페이지로 이동 */}
      <MypageSummaryProfile />
      {/* 경계선 */}
      <div {...stylex.props(Styles.BoundaryArea)} />
      {/* 마이페이지 메뉴 */}
      <MypageMenu />
    </GnbNavLayout>
  );
};

export default MyPageHome;

const Styles = stylex.create({
  BoundaryArea: {
    width: '100%',
    height: '8px',
    background: colors.gray30,
    borderTop: `1px solid ${colors.gray30}`,
  },
});
