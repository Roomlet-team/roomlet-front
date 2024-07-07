import React, { useState } from 'react';
import stylex from '@stylexjs/stylex';
import BoxOutlined from '@src/components/icons/BoxOutlined';
import CategoryGroupOutlined from '@src/components/icons/CategoryGroupOutlined';
import UserGroupOutlined from '@src/components/icons/UserGroupOutlined';
import Header from '@src/components/ui/Header';
import MypageMenu from '@src/features/mypage/compontents/MypageMenu';
import MainLayout from '@src/layouts/MainLayout';
import MyPageImgUpload from '@src/features/mypage/compontents/MyPageImgUpload';
import MyPageInput from '@src/features/mypage/compontents/MyPageInput';
import BoundaryArea from '@src/components/ui/BoundaryArea';
import useInput from '@src/hooks/useInput';

const WorkspaceHome = () => {
  const [isEditComplete, setIsEditComplete] = useState<boolean>(false);
  const [workspaceName, handleChangeWorkspaceName] = useInput<string>('');
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

      {/* 이미지 업로드 및 이름 입력 */}
      <div {...stylex.props(Styles.SettingContainer)}>
        <MyPageImgUpload onSelect={null} />
        <MyPageInput label="워크스페이스 이름" value={workspaceName} onChange={handleChangeWorkspaceName} />
      </div>

      {/* 경계선 */}
      <BoundaryArea />

      {/* 메뉴 리스트 */}
      <MypageMenu menuList={menuList} title="기타 설정" />
    </MainLayout>
  );
};

export default WorkspaceHome;

const Styles = stylex.create({
  SettingContainer: {
    width: '100%',
    padding: '0 16px 24px',
    display: 'flex',
    gap: '24px',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
