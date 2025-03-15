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
import useGetWorkspaceMainInfoQuery from '@src/features/home/queries/useGetWorkspaceMainInfoQuery';
import useGetMypageInfoQuery from '@src/features/mypage/queries/useGetMypageInfoQuery';
import ProfileImg from '@src/components/ui/ProfileImg';
import { Typography } from '../../../../public/styles/vars.stylex';

const WorkspaceHome = () => {
  const { data: myInfoData } = useGetMypageInfoQuery();
  const { data } = useGetWorkspaceMainInfoQuery();
  const [workspaceName, handleChangeWorkspaceName] = useInput<string>(data?.workspace.workspaceName);
  const isAdmin = myInfoData?.myInfo.isAdmin;
  const commonUrl = 'mypage/workspace';
  const menuList = [
    {
      id: 1,
      name: '멤버 정보',
      icon: <UserGroupOutlined width={24} height={24} />,
      href: `/${commonUrl}/member`,
    },
    { id: 2, name: '회의실 정보', icon: <BoxOutlined width={24} height={24} />, href: `/${commonUrl}/congress-room` },
    {
      id: 3,
      name: '카테고리 정보',
      icon: <CategoryGroupOutlined width={24} height={24} />,
      href: `/${commonUrl}/category`,
    },
  ];

  return (
    <MainLayout>
      <Header
        title="워크스페이스 정보"
        prevUrl="/mypage"
        {...(isAdmin
          ? {
              rightBtnInfo: {
                name: '완료',
                isActive: data?.workspace?.workspaceName !== workspaceName,
                onClick: () => {},
              },
            }
          : {})}
      />

      {/* 이미지 업로드 및 이름 입력 */}
      {isAdmin ? (
        <div {...stylex.props(Styles.ProfileContainer)}>
          <MyPageImgUpload onSelect={null} initialImgUrl={null} />
          <MyPageInput label="워크스페이스 이름" value={workspaceName} onChange={handleChangeWorkspaceName} />
        </div>
      ) : (
        <div {...stylex.props(Styles.ProfileContainer)}>
          <ProfileImg src={null} size={68} />
          <p {...stylex.props(Typography.TitleRegularBold)}>{data.workspace.workspaceName}</p>
        </div>
      )}

      {/* 경계선 */}
      <BoundaryArea />

      {/* 메뉴 리스트 */}
      <MypageMenu menuList={menuList} title="기타 설정" />
    </MainLayout>
  );
};

export default WorkspaceHome;

const Styles = stylex.create({
  ProfileContainer: {
    width: '100%',
    padding: '24px 16px',
    display: 'flex',
    gap: '16px',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
