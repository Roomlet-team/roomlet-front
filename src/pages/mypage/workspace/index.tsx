import React, { useState } from 'react';
import stylex from '@stylexjs/stylex';
import BoxOutlined from '@src/components/icons/BoxOutlined';
import CategoryGroupOutlined from '@src/components/icons/CategoryGroupOutlined';
import UserGroupOutlined from '@src/components/icons/UserGroupOutlined';
import Header from '@src/components/ui/Header';
import MypageMenu from '@src/features/mypage/compontents/MypageMenu';
import MainLayout from '@src/layouts/MainLayout';

const WorkspaceHome = () => {
  const [isEditComplete, setIsEditComplete] = useState<boolean>(false);
  const commonUrl = 'mypage/workspace';
  const menuList = [
    {
      id: 1,
      name: '멤버 정보',
      icon: <UserGroupOutlined width={24} height={24} />,
      href: `/${commonUrl}/member`,
    },
    { id: 2, name: '회의실 정보', icon: <BoxOutlined width={24} height={24} />, href: '' },
    { id: 3, name: '카테고리 정보', icon: <CategoryGroupOutlined width={24} height={24} />, href: '' },
  ];

  const completeBtnProps = {
    name: '완료',
    isActive: isEditComplete,
    onClick: () => console.log(''),
  };

  return (
    <MainLayout>
      <Header title="워크스페이스 설정" prevUrl="/workspace" rightBtnInfo={completeBtnProps} />
      <MypageMenu menuList={menuList} />
    </MainLayout>
  );
};

export default WorkspaceHome;
