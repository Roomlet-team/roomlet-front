import React from 'react';
import Header from '@src/components/ui/Header';
import GnbNavLayout from '@src/layouts/GnbNavLayout';
import { colors } from '../.../../../../public/styles/vars.stylex';
import MypageSummaryProfile from '@src/features/mypage/compontents/MypageSummaryProfile';
import MypageMenu from '@src/features/mypage/compontents/MypageMenu';
import SettingOutlined from '@src/components/icons/SettingOutlined';
import AddUserOutlined from '@src/components/icons/AddUserOutlined';
import MegaphoneOutlined from '@src/components/icons/MegaphoneOutlined';
import BellOutlined from '@src/components/icons/BellOutlined';
import ExitOutlined from '@src/components/icons/ExitOutlined';
import BoundaryArea from '@src/components/ui/BoundaryArea';

const MyPageHome = () => {
  const commonUrl = 'mypage';
  const menuList = [
    {
      id: 1,
      name: '워크스페이스 설정',
      icon: <SettingOutlined width={24} height={24} />,
      href: `/${commonUrl}/workspace`,
    },
    { id: 2, name: '멤버초대', icon: <AddUserOutlined width={24} height={24} />, href: '' },
    { id: 3, name: '공지사항 작성', icon: <MegaphoneOutlined width={24} height={24} />, href: '' },
    { id: 4, name: '알림설정', icon: <BellOutlined width={24} height={24} />, href: '' },
    { id: 5, name: '워크스페이스 나가기', icon: <ExitOutlined width={24} height={24} />, href: '' },
  ];

  return (
    <GnbNavLayout backgroundColor={colors.white500}>
      <Header title="마이페이지" />
      {/* 프로필 페이지로 이동 */}
      <MypageSummaryProfile />

      {/* 경계선 */}
      <BoundaryArea />

      {/* 마이페이지 메뉴 */}
      <MypageMenu menuList={menuList} />
    </GnbNavLayout>
  );
};

export default MyPageHome;
