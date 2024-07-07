import ArrowHeadOutlinedV2 from '@src/components/icons/ArrowHeadOutlinedV2';
import Header from '@src/components/ui/Header';
import ProfileImg from '@src/components/ui/ProfileImg';
import ReservationList from '@src/features/reservation/components/ReservationList';
import GnbNavLayout from '@src/layouts/GnbNavLayout';
import stylex from '@stylexjs/stylex';
import { Typography, colors } from '../../../public/styles/vars.stylex';
import React, { useState } from 'react';
import BoundaryArea from '@src/components/ui/BoundaryArea';
import MyPagePersonalDataList from '@src/features/mypage/compontents/MyPagePersonalDataList';
import DataflowOutlined from '@src/components/icons/DataflowOutlined';
import UserSquareOutlined from '@src/components/icons/UserSquareOutlined';
import MailOutlined from '@src/components/icons/MailOutlined';
import MyPageImgUpload from '@src/features/mypage/compontents/MyPageImgUpload';
import MyPageInput from '@src/features/mypage/compontents/MyPageInput';
import useInput from '@src/hooks/useInput';

const Reservations = () => {
  const [nickname, handleChangeNickname] = useInput<string>('');
  const [isEditComplete, setIsEditComplete] = useState<boolean>(false);

  const menuList = [
    { id: 1, name: '디자인팀', icon: <DataflowOutlined width={24} height={24} /> },
    { id: 2, name: '디자이너', icon: <UserSquareOutlined width={24} height={24} /> },
    { id: 3, name: 'dudu1104@naver.com', icon: <MailOutlined width={24} height={24} /> },
  ];

  const completeBtnProps = {
    name: '완료',
    isActive: isEditComplete,
    onClick: () => console.log(''),
  };

  return (
    <GnbNavLayout backgroundColor={colors.white500}>
      <Header title="프로필 수정" prevUrl="/mypage" rightBtnInfo={completeBtnProps} />

      {/* 이미지 업로드 및 이름 입력 */}
      <div {...stylex.props(Styles.SettingContainer)}>
        <MyPageImgUpload onSelect={null} />
        <MyPageInput label="닉네임" value={nickname} onChange={handleChangeNickname} />
      </div>

      {/* 경계선 */}
      <BoundaryArea />

      {/* 개인 정보 리스트 */}
      <MyPagePersonalDataList dataList={menuList} title="기타 설정" />
    </GnbNavLayout>
  );
};

export default Reservations;

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
