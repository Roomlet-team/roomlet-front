import React, { FC } from 'react';
import Link from 'next/link';
import stylex from '@stylexjs/stylex';
import ProfileImg from '@src/components/ui/ProfileImg';
import { Typography, colors } from '../../../../../public/styles/vars.stylex';
import ArrowHeadOutlinedV2 from '@src/components/icons/ArrowHeadOutlinedV2';

interface MypageSummaryProfileProps {
  data: {
    displayName: string;
    profileImgUrl: string | null;
    email: string;
  };
}

const MypageSummaryProfile: FC<MypageSummaryProfileProps> = (props) => {
  const { data } = props;

  return (
    <div {...stylex.props(Styles.Container)}>
      <Link href="/mypage/profile" {...stylex.props(Styles.ProfileLink)} passHref>
        <ProfileImg src={data?.profileImgUrl} size={60} />
        <div {...stylex.props(Styles.UserInfoContainer)}>
          <div>
            <p {...stylex.props(Styles.NameText, Typography.SubTextRegularBold)}>{data?.displayName}</p>
            <p {...stylex.props(Styles.emailText, Typography.SubTextLargeRegular)}>{data?.email}</p>
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
