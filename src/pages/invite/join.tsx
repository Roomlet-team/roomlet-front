import { Typography, colors } from '../../../public/styles/vars.stylex';
import RoomletTextLogo from '@src/components/logos/text';
import ProfileImg from '@src/components/ui/ProfileImg';
import EllipsisImg from '@public/img/ellipsis.svg';
import SEOHead from '@src/components/ui/SEOHead';
import useGetInviteInfoQuery from '@src/features/invite/queries/useGetInviteInfoQuery';
import MainLayout from '@src/layouts/MainLayout';
import stylex from '@stylexjs/stylex';
import Link from 'next/link';
import React from 'react';
import Checkbox from '@src/components/ui/Checkbox';

import Button from '@src/components/ui/Button';
import useInputCheckbox from '@src/hooks/useInputCheckbox';
import GoogleOutlined from '@src/components/icons/GoogleOutlined';
import useGetMyPageProfileQuery from '@src/features/mypage/profile/queries/useGetMyPageProfileQuery';
import { TERMS } from '@src/constant/terms';

const Join = () => {
  const { data } = useGetInviteInfoQuery();
  const [isServiceAgree, handleChangeServiceAgree] = useInputCheckbox(false);
  const [isPrivacyAgree, handleChangePrivacyAgree] = useInputCheckbox(false);
  const [isAgeAgree, handleChangeAgeAgree] = useInputCheckbox(false);
  const [isMarketingAgree, handleChangeMarketingAgree] = useInputCheckbox(false);
  const { data: profileData } = useGetMyPageProfileQuery();
  const memberCount = data?.inviteInfo?.workspace?.memberCount;
  const isMemberCountGreaterThanLimit = (limit: number) => memberCount > limit;
  const displayedMemberNames = data?.inviteInfo?.workspace?.memberList
    .slice(0, 2)
    .map((item) => item.displayName)
    .join(isMemberCountGreaterThanLimit(1) ? ', ' : '');

  return (
    <MainLayout isScroll>
      <SEOHead
        title={`${data?.inviteInfo?.workspace?.workspaceName}에 가입하기 | 룸렛`}
        description="룸렛에서 회의를 함께 준비해 보세요"
        url={{ pathname: '/invite/join', query: `InviteId=${data?.inviteInfo?.InviteId}` }}
      />

      <div {...stylex.props(Styles.Container)}>
        <div {...stylex.props(Styles.logoAndInfoWrapper)}>
          <div {...stylex.props(Styles.logoAndInfoContainer)}>
            {/* 룸렛 텍스트 로고 */}
            <div className="logo-wrapper" {...stylex.props(Styles.logoWrapper)}>
              <Link href="/">
                <RoomletTextLogo width={164} height={24} />
              </Link>
              <p {...stylex.props(Typography.SubtitleRegularBold)}>룸렛에서 회의를 함께 준비해 보세요</p>
            </div>

            {/* 초대 내용 */}
            <div {...stylex.props(Styles.inviteContentContainer)}>
              {/* 멤버 프로필 이미지 리스트 */}
              <div {...stylex.props(Styles.memberInfoContainer)}>
                {isMemberCountGreaterThanLimit(5) ? (
                  <div {...stylex.props(Styles.greaterThanFiveMemberContainer)}>
                    <div {...stylex.props(Styles.memberProfileImgGroupContainer)}>
                      {data?.inviteInfo?.workspace?.memberList.slice(0, 2).map((item) => (
                        <div {...stylex.props(Styles.memberGroupItemWrapper)}>
                          <ProfileImg
                            src={item.profileImgKey}
                            alt={`${item.displayName}의 프로필 사진`}
                            size={60}
                            borderProperties={{ radius: '1.6rem', color: colors.gray40, width: '1px' }}
                          />
                        </div>
                      ))}
                    </div>

                    <EllipsisImg />
                    <div {...stylex.props(Styles.memberGroupItemWrapper)}>
                      <ProfileImg
                        src={data?.inviteInfo?.workspace?.memberList?.slice(-1)[0]?.profileImgKey}
                        alt="프로필 사진"
                        size={60}
                        borderProperties={{ radius: '1.6rem', color: colors.gray40, width: '1px' }}
                      />
                    </div>
                  </div>
                ) : (
                  <div {...stylex.props(Styles.memberProfileImgGroupContainer)}>
                    {data?.inviteInfo?.workspace?.memberList.map((item) => (
                      <div {...stylex.props(Styles.memberGroupItemWrapper)}>
                        <ProfileImg
                          src={item.profileImgKey}
                          alt={`${item.displayName}의 프로필 사진`}
                          size={60}
                          borderProperties={{ radius: '1.6rem', color: colors.gray40, width: '1px' }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* 멤버 닉네임 */}
                <p {...stylex.props(Styles.nicknameContent, Typography.SubTextLargeRegular)}>
                  {displayedMemberNames}
                  {isMemberCountGreaterThanLimit(3) ? ` 님 외 ${memberCount - 2}명` : ' 님'}이 이미 함께하고 있어요.
                </p>
              </div>
            </div>
          </div>

          <div {...stylex.props(Styles.userInfoContainer)}>
            <div {...stylex.props(Styles.profileInfoContainer)}>
              <ProfileImg
                src={profileData?.profile.profileImgKey}
                size={34}
                borderProperties={{ radius: '2px', color: colors.gray40, width: '1px' }}
              />
              <div>
                <p {...stylex.props(Typography.SubtitleSmallBold)}>{profileData?.profile.displayName}</p>
                <p {...stylex.props(Typography.CaptionLargeRegular)}>{profileData?.profile.email}</p>
              </div>
            </div>

            <GoogleOutlined width={18} height={18} />
          </div>
        </div>

        {/* 약관 동의 및 시작하기 */}
        <div>
          <div {...stylex.props(Styles.agreementContainer)}>
            <p {...stylex.props(Typography.TextSmallMedium)}>계속 진행하면 다음에 동의하게 됩니다.</p>

            <div {...stylex.props(Styles.checkboxContainer)}>
              <Checkbox variant="circle" checked={isServiceAgree} onChange={handleChangeServiceAgree}>
                <p>
                  [필수]&nbsp;
                  <Link href={TERMS.SERVICE_AGREE} target="_blank" {...stylex.props(Styles.link)}>
                    고객 서비스 약관
                  </Link>
                  에 동의합니다.
                </p>
              </Checkbox>
              <Checkbox variant="circle" checked={isPrivacyAgree} onChange={handleChangePrivacyAgree}>
                <p>
                  [필수] 본인은{' '}
                  <Link href={TERMS.PRIVACY_AGREE} target="_blank" {...stylex.props(Styles.link)}>
                    개인정보의 수집 및 이용
                  </Link>
                  에 동의합니다.
                </p>
              </Checkbox>
            </div>
          </div>

          <div {...stylex.props(Styles.startButtonContainer)}>
            <p {...stylex.props(Styles.guideText, Typography.SubTextLargeRegular)}>
              업무에 사용하는 이메일 계정을 사용하는 것이 좋아요
            </p>
            <Button>시작하기</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Join;

const Styles = stylex.create({
  Container: {
    padding: '0 16px',
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  logoAndInfoWrapper: {
    width: '100%',
    paddingTop: '86px',
    margin: '0 auto',
  },
  logoAndInfoContainer: {
    width: '100%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '32px',
    marginBottom: '32px',
  },
  inviteContentContainer: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  workspaceNameContent: {
    color: colors.black500,
    textAlign: 'center',
    marginBottom: '32px',
  },
  memberInfoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '24px',
  },
  memberProfileImgGroupContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberGroupItemWrapper: {
    margin: '0 -10px',
  },
  greaterThanFiveMemberContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '41px',
  },
  nicknameContent: {
    marginBottom: '24px',
    textAlign: 'center',
    wordBreak: 'keep-all',
  },
  checkboxContainer: {
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  userInfoContainer: {
    width: '100%',
    marginBottom: '54px',
    padding: '8px 16px 8px 8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: `inset 0 0 0 1px ${colors.gray40}`,
    borderRadius: '8px',
  },
  profileInfoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  guideText: {
    marginBottom: '16px',
    textAlign: 'center',
  },
  startButtonContainer: {
    marginBottom: '40px',
  },
  agreementContainer: {
    marginBottom: '32px',
  },
  link: {
    color: colors.blue300,
    textDecoration: 'unset',
  },
});
