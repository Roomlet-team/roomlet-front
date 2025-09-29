import React, { FC, useState } from 'react';
import stylex from '@stylexjs/stylex';
import ArrowHeadOutlinedV2 from '@src/components/icons/ArrowHeadOutlinedV2';
import { MemberInfoItem, TeamInfoItem } from '@src/queries/team/useGetTeamListQuery';
import { colors, Typography } from '../../../../../../../public/styles/vars.stylex';
import CircleCloseFilled from '@src/components/icons/CircleCloseFilled';
import useRenderModal from '@src/hooks/ui/useRenderModal';
import MoveMemberBottomSheet from '../MoveMemberBottomSheet';
import { confirm } from '@src/components/ui/Modal/confirm';
import ProfileImg from '@src/components/ui/ProfileImg';
import Link from 'next/link';
import useGetMypageInfoQuery from '@src/features/mypage/queries/useGetMypageInfoQuery';
import Dropdown from '@src/components/ui/Dropdown';
import PencilOutlined from '@src/components/icons/PencilOutlined';
import TrashcanOutlined from '@src/components/icons/TrashcanOutlined';
import useDeleteTeamQuery from '../../queries/useDeleteTeamQuery';
import useUpdateTeamNameQuery from '../../queries/useUpdateTeamNameQuery';
import useInput from '@src/hooks/useInput';

interface TeamToggleProps {
  data: TeamInfoItem;
  teamIdx: number;
}

const TeamToggle: FC<TeamToggleProps> = (props) => {
  const { data } = props;
  const { data: myInfoData } = useGetMypageInfoQuery();
  const { renderModal } = useRenderModal();
  const [isTeamNameEdit, setIsTeamNameEdit] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [teamName, handleChangeTeamName] = useInput(data.teamName);
  const { mutate: DeleteTeamMutate } = useDeleteTeamQuery();
  const { mutate: UpdateTeamNameMutate } = useUpdateTeamNameQuery();
  const isEditable = ['owner'].includes(myInfoData?.myInfo.role);

  const getMenuList = () => {
    return [
      {
        id: '1',
        label: '변경하기',
        icon: <PencilOutlined width={16} height={16} />,
        onClick: () => {
          setIsTeamNameEdit(true);
        },
      },
      {
        id: '2',
        label: '삭제하기',
        icon: <TrashcanOutlined width={16} height={16} />,
        onClick: () => {
          confirm({
            content: '팀 삭제 후 취소할 수 없어요.\n기존 팀원들은 다른 팀으로 배치해주세요',
            cancelBtnName: '유지할래요',
            okBtnName: '삭제할래요',
            onOk: () => DeleteTeamMutate({ TeamId: data.TeamId }),
          });
        },
      },
    ];
  };

  const handleClickTeamNameEditComplete = () => {
    UpdateTeamNameMutate({ TeamId: data.TeamId, teamName: teamName });
    setIsTeamNameEdit(false);
  };

  const handleClickTeamNameEditCancel = () => {
    setIsTeamNameEdit(false);
  };

  const handleClickToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickMoveMember = (item: MemberInfoItem, idx: number) => {
    renderModal(MoveMemberBottomSheet, { data: item, teamId: data.TeamId });
  };

  return (
    <div>
      {/* 팀 이름 */}
      {isTeamNameEdit ? (
        <div {...stylex.props(Styles.EditToggleContainer)}>
          <input
            type="text"
            value={teamName}
            onChange={handleChangeTeamName}
            {...stylex.props(Styles.TextInput, Typography.TextSmallMedium)}
          />
          <button type="button" onClick={handleClickTeamNameEditComplete} {...stylex.props(Styles.MiniToggleButton)}>
            <span {...stylex.props(Typography.TextSmallMedium, Styles.TeamNameEditCompleteText)}>완료</span>
          </button>
          <button type="button" onClick={handleClickTeamNameEditCancel}>
            <CircleCloseFilled width={24} height={24} />
          </button>
        </div>
      ) : (
        <div {...stylex.props(Styles.ActionButtonContainer)}>
          <button type="button" onClick={handleClickToggle} {...stylex.props(Styles.ToggleButton)}>
            <p {...stylex.props(Typography.TextSmallMedium)}>
              {data.teamName}({data.memberList.length})
            </p>
            <ArrowHeadOutlinedV2 width={24} height={24} rotate={isOpen ? 270 : 90} color="#000000" />
          </button>

          {isEditable && <Dropdown menuList={getMenuList()} ellipsisIconStyle={{ color: '#000000' }} />}
        </div>
      )}

      {/* 토글이 열렸을 떄 */}
      {isOpen && (
        <div {...stylex.props(Styles.MemberListWrapper)}>
          <ul {...stylex.props(Styles.MemberList(data.memberList.length === 0))}>
            {data.memberList.length > 0 ? (
              data.memberList.map((item, idx) => (
                <li {...stylex.props(Typography.SubtitleRegularSemiBold)}>
                  <div {...stylex.props(Styles.MemberItemContainer)}>
                    <Link {...stylex.props(Styles.MemberInfoLink)} href={`/profile/${item.MemberId}`}>
                      <ProfileImg
                        imgKey={item.profileImgKey}
                        size={42}
                        borderProperties={{ radius: '12px' }}
                        role={item.role}
                      />
                      <span>{item.displayName}</span>
                    </Link>
                    {isEditable && (
                      <button
                        type="button"
                        onClick={() => handleClickMoveMember(item, idx)}
                        {...stylex.props(Styles.MoveButton, Typography.SubTextRegularSemiBold)}
                      >
                        이동
                      </button>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li {...stylex.props(Typography.SubTextLargeRegular)}>멤버 없음</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeamToggle;

const Styles = stylex.create({
  ToggleButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  MemberListWrapper: {
    margin: '8px 16px',
    padding: '12px 16px',
    background: colors.gray20,
    borderRadius: '12px',
  },
  MemberList: (isListStyle) => ({
    padding: isListStyle ? '0 12px' : 0,
    width: '100%',
    display: 'flex',
    gap: '8px',
    flexDirection: 'column',
    listStyle: isListStyle ? 'disc' : 'none',
  }),
  TextInput: {
    width: '100%',
    marginRight: '8px',
    padding: '4px 8px',
    background: colors.gray20,
    border: 'none',
    borderRadius: '4px',
  },
  EditToggleContainer: {
    padding: '16px',
    display: 'flex',
  },
  MiniToggleButton: {
    display: 'flex',
    marginRight: '12px',
  },
  MoveButton: {
    padding: '4px 12px',
    background: colors.black400,
    color: colors.white500,
    borderRadius: '13px',
  },
  MemberItemContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 0',
  },
  MemberInfoLink: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    textDecoration: 'none',
    color: colors.black300,
  },
  ActionButtonContainer: {
    padding: '16px',
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    alignContent: 'center',
    lineHeight: 1,
  },
  TeamNameEditCompleteText: {
    lineHeight: 1,
    flexShrink: 0,
    alignSelf: 'center',
  },
});
