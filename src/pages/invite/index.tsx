import React from 'react';
import stylex from '@stylexjs/stylex';
import MainLayout from '@src/layouts/MainLayout';
import RoomletTextLogo from '@src/components/logos/text';
import { colors, Typography } from '../../../public/styles/vars.stylex';
import useGetInviteInfoQuery, { getInviteInfoApi } from '@src/features/invite/queries/useGetInviteInfoQuery';
import useGlobalRouter from '@src/hooks/useGlobalRouter';
import ProfileImg from '@src/components/ui/ProfileImg';
import EllipsisImg from '@public/img/ellipsis.svg';
import Link from 'next/link';
import SEOHead from '@src/components/ui/SEOHead';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import GoogleOutlined from '@src/components/icons/GoogleOutlined';

const Invite = () => {
  const { data } = useGetInviteInfoQuery();
  const router = useGlobalRouter();
  const memberCount = data?.inviteInfo?.workspace?.memberCount;
  const isMemberCountGreaterThanLimit = (limit: number) => memberCount > limit;
  const displayedMemberNames = data?.inviteInfo?.workspace?.memberList
    .slice(0, 2)
    .map((item) => item.displayName)
    .join(isMemberCountGreaterThanLimit(1) ? ', ' : '');
  const snsLoginList = [
    {
      id: 1,
      logo: <GoogleOutlined width={18} height={18} />,
      name: 'Google',
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/auth/google?prev_url=${process.env.NEXT_PUBLIC_FRONTEND_URL}/invite/join?InviteId=${data?.inviteInfo?.InviteId}`,
    },
  ];

  const handleClickSnsLogin = (url) => {
    router.push(url);
  };

  return (
    <>
      <SEOHead
        title={`💌 ${data?.inviteInfo?.workspace?.workspaceName}에서 초대장이 도착했어요 | 룸렛`}
        description="룸렛에서 회의를 함께 준비해 보세요"
        url={{ pathname: '/invite', query: `InviteId=${data?.inviteInfo?.InviteId}` }}
      />

      <MainLayout isScroll>
        <div {...stylex.props(Styles.Container)}>
          <div {...stylex.props(Styles.logoAndInfoWrapper)}>
            <div {...stylex.props(Styles.logoAndInfoContainer)}>
              {/* 룸렛 텍스트 로고 */}
              <div className="logo-wrapper" {...stylex.props(Styles.logoWrapper)}>
                <Link href="/home">
                  <RoomletTextLogo width={164} height={24} />
                </Link>
                <p {...stylex.props(Typography.SubtitleRegularBold)}>룸렛에서 회의를 함께 준비해 보세요</p>
              </div>

              {/* 초대 내용 */}
              <div {...stylex.props(Styles.inviteContentContainer)}>
                <p {...stylex.props(Typography.TextSmallRegular, Styles.workspaceNameContent)}>
                  {data?.inviteInfo?.workspace?.workspaceName}의 회의를 준비하고
                  <br /> 일정을 관리해보세요.
                </p>

                {/* 멤버 프로필 이미지 리스트 */}
                <div {...stylex.props(Styles.memberInfoContainer)}>
                  {isMemberCountGreaterThanLimit(5) ? (
                    <div {...stylex.props(Styles.greaterThanFiveMemberContainer)}>
                      <div {...stylex.props(Styles.memberProfileImgGroupContainer)}>
                        {data?.inviteInfo?.workspace?.memberList.slice(0, 2).map((item) => (
                          <div {...stylex.props(Styles.memberGroupItemWrapper)}>
                            <ProfileImg
                              imgKey={item.profileImgKey}
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
                          imgKey={data?.inviteInfo?.workspace?.memberList?.slice(-1)[0]?.profileImgKey}
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
                            imgKey={item.profileImgKey}
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
          </div>

          <div {...stylex.props(Styles.loginContainer)}>
            <div {...stylex.props(Styles.guideTextContainer)}>
              <p {...stylex.props(Styles.guideText, Typography.SubTextLargeRegular)}>
                업무에 사용하는 이메일 계정을 사용하는 것이 좋아요
              </p>
              <div {...stylex.props(Styles.chromeRecommendContainer)}>
                <p {...stylex.props(Styles.chromeRecommendText, Typography.SubTextLargeRegular)}>
                  원활한 서비스 이용을 위해 <br />
                  <span {...stylex.props(Styles.chromeBold)}>Chrome 브라우저</span> 사용을 권장해요
                </p>
              </div>
            </div>

            {/* SNS 로그인 버튼 */}
            {snsLoginList.map((item) => (
              <button
                type="button"
                key={item.id}
                {...stylex.props(SnsLoginStyles.button)}
                onClick={() => handleClickSnsLogin(item.url)}
              >
                <span>{item.logo}</span>
                <span {...stylex.props(SnsLoginStyles.buttonText)}>{item.name}&nbsp;계정으로 로그인</span>
              </button>
            ))}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Invite;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 60 * 1000,
      },
    },
  });
  const InviteId = context.query.InviteId as string;

  await queryClient.prefetchQuery({
    queryKey: ['inviteInfo', InviteId],
    queryFn: () => getInviteInfoApi(InviteId),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Styles = stylex.create({
  Container: {
    display: 'flex',
    height: '100%',
    padding: '16px',
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
    height: '100%',
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
    marginBottom: '56px',
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
    marginBottom: '75px',
    textAlign: 'center',
  },
  loginContainer: {
    width: '100%',
    paddingBottom: '40px',
    display: 'flex',
    flexDirection: 'column',
  },
  guideTextContainer: {
    textAlign: 'center',
  },
  guideText: {
    marginBottom: '8px',
    textAlign: 'center',
    color: colors.black500,
  },
  chromeRecommendContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  chromeIcon: {
    fontSize: '1.6rem',
  },
  chromeRecommendText: {
    color: colors.black500,
    textAlign: 'center',
  },
  chromeBold: {
    fontWeight: 700,
  },
});

const SnsLoginStyles = stylex.create({
  content: {
    width: '100%',
    padding: '0 16px',
    marginBottom: '24px',
  },
  button: {
    width: '100%',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #E6E6E6',
    borderRadius: '8px',
    fontSize: '1.4rem',
    background: 'var(--Base-White)',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '1.8rem' /* 128.571% */,
  },
  buttonText: {
    display: 'inline-block',
    width: '100%',
    textAlign: 'center',
  },
});
