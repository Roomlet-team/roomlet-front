import React, { useEffect, useState } from 'react';
import stylex from '@stylexjs/stylex';
import GnbNavLayout from '@src/layouts/GnbNavLayout';
import Header from '@src/components/ui/Header';
import { Typography } from '../../../../public/styles/vars.stylex';
import TeamToggle from '@src/features/mypage/workspace/member/components/TeamToggle';
import useGetTeamListQuery from '@src/queries/team/useGetTeamListQuery';
import { useDispatch, useSelector } from 'react-redux';
import { saveTeamList } from '@src/features/mypage/workspace/member/slices/member';
import { RootState } from '@src/store';

const Member = () => {
  const { data } = useGetTeamListQuery();
  const dispatch = useDispatch();
  const { editTeamList } = useSelector((state: RootState) => state.member);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const totalMemberCount = data?.teamList?.reduce(
    (prevValue, currentValue) => prevValue + currentValue?.memberList?.length,
    0
  );

  const completeBtnProps = {
    name: isEdit ? '완료' : '수정',
    isActive: isEdit,
    onClick: () => {
      setIsEdit(!isEdit);
    },
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(saveTeamList(data.teamList));
    }
  }, [isEdit]);

  return (
    <GnbNavLayout>
      <Header title="멤버" prevUrl="/mypage/workspace" rightBtnInfo={completeBtnProps} />
      {/* 검색 */}

      {/* 전체 멤버수 */}
      <div {...stylex.props(Styles.TotalCountWrapper, Typography.TextSmallMedium)}>전체 멤버 ({totalMemberCount})</div>

      {/* 팀 목록 */}
      <div {...stylex.props(Styles.TeamListContainer)}>
        {isEdit
          ? editTeamList?.map((item) => <TeamToggle key={item.TeamId} data={item} isEdit={isEdit} />)
          : data?.teamList?.map((item) => <TeamToggle key={item.TeamId} data={item} />)}
      </div>
    </GnbNavLayout>
  );
};

export default Member;

const Styles = stylex.create({
  TotalCountWrapper: {
    padding: '16px',
  },
  TeamListContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});
