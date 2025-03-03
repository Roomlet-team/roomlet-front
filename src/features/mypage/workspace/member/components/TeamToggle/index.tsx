import React, { FC, useCallback, useState } from 'react';
import stylex from '@stylexjs/stylex';
import ArrowHeadOutlinedV2 from '@src/components/icons/ArrowHeadOutlinedV2';
import { MemberInfoItem } from '@src/queries/team/useGetTeamListQuery';
import { colors, Typography } from '../../../../../../../public/styles/vars.stylex';
import CircleCloseFilled from '@src/components/icons/CircleCloseFilled';
import { useDispatch, useSelector } from 'react-redux';
import { saveTeamList, tempRemoveTeam } from '../../slices/member';
import { RootState } from '@src/store';
import useRenderModal from '@src/hooks/ui/useRenderModal';
import MoveMemberBottomSheet from '../MoveMemberBottomSheet';
import { EditTeamItem } from '../../types/member';
import { confirm } from '@src/components/ui/Modal/confirm';
import ProfileImg from '@src/components/ui/ProfileImg';
import Link from 'next/link';

interface TeamToggleProps {
  data: EditTeamItem;
  isEdit?: boolean;
  teamIdx: number;
  isLastIdx: boolean;
}

const TeamToggle: FC<TeamToggleProps> = (props) => {
  const { data, isEdit, teamIdx, isLastIdx } = props;
  const dispatch = useDispatch();
  const { renderModal } = useRenderModal();
  const { editTeamList } = useSelector((state: RootState) => state.member);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleClickToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeData = useCallback(
    (key: 'teamName') => (e) => {
      const value = e.target.value;
      const mappingTeamList = editTeamList.map((item) =>
        item.TeamId === data.TeamId ? { ...item, [key]: value } : item
      );
      const index = editTeamList.findIndex((item) => item.TeamId === data.TeamId);

      if (index === -1) {
        return null;
      }

      const updateTeamList = [...editTeamList];
      updateTeamList[index] = { ...updateTeamList[index], [key]: value };

      dispatch(saveTeamList(mappingTeamList));
    },
    [editTeamList, data.TeamId, dispatch]
  );
  const handleClickTempDelete = () => {
    confirm({
      content: '팀 삭제를 하면 기존 팀원들은 미분류로 이동돼요.\n수정 완료 전까지 팀 변경 가능해요.',
      cancelBtnName: '유지할래요',
      okBtnName: '삭제할래요',
      onOk: () => dispatch(tempRemoveTeam(data.tempTeamId ? { ...data, tempTeamId: data.tempTeamId } : { ...data })),
    });
  };

  const handleClickMoveMember = (item: MemberInfoItem, idx: number) => {
    renderModal(MoveMemberBottomSheet, { data: item, selectMemberTeamIdx: teamIdx });
  };

  return (
    <div {...stylex.props(isLastIdx && Styles.LastIdxContainer)}>
      {/* 팀 이름 */}
      {isEdit ? (
        <div {...stylex.props(Styles.EditToggleContainer)}>
          <input
            type="text"
            value={data.teamName}
            onChange={handleChangeData('teamName')}
            {...stylex.props(Styles.TextInput, Typography.TextSmallMedium)}
          />
          <button type="button" onClick={handleClickToggle} {...stylex.props(Styles.MiniToggleButton)}>
            <ArrowHeadOutlinedV2 width={24} height={24} rotate={isOpen ? 270 : 90} />
          </button>
          <button type="button" onClick={handleClickTempDelete}>
            <CircleCloseFilled width={24} height={24} />
          </button>
        </div>
      ) : (
        <button type="button" onClick={handleClickToggle} {...stylex.props(Styles.ToggleButton)}>
          <p {...stylex.props(Typography.TextSmallMedium)}>
            {data.teamName}({data.memberList.length})
          </p>
          <ArrowHeadOutlinedV2 width={24} height={24} rotate={isOpen ? 270 : 90} />
        </button>
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
                      <ProfileImg src={item.profileImgUrl} size={42} borderProperties={{ radius: '12px' }} />
                      <span>{item.displayName}</span>
                    </Link>
                    {isEdit && (
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
  LastIdxContainer: {
    paddingBottom: '104px',
  },
  ToggleButton: {
    width: '100%',
    padding: '16px',
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
});
