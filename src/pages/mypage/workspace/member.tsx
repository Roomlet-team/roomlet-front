import React from 'react';
import stylex from '@stylexjs/stylex';
import Header from '@src/components/ui/Header';
import { colors, Typography } from '../../../../public/styles/vars.stylex';
import TeamToggle from '@src/features/mypage/workspace/member/components/TeamToggle';
import useGetTeamListQuery from '@src/queries/team/useGetTeamListQuery';
import PlusOutlined from '@src/components/icons/PlusOutlined';
import useRenderModal from '@src/hooks/ui/useRenderModal';
import MainLayout from '@src/layouts/MainLayout';
import AddTeamBottomSheet from '@src/features/mypage/workspace/member/components/AddTeamBottomSheet';
import useGetMypageInfoQuery from '@src/features/mypage/queries/useGetMypageInfoQuery';
import useInput from '@src/hooks/useInput';
import SearchOutlinedV2 from '@src/components/icons/SearchOutlinedV2';
import useDebounce from '@src/hooks/useDebounce';

const Member = () => {
  const { data: myInfoData } = useGetMypageInfoQuery();
  const { renderModal } = useRenderModal();
  const [searchKeyword, handleChangeSearchKeyword] = useInput('');
  const debounceKeyword = useDebounce(searchKeyword);
  const { data } = useGetTeamListQuery(debounceKeyword);
  const isEditable = ['owner'].includes(myInfoData?.myInfo.role);

  const totalMemberCount = data?.teamList?.reduce(
    (prevValue, currentValue) => prevValue + currentValue?.memberList?.length,
    0
  );

  const handleClickAddTeam = () => {
    renderModal(AddTeamBottomSheet, null);
  };

  return (
    <MainLayout>
      <Header title="멤버" />
      <div {...{ ...stylex.props(Styles.Container) }}>
        {/* 검색 */}
        <div {...stylex.props(Styles.SearchContainer)}>
          <SearchOutlinedV2 width={24} height={24} />
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            value={searchKeyword}
            onChange={handleChangeSearchKeyword}
            {...stylex.props(Typography.SubTextLargeRegular, Styles.SearchInput)}
          />
        </div>

        {/* 전체 멤버수 */}
        <div {...stylex.props(Styles.TotalCountWrapper, Typography.TextSmallMedium)}>
          전체 멤버 ({totalMemberCount})
        </div>

        {/* 팀 목록 */}
        <div {...stylex.props(Styles.TeamListContainer)}>
          {data?.teamList?.map((item, idx) => <TeamToggle key={item.TeamId} data={item} teamIdx={idx} />)}
        </div>

        {/* 팀 추가 */}
        {isEditable && (
          <div {...stylex.props(Styles.AddTeamBtnContainer)}>
            <button
              type="button"
              {...stylex.props(Styles.AddTeamBtn, Typography.TextSmallMedium)}
              onClick={handleClickAddTeam}
            >
              <PlusOutlined width={24} height={24} />
              <span>팀 추가</span>
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Member;

const Styles = stylex.create({
  Container: {
    width: '100%',
    height: 'calc(100vh - 60px)',
    position: 'relative',
    padding: '16px',
    overflowY: 'auto',
  },
  TotalCountWrapper: {
    padding: '16px',
  },
  TeamListContainer: {
    width: '100%',
    // height: 'calc(100vh - 400px)',
    marginBottom: '80px',
    display: 'flex',
    flexDirection: 'column',
  },
  AddTeamBtnContainer: {
    width: 'calc(100% - 32px)',
    maxWidth: '735px',
    padding: '16px',
    position: 'fixed',
    bottom: '0',
    background: colors.white500,
  },
  AddTeamBtn: {
    width: '100%',
    padding: '16px',
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    alignItems: 'center',
    background: colors.red500,
    color: colors.white500,
    borderRadius: '20px',
  },
  SearchContainer: {
    marginBottom: '20px',
    padding: '8px 12px',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    border: `1px solid ${colors.gray40}`,
    borderRadius: '12px',
  },
  SearchInput: {
    width: '100%',
    padding: 0,
    border: 'none',
    outline: 'none',
    '::placeholder': {
      color: colors.gray60,
    },
  },
});
