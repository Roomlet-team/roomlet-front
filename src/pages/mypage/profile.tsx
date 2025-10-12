import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '@src/components/ui/Header';
import GnbNavLayout from '@src/layouts/GnbNavLayout';
import stylex from '@stylexjs/stylex';
import { colors } from '../../../public/styles/vars.stylex';
import BoundaryArea from '@src/components/ui/BoundaryArea';
import ProfilePersonalDataList from '@src/features/profile/components/ProfilePersonalDataList';
import DataflowOutlined from '@src/components/icons/DataflowOutlined';
import MailOutlined from '@src/components/icons/MailOutlined';
import MyPageImgUpload from '@src/features/mypage/compontents/MyPageImgUpload';
import MyPageInput from '@src/features/mypage/compontents/MyPageInput';
import useInput from '@src/hooks/useInput';
import usePatchMypageInfoQuery from '@src/features/mypage/profile/queries/usePatchMypageInfoQuery';
import useGetMypageInfoQuery from '@src/features/mypage/queries/useGetMypageInfoQuery';
import { RootState } from '@src/store';
import useGetMyPageProfileQuery from '@src/features/mypage/profile/queries/useGetMyPageProfileQuery';
import usePatchMypageProfileQuery from '@src/features/mypage/profile/queries/usePatchMypageProfileQuery';

const MyPageProfile = () => {
  const { isWorkspace } = useSelector((state: RootState) => state.workspace);
  const { data } = useGetMypageInfoQuery();
  const { data: profileData } = useGetMyPageProfileQuery();
  const myPageInfoMutation = usePatchMypageInfoQuery();
  const myPageProfileMutation = usePatchMypageProfileQuery();
  const [displayName, handleChangeDisplayName] = useInput<string>(
    isWorkspace ? data?.myInfo?.displayName : profileData?.profile.displayName
  );
  const [imageFile, setImageFile] = useState<Blob>(null);

  const dataList = isWorkspace
    ? [
        { id: 1, name: data?.myInfo?.teamInfo?.teamName, icon: <DataflowOutlined width={24} height={24} /> },
        { id: 3, name: data?.myInfo?.email, icon: <MailOutlined width={24} height={24} /> },
      ]
    : [{ id: 3, name: profileData?.profile.email, icon: <MailOutlined width={24} height={24} /> }];

  // [ ] 이미지 저장용 hook 만들기
  const handleSelectImg = (file: Blob) => {
    setImageFile(file);
  };

  const myInfoCompleteBtnProps = {
    name: '완료',
    isActive: data?.myInfo?.displayName !== displayName || !!imageFile,
    onClick: () => {
      const formData = new FormData();

      formData.append('displayName', displayName);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      myPageInfoMutation.mutate(formData);
    },
  };
  const profileCompleteBtnProps = {
    name: '완료',
    isActive: profileData?.profile.displayName !== displayName || !!imageFile,
    onClick: () => {
      const formData = new FormData();

      formData.append('displayName', displayName);
      formData.append('image', imageFile);

      myPageProfileMutation.mutate(formData);
    },
  };

  return (
    <GnbNavLayout backgroundColor={colors.white500}>
      <Header title="프로필 수정" rightBtnInfo={isWorkspace ? myInfoCompleteBtnProps : profileCompleteBtnProps} />

      {/* 이미지 업로드 및 이름 입력 */}
      <div {...stylex.props(Styles.SettingContainer)}>
        <MyPageImgUpload
          onSelect={handleSelectImg}
          initialImgUrl={isWorkspace ? `${data?.myInfo?.profileImgKey}` : `${profileData?.profile.profileImgKey}`}
        />
        <MyPageInput label="닉네임" value={displayName} onChange={handleChangeDisplayName} />
      </div>

      {/* 경계선 */}
      <BoundaryArea />

      {/* 개인 정보 리스트 */}
      <ProfilePersonalDataList dataList={dataList} title="기타 설정" />
    </GnbNavLayout>
  );
};

export default MyPageProfile;

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
