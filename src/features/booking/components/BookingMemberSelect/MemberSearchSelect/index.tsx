import React, { useState } from 'react';
import stylex from '@stylexjs/stylex';
import { colors, Shadows, Typography } from '../../../../../../public/styles/vars.stylex';
import useGetTeamListQuery, { MemberInfoItem } from '@src/queries/team/useGetTeamListQuery';
import useInput from '@src/hooks/useInput';
import ProfileImg from '@src/components/ui/ProfileImg';
import useDebounce from '@src/hooks/useDebounce';
import Checkbox from '@src/components/ui/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { saveSelectBookingMemberObj } from '@src/features/booking/slices/booking';
import { RootState } from '@src/store';
import SearchOutlined from '@src/components/icons/SearchOutlined';

const MemberSearchSelect = () => {
  const { selectBookingMemberObj } = useSelector((state: RootState) => state.booking);
  const dispatch = useDispatch();
  const [keyword, handleChangeKeyword] = useInput('');
  const debounceKeyword = useDebounce(keyword);
  const { data } = useGetTeamListQuery(debounceKeyword);
  const [selectedMemberObj, setSelectedMemberObj] = useState<{ [teamName in string]: MemberInfoItem[] }>(
    selectBookingMemberObj || {}
  );

  const handleChangeSelectMemberList = (e, teamName: string, memberItem: MemberInfoItem) => {
    e.stopPropagation();
    const isChecked = e.target.checked;
    const newSelectedMemberObj = {
      ...selectedMemberObj,
      [teamName]: isChecked
        ? [...(selectedMemberObj[teamName] || []), memberItem]
        : selectedMemberObj[teamName]?.filter((item) => item.MemberId !== memberItem.MemberId),
    };

    if (newSelectedMemberObj[teamName].length === 0) {
      delete newSelectedMemberObj[teamName];
    }

    setSelectedMemberObj(newSelectedMemberObj);
    dispatch(saveSelectBookingMemberObj(newSelectedMemberObj));
  };

  return (
    <div {...stylex.props(Styles.Container)}>
      <div {...stylex.props(Styles.InputContainer)}>
        <SearchOutlined width={18} height={18} />
        <input
          placeholder="부서 검색"
          onChange={handleChangeKeyword}
          value={keyword}
          {...stylex.props(Styles.SearchInput, Typography.CaptionLargeRegular)}
        />
      </div>

      {/* 각 팀별 멤버 목록 */}
      <div {...stylex.props(Styles.TeamListContainer)}>
        {/* 선택된 팀별 멤버 목록 */}
        {Object.keys(selectedMemberObj).map((teamName, idx) => (
          <div
            {...stylex.props(
              Styles.TeamContainer,
              Object.keys(selectedMemberObj).length - 1 === idx && Styles.isLastSelectedTeam
            )}
          >
            {/* 팀 이름 */}
            <p {...stylex.props(Typography.TagLargeMedium, Styles.TeamName)}>{teamName}</p>

            {/* 멤버 목록 */}
            <ul {...stylex.props(Styles.MemberList)}>
              {selectedMemberObj[teamName].map((memberItem) => (
                <li>
                  <Checkbox
                    name={memberItem.displayName}
                    id={`${memberItem.MemberId}`}
                    value={memberItem.MemberId}
                    onChange={(e) => handleChangeSelectMemberList(e, teamName, memberItem)}
                    checked={
                      Object.keys(selectedMemberObj).length > 0 && selectedMemberObj[teamName]
                        ? selectedMemberObj[teamName]?.filter((item) => item.MemberId === memberItem.MemberId).length >=
                          0
                        : false
                    }
                  >
                    <div {...stylex.props(Styles.MemberInfoContainer)}>
                      <ProfileImg size={20} src={memberItem.profileImgKey} />
                      <span {...stylex.props(Typography.TagLargeMedium)}>{memberItem.displayName}</span>
                    </div>
                  </Checkbox>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/*아직 선택되지 않은 각 팀별 멤버 목록 */}
        {data?.teamList.map((teamItem) => (
          // 팀 멤버 리스트
          <div {...stylex.props(Styles.TeamContainer)}>
            {/* 팀 이름 */}
            <p {...stylex.props(Typography.TagLargeMedium, Styles.TeamName)}>{teamItem.teamName}</p>

            {/* 멤버 목록 */}
            <ul {...stylex.props(Styles.MemberList)}>
              {teamItem.memberList.length ? (
                teamItem.memberList.map((memberItem, idx) =>
                  // 이미 선택된 항목은 제외하고 보여줄 수 있게 구현
                  !Object.values(selectedMemberObj)
                    .flat()
                    .map((selectedItem) => selectedItem.MemberId)
                    .includes(memberItem.MemberId) ? (
                    // 멤버 이름 및 프로필 사진
                    <li {...stylex.props(Styles.MemberItem)}>
                      <Checkbox
                        name={memberItem.displayName}
                        id={`${memberItem.MemberId}`}
                        value={memberItem.MemberId}
                        onChange={(e) => handleChangeSelectMemberList(e, teamItem.teamName, memberItem)}
                      >
                        {/* 멤버 정보 */}
                        <div {...stylex.props(Styles.MemberInfoContainer)}>
                          <ProfileImg size={20} src={memberItem.profileImgKey} />
                          <span {...stylex.props(Typography.TagLargeMedium)}>{memberItem.displayName}</span>
                        </div>
                      </Checkbox>
                    </li>
                  ) : (
                    // 팀 내에 있던 모든 멤버가 선택된 경우
                    idx === teamItem.memberList.length - 1 &&
                    idx === selectBookingMemberObj[teamItem.teamName].length - 1 && (
                      <p {...stylex.props(Typography.TagLargeMedium, Styles.NoMemberText)}>멤버 없음</p>
                    )
                  )
                )
              ) : (
                // 처음부터 팀에 멤버가 존재하지 않는 경우
                <p {...stylex.props(Typography.TagLargeMedium, Styles.NoMemberText)}>멤버 없음</p>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberSearchSelect;

const Styles = stylex.create({
  Container: {
    position: 'absolute',
    top: 0,
    width: '240px',
    height: '237Px',
    padding: '12px',
    background: colors.white500,
    borderRadius: '8px',
    boxShadow: Shadows.Shadow1,
  },
  TeamListContainer: {
    height: '160px',
    overflowY: 'auto',
  },
  TeamContainer: {
    marginBottom: '12px',
  },
  TeamName: {
    marginBottom: '14px',
    fontWeight: 700,
  },
  MemberList: {
    display: 'flex',
    gap: '16px',
    flexDirection: 'column',
  },
  MemberItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  MemberInfoContainer: {
    display: 'flex',
    gap: '4px',
    alignContent: 'center',
    justifyContent: 'center',
  },
  isLastSelectedTeam: {
    paddingBottom: '10px',
    borderBottom: `1px solid ${colors.gray30}`,
  },
  NoMemberText: {
    color: colors.gray50,
    textAlign: 'center',
  },
  SearchInput: {
    padding: 0,
    border: 'none',
    outline: 'none',
  },
  InputContainer: {
    width: '100%',
    marginBottom: '14px',
    padding: '4px 8px',
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    boxShadow: `inset 0 0 0 1px ${colors.blue300}`,
    borderRadius: '8px',
    color: {
      default: colors.black400,
      '::placeholder': colors.gray60,
    },
  },
});
