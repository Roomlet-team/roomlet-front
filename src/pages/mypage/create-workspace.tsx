import React from 'react';
import { useRouter } from 'next/router';
import stylex from '@stylexjs/stylex';
import MainLayout from '@src/layouts/MainLayout';
import RoomletTextLogo from '@src/components/logos/text';
import { colors, Typography } from '../../../public/styles/vars.stylex';
import Input from '@src/components/ui/Input';
import useInput from '@src/hooks/useInput';
import Button from '@src/components/ui/Button';
import usePostWorkspaceQuery from '@src/features/workspace/queries/usePostWorkspaceQuery copy';

const CreateWorkspace = () => {
  const [workspaceName, handleChangeWorkspaceName] = useInput('');
  const mutation = usePostWorkspaceQuery();
  const router = useRouter();
  const letterImgUrl = 'https://roomlet.s3.ap-northeast-2.amazonaws.com/public/images/mypage/create-workspace.png';

  const handleClickCreate = () => {
    mutation.mutate({
      workspaceName,
    });
  };

  const handleClickDenyCreate = () => {
    router.push('/home');
  };

  return (
    <MainLayout isScroll>
      <div {...stylex.props(Styles.Container)}>
        <div {...stylex.props(Styles.logoAndInfoWrapper)}>
          <div {...stylex.props(Styles.logoAndInfoContainer)}>
            {/* 룸렛 텍스트 로고 */}
            <div className="logo-wrapper" {...stylex.props(Styles.logoWrapper)}>
              <RoomletTextLogo width={164} height={24} />
            </div>

            {/* 초대 내용 */}
            <div {...stylex.props(Typography.M3BodyLarge)}>
              <img src={letterImgUrl} alt="메세지 이미지" {...stylex.props(Styles.letterImg)} />
              <div {...stylex.props(Styles.contentWrapper, Typography.M3BodyLarge)}>
                룸렛에서 워크스페이스를 만들어 <br />
                함께 회의를 준비해보세요.
              </div>
            </div>
          </div>
        </div>

        <div className="" {...stylex.props(Styles.formContainer)}>
          {/* 닉네임 */}
          <Input
            onChange={handleChangeWorkspaceName}
            value={workspaceName}
            placeholder="사용하실 워크스페이스 명을 입력 해 주세요."
          />

          {/* 생성하기 및 생성하지 않기 버튼 */}
          <Button type="button" onClick={handleClickCreate}>
            생성하기
          </Button>
          <button
            type="button"
            onClick={handleClickDenyCreate}
            {...stylex.props(Styles.dontParticipateButton, Typography.M3BodyLarge)}
          >
            생성하지 않기
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateWorkspace;

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
    marginBottom: '56px',
  },
  letterImg: {
    margin: '0 auto',
    marginBottom: '52px',
    width: '220px',
    height: '189px',
  },
  contentWrapper: {
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
