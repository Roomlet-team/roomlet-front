import React, { FC, useState } from 'react';
import stylex from '@stylexjs/stylex';
import ArrowHeadOutlinedV2 from '@src/components/icons/ArrowHeadOutlinedV2';
import { TeamInfoItem } from '@src/queries/team/useGetTeamListQuery';
import { colors, Typography } from '../../../../../../../public/styles/vars.stylex';

interface TeamToggleProps {
  data: TeamInfoItem;
}

const TeamToggle: FC<TeamToggleProps> = (props) => {
  const { data } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickTeamName = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* 팀 이름 */}
      <button type="button" onClick={handleClickTeamName} {...stylex.props(Styles.TeamNameButton)}>
        <p {...stylex.props(Typography.TextSmallMedium)}>
          {data.teamName}({data.memberList.length})
        </p>
        <ArrowHeadOutlinedV2 width={24} height={24} rotate={isOpen ? 270 : 90} />
      </button>

      {/* 토글이 열렸을 떄 */}
      {isOpen && (
        <div {...stylex.props(Styles.MemberListWrapper)}>
          <ul {...stylex.props(Styles.MemberList)}>
            {data.memberList.map((item) => (
              <li {...stylex.props(Typography.SubtitleRegularSemiBold)}>{item.displayName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeamToggle;

const Styles = stylex.create({
  TeamNameButton: {
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
});
