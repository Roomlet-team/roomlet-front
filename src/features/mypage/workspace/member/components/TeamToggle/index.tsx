import React, { FC, useCallback, useState } from 'react';
import stylex from '@stylexjs/stylex';
import ArrowHeadOutlinedV2 from '@src/components/icons/ArrowHeadOutlinedV2';
import { MemberInfoItem, TeamInfoItem } from '@src/queries/team/useGetTeamListQuery';
import { colors, Typography } from '../../../../../../../public/styles/vars.stylex';
import CircleCloseFilled from '@src/components/icons/CircleCloseFilled';
import { useDispatch, useSelector } from 'react-redux';
import { saveTeamList } from '../../slices/member';
import { RootState } from '@src/store';
import useRenderModal from '@src/hooks/ui/useRenderModal';
import MoveMemberBottomSheet from '../MoveMemberBottomSheet';

interface TeamToggleProps {
  data: TeamInfoItem;
  isEdit?: boolean;
  teamIdx: number;
}

const TeamToggle: FC<TeamToggleProps> = (props) => {
  const { data, isEdit, teamIdx } = props;
  const dispatch = useDispatch();
  const { renderModal } = useRenderModal();
  const { editTeamList } = useSelector((state: RootState) => state.member);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
  const handleClickTempDelete = () => {};

  const handleClickMoveMember = (item: MemberInfoItem, idx: number) => {
    renderModal(MoveMemberBottomSheet, { data: item, selectMemberTeamIdx: teamIdx });
  };

  return (
    <div>
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
          <ul {...stylex.props(Styles.MemberList)}>
            {data.memberList.map((item, idx) => (
              <li {...stylex.props(Typography.SubtitleRegularSemiBold)}>
                <div {...stylex.props(Styles.MemberItemContainer)}>
                  <span>{item.displayName}</span>
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
            ))}
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
  MemberList: {
    padding: '12px 16px',
    width: '100%',
    display: 'flex',
    gap: '8px',
    flexDirection: 'column',
    listStyle: 'disc',
  },
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
  },
});
