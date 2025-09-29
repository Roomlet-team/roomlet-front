import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import stylex from '@stylexjs/stylex';
import BottomSheet from '@src/components/ui/BottomSheet';
import { colors, Typography } from '../../../../../../../public/styles/vars.stylex';
import { hideModal } from '@src/slices/modal';
import { saveTeamList } from '../../slices/member';
import useGetTeamListQuery, { MemberInfoItem } from '@src/queries/team/useGetTeamListQuery';
import { RootState } from '@src/store';
import TriangleFilled from '@src/components/icons/TriangleFilled';
import useUpdateMemberQuery from '../../queries/useUpdateMemberQuery';
import { MEMBER_ROLE_KOREAN_LABELS } from '@src/constants/member';

let bottomSheetId = 'move-member-bottom-sheet';

interface MoveMemberBottomSheetProps {
  data: MemberInfoItem;
  teamId: number;
}

const MoveMemberBottomSheet: FC<MoveMemberBottomSheetProps> = (props) => {
  const { data, teamId } = props;
  const { data: teamListData } = useGetTeamListQuery();
  const dispatch = useDispatch();
  const teamOptionList = teamListData?.teamList; // 이미 참여한 팀은 option에 나타나지 않게 함.
  const [selectTeamId, setSelectTeamId] = useState<number>(teamId);
  const [selectRole, setSelectRole] = useState<string>(data.role);
  const { mutate: UpdateMemberMutate } = useUpdateMemberQuery();

  const roleOptionList = [
    { id: 1, role: 'member' },
    { id: 2, role: 'admin' },
    { id: 3, role: 'owner' },
  ];

  const handleClickSelectTeam = (e) => {
    const value = Number(e.target.value);

    setSelectTeamId(value);
  };

  const handleClickSelectRole = (e) => {
    const value = e.target.value;

    setSelectRole(value);
  };

  const handleClickRegister = () => {
    UpdateMemberMutate({ MemberId: data.MemberId, role: selectRole, TeamId: selectTeamId });

    dispatch(hideModal());
  };

  return (
    <BottomSheet id={bottomSheetId} onClick={() => dispatch(hideModal())}>
      <div {...stylex.props(Styles.Container)}>
        <p {...stylex.props(Typography.SubtitleRegularSemiBold, Styles.Title)}>멤버 수정</p>

        <div {...stylex.props(Styles.TeamSelectContainer)}>
          {/* 팀 이동을 위해 선택한 멤버 */}
          <div {...stylex.props(Styles.DisplayNameWrapper, Typography.SubTextLargeRegular)}>{data.displayName}</div>

          {/* 역할 선택 영역 */}
          <div {...stylex.props(Styles.SelectContainer)}>
            <div {...stylex.props(Styles.SelectIcon)}>
              <TriangleFilled width={24} height={24} />
            </div>
            <select
              name="role"
              onChange={handleClickSelectRole}
              defaultValue={data.role}
              {...stylex.props(Styles.Select, Typography.SubTextLargeRegular)}
            >
              {roleOptionList.map((item) => (
                <option key={item.id} value={item.role}>
                  {MEMBER_ROLE_KOREAN_LABELS[item.role]}
                </option>
              ))}
            </select>
          </div>

          {/* 팀 선택 영역 */}
          <div {...stylex.props(Styles.SelectContainer)}>
            <div {...stylex.props(Styles.SelectIcon)}>
              <TriangleFilled width={24} height={24} />
            </div>
            <select
              name="team"
              onChange={handleClickSelectTeam}
              defaultValue={teamId}
              {...stylex.props(Styles.Select, Typography.SubTextLargeRegular)}
            >
              {teamOptionList?.map((item) => <option value={item.TeamId}>{item.teamName}</option>)}
            </select>
          </div>
        </div>

        {/* 닫기 및 적용 버튼 */}
        <div {...stylex.props(Styles.ButtonContainer)}>
          <button
            type="button"
            onClick={() => dispatch(hideModal())}
            {...stylex.props(Styles.Button, Styles.CancelButton, Typography.TextSmallMedium)}
          >
            닫기
          </button>
          <button
            type="button"
            onClick={handleClickRegister}
            {...stylex.props(Styles.Button, Styles.RegisterButton, Typography.TextSmallMedium)}
          >
            완료
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default MoveMemberBottomSheet;

const Styles = stylex.create({
  Container: {
    padding: '24px 16px',
  },
  Title: {
    marginBottom: '24px',
    textAlign: 'center',
  },
  TeamSelectContainer: {
    width: '100%',
    marginBottom: '24px',
    display: 'flex',
    gap: '8px',
    flexDirection: 'column',
  },
  ButtonContainer: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'space-between',
  },
  Button: {
    padding: '16px',
    borderRadius: '20px',
    flex: 1,
  },
  CancelButton: {
    background: colors.gray20,
    color: colors.gray60,
  },
  RegisterButton: {
    background: colors.red500,
    color: colors.white500,
  },
  Select: {
    width: '100%',
    padding: '12px 12px',
    // flex: 1,
    boxShadow: `inset 0 0 0 1px ${colors.gray40}`,
    borderRadius: '12px',
    border: 'none',
    color: colors.gray60,
    '-webkit-appearance': 'none' /* for chrome */,
    '-moz-appearance': 'none' /*for firefox*/,
    appearance: 'none',
  },
  DisplayNameWrapper: {
    flex: 1,
    padding: ' 12px',
    color: colors.gray60,
    borderRadius: '12px',
    border: 'none',
    boxShadow: `inset 0 0 0 1px ${colors.gray40}`,
  },
  SelectContainer: {
    width: '100%',
    position: 'relative',
    flex: 1,
  },
  SelectIcon: {
    position: 'absolute',
    top: '10px',
    right: '12px',
  },
});
