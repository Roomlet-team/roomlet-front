import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import stylex from '@stylexjs/stylex';
import BottomSheet from '@src/components/ui/BottomSheet';
import { colors, Typography } from '../../../../../../../public/styles/vars.stylex';
import { hideModal } from '@src/slices/modal';
import { saveTeamList } from '../../slices/member';
import { MemberInfoItem } from '@src/queries/team/useGetTeamListQuery';
import { RootState } from '@src/store';
import TriangleFilled from '@src/components/icons/TriangleFilled';

let bottomSheetId = 'move-member-bottom-sheet';

interface MoveMemberBottomSheetProps {
  data: MemberInfoItem;
  selectMemberTeamIdx: number;
}

const MoveMemberBottomSheet: FC<MoveMemberBottomSheetProps> = (props) => {
  const { data, selectMemberTeamIdx } = props;
  const dispatch = useDispatch();
  const { editTeamList } = useSelector((state: RootState) => state.member);
  const [selectTeamIdx, setSelectTeamIdx] = useState<number>(0);

  const handleClickSelectTeam = (e) => {
    const value = Number(e.target.value);

    setSelectTeamIdx(value);
  };

  const handleClickRegister = () => {
    const moveMemberTeamList = editTeamList.map((item, idx) => {
      // 원래 있던 팀에서 삭제
      if (idx === selectMemberTeamIdx) {
        const tempDeleteMemberList = item.memberList.filter((memberItem) => memberItem.MemberId !== data.MemberId);

        return { ...item, memberList: tempDeleteMemberList };
      }

      // 새로운 팀에서 멤버 추가
      if (idx === selectTeamIdx) {
        return { ...item, memberList: [...item.memberList, data] };
      }

      return item;
    });

    dispatch(saveTeamList(moveMemberTeamList));
    dispatch(hideModal());
  };

  return (
    <BottomSheet id={bottomSheetId} onClick={() => dispatch(hideModal())}>
      <div {...stylex.props(Styles.Container)}>
        <p {...stylex.props(Typography.SubtitleRegularSemiBold, Styles.Title)}>멤버 수정</p>

        {/* 팀 선택 영역 */}
        <div {...stylex.props(Styles.TeamSelectContainer)}>
          <div {...stylex.props(Styles.SelectContainer)}>
            <div {...stylex.props(Styles.SelectIcon)}>
              <TriangleFilled width={24} height={24} />
            </div>
            <select
              name="team"
              onChange={handleClickSelectTeam}
              {...stylex.props(Styles.Select, Typography.SubTextLargeRegular)}
            >
              {editTeamList.map((item, index) =>
                index !== selectMemberTeamIdx ? <option value={index}>{item.teamName}</option> : null
              )}
            </select>
          </div>

          {/* 팀 이동을 위해 선택한 멤버 */}
          <div {...stylex.props(Styles.DisplayNameWrapper, Typography.SubTextLargeRegular)}>{data.displayName}</div>
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
            등록
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
    '::-ms-expand': {
      display: 'none' /*for IE10,11*/,
    },
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
