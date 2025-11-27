import React from 'react';
import stylex from '@stylexjs/stylex';
import { useRouter } from 'next/router';
import DataflowOutlined from '@src/components/icons/DataflowOutlined';
import MailOutlined from '@src/components/icons/MailOutlined';
import BoundaryArea from '@src/components/ui/BoundaryArea';
import Header from '@src/components/ui/Header';
import ProfileImg from '@src/components/ui/ProfileImg';
import ProfilePersonalDataList from '@src/features/profile/components/ProfilePersonalDataList';
import useGetWorkspaceMemberQuery from '@src/features/profile/queries/useGetWorkspaceMemberQuery';
import MainLayout from '@src/layouts/MainLayout';
import { Typography } from '../../../public/styles/vars.stylex';
import { MEMBER_ROLE_KOREAN_LABELS } from '@src/constants/member';
import SEOHead from '@src/components/ui/SEOHead';

const UserProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetWorkspaceMemberQuery(Number(id));

  const dataList = [
    { id: 1, name: data?.member?.teamInfo?.teamName, icon: <DataflowOutlined width={24} height={24} /> },
    { id: 3, name: data?.member?.email, icon: <MailOutlined width={24} height={24} /> },
  ];

  return (
    <>
      <SEOHead
        title={`${data?.member?.displayName}의 프로필 | 룸렛`}
        description={`${data?.member?.displayName}의 프로필 페이지입니다.`}
        url={{ pathname: `/profile/${id}` }}
      />

      <MainLayout>
        <Header />

        {/* 프로필 이미지 */}
        <div {...stylex.props(Styles.ProfileContainer)}>
          <ProfileImg size={68} imgKey={data?.member?.profileImgKey} role={data?.member?.role} />

          <div {...stylex.props(Styles.nameContainer)}>
            <p {...stylex.props(Typography.TitleRegularBold)}>{data?.member?.displayName}</p>
            <p {...stylex.props(Typography.SubTextLargeRegular)}>{MEMBER_ROLE_KOREAN_LABELS[data?.member?.role]}</p>
          </div>
        </div>

        {/* 경계선 */}
        <BoundaryArea />

        {/* 개인 정보 */}
        <ProfilePersonalDataList
          isPublicProfile
          title="개인 정보"
          dataList={dataList}
          memberId={data?.member?.MemberId}
          isMyProfile={data?.member.ourself}
        />
      </MainLayout>
    </>
  );
};

export default UserProfile;

const Styles = stylex.create({
  ProfileContainer: {
    padding: '24px 0',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
});
