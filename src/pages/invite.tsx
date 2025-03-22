import React from 'react';
import stylex from '@stylexjs/stylex';
import MainLayout from '@src/layouts/MainLayout';
import RoomletTextLogo from '@src/components/logos/text';
import { colors, Typography } from '../../public/styles/vars.stylex';
import Input from '@src/components/ui/Input';
import useInput from '@src/hooks/useInput';
import Button from '@src/components/ui/Button';
import useGetInviteInfoQuery, { getInviteInfoApi } from '@src/features/invite/queries/useGetInviteInfoQuery';
import usePostWorkspaceJoinQuery from '@src/features/invite/queries/usePostWorkspaceJoinQuery';
import { useRouter } from 'next/router';
import ProfileImg from '@src/components/ui/ProfileImg';
import EllipsisImg from '@public/img/ellipsis.svg';
import Link from 'next/link';
import SEOHead from '@src/components/ui/SEOHead';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

const Invite = () => {
  const [displayName, handleChangeDisplayName] = useInput('');
  const { data } = useGetInviteInfoQuery();
  const mutation = usePostWorkspaceJoinQuery();
  const router = useRouter();
  const memberCount = data?.inviteInfo?.workspace?.memberCount;
  const isMemberCountGreaterThanLimit = (limit: number) => memberCount > limit;
  const displayedMemberNames = data?.inviteInfo?.workspace?.memberList
    .slice(0, 2)
    .map((item) => item.displayName)
    .join(isMemberCountGreaterThanLimit(1) ? ', ' : '');

  const handleClickJoin = () => {
    mutation.mutate({
      WorkspaceId: data.inviteInfo.workspace.WorkspaceId,
      joinInfo: { displayName, InviteId: data.inviteInfo.InviteId },
    });
  };

  const handleClickDenyJoin = () => {
    router.push('/');
  };

  return (
    <MainLayout isScroll>
      <SEOHead
        title={`💌 ${data?.inviteInfo?.workspace?.workspaceName}에서 초대장이 도착했어요 | 룸렛`}
        description="룸렛에서 회의를 함께 준비해 보세요"
        url={{ pathname: '/invite', query: `InviteId=${data?.inviteInfo?.InviteId}` }}
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
                            src={item.profileImgUrl}
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
                        src={data?.inviteInfo?.workspace?.memberList?.slice(-1)[0]?.profileImgUrl}
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
                          src={item.profileImgUrl}
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
                  {isMemberCountGreaterThanLimit(3) ? ` 님 외 ${memberCount - 2}명` : ' 님'}이 이미 함께하고 있어요..
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="" {...stylex.props(Styles.formContainer)}>
          {/* 닉네임 */}
          <Input onChange={handleChangeDisplayName} value={displayName} placeholder="사용하실 닉네임을 입력해주세요." />

          {/* 참가하기 및 참가하지 않기 버튼 */}
          <Button type="button" onClick={handleClickJoin}>
            참가하기
          </Button>
          <button
            type="button"
            onClick={handleClickDenyJoin}
            {...stylex.props(Styles.dontParticipateButton, Typography.M3BodyLarge)}
          >
            참가하지 않기
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Invite;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
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
  formContainer: {
    width: '100%',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  dontParticipateButton: {
    width: '100%',
    justifySelf: 'center',
    padding: '14px 12px',
    background: 'none',
    color: colors.gray50,
  },
});
