import React from 'react';
import stylex from '@stylexjs/stylex';
import ProfileImg from '@src/components/ui/ProfileImg';
import { Typography, colors } from '../../../../../public/styles/vars.stylex';
import ArrowHeadOutlinedV2 from '@src/components/icons/ArrowHeadOutlinedV2';
import Link from 'next/link';
import useGetMypageInfoQuery from '../../queries/useGetMypageInfoQuery';

const MypageSummaryProfile = () => {
  const { data } = useGetMypageInfoQuery();

  return (
    <div {...stylex.props(Styles.Container)}>
      <Link href="/mypage/profile" {...stylex.props(Styles.ProfileLink)} passHref>
        <ProfileImg src={data?.myInfo.profileImgUrl} size={60} />
        <div {...stylex.props(Styles.UserInfoContainer)}>
          <div>
            <p {...stylex.props(Styles.NameText, Typography.SubTextRegularBold)}>{data?.myInfo.displayName}</p>
            <p {...stylex.props(Styles.emailText, Typography.SubTextLargeRegular)}>{data?.myInfo.email}</p>
          </div>
          <ArrowHeadOutlinedV2 width={24} height={24} color={colors.gray60} />
        </div>
      </Link>
    </div>
  );
};

export default MypageSummaryProfile;

const Styles = stylex.create({
  Container: {
    width: '100%',
    marginBottom: '30px',
    padding: '0 16px',
  },
  ProfileLink: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    textDecoration: 'none',
  },
  UserInfoContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  NameText: {
    color: colors.black400,
  },
  emailText: {
    color: colors.black200,
  },
});
