import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@src/components/ui/Header';
import GnbNavLayout from '@src/layouts/GnbNavLayout';
import { colors } from '../.../../../../public/styles/vars.stylex';
// import MypageSummaryProfile from '@src/features/mypage/compontents/MypageSummaryProfile';
// import MypageMenu from '@src/features/mypage/compontents/MypageMenu';
// import MyPageInviteModal from '@src/features/mypage/compontents/MyPageInviteModal';
import SettingOutlined from '@src/components/icons/SettingOutlined';
import AddUserOutlined from '@src/components/icons/AddUserOutlined';
import BellOutlined from '@src/components/icons/BellOutlined';
import ExitOutlined from '@src/components/icons/ExitOutlined';
import BoundaryArea from '@src/components/ui/BoundaryArea';
import { confirm } from '@src/components/ui/Modal/confirm';
import useGetWorkspaceListQuery from '@src/queries/workspace/useGetWorkspaceListQuery';
import AddOutlined from '@src/components/icons/AddOutlined';
import EntranceOutlined from '@src/components/icons/EntranceOutlined';

const MyPageInviteModal = dynamic(() => import('@src/features/mypage/compontents/MyPageInviteModal'), {
  ssr: false,
});
const MypageSummaryProfile = dynamic(() => import('@src/features/mypage/compontents/MypageSummaryProfile'), {
  ssr: false,
});
const MypageMenu = dynamic(() => import('@src/features/mypage/compontents/MypageMenu'), {
  ssr: false,
});

const MyPageHome = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const { data } = useGetWorkspaceListQuery();
  const commonUrl = 'mypage';

  // 멤버 초대 모달을 열고 닫게하는 함수
  const handleClickInviteModal = () => {
    setIsInviteModalOpen(!isInviteModalOpen);
  };

  const menuList = data?.workspaceCount
    ? [
        // 워크 스페이스가 존재하는 경우
        {
          id: 1,
          name: '워크스페이스 설정',
          icon: <SettingOutlined width={24} height={24} />,
          href: `/${commonUrl}/workspace`,
        },
        {
          id: 2,
          name: '멤버초대',
          icon: <AddUserOutlined width={24} height={24} />,
          onClick: () => handleClickInviteModal(),
        },
        { id: 4, name: '알림 설정', icon: <BellOutlined width={24} height={24} />, href: `/${commonUrl}/alarm` },
        {
          id: 5,
          name: '워크스페이스 나가기',
          icon: <ExitOutlined width={24} height={24} />,
          onClick: () => {
            confirm({
              content:
                '워크스페이스를 나가도 작성된 회의 내용은 남아있어요. 다시 참여를 원하시면 초대 링크를 입력 후 참여 가능합니다.',
              okBtnName: '나갈래요',
              onOk: null,
              cancelBtnName: '유지할래요',
              onCancel: null,
            });
          },
        },
      ]
    : [
        // 워크 스페이스가 존재하지 않는 경우
        {
          id: 1,
          name: '워크스페이스 생성하기',
          icon: <AddOutlined width={24} height={24} />,
          href: `/create-workspace`,
        },
        {
          id: 2,
          name: '워크스페이스 입장하기',
          icon: <EntranceOutlined width={24} height={24} />,
          href: `/${commonUrl}/workspace`,
        },
      ];

  return (
    <>
      <GnbNavLayout backgroundColor={colors.white500}>
        <Header title="마이페이지" />
        {/* 프로필 페이지로 이동 */}
        <MypageSummaryProfile />

        {/* 경계선 */}
        <BoundaryArea />

        {/* 마이페이지 메뉴 */}
        <MypageMenu menuList={menuList} />
      </GnbNavLayout>

      {/* 멤버 초대 모달 열기 */}
      <MyPageInviteModal isOpen={isInviteModalOpen} onClose={handleClickInviteModal} />
    </>
  );
};

export default MyPageHome;
