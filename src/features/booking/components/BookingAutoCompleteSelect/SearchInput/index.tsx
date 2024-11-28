import React, { FC, useEffect, useState } from 'react';
import stylex from '@stylexjs/stylex';
import { Shadows, Typography, colors } from '../../../../../../public/styles/vars.stylex';
import SearchOutlined from '@src/components/icons/SearchOutlined';
import CheckmarkOutlined from '@src/components/icons/CheckmarkOutlined';
import { AutoCompleteItemInfo } from '@src/features/booking/types';
import useGetMemberListQuery from '@src/features/booking/queries/useGetMemberListQuery';
import useDebounce from '@src/hooks/useDebounce';
import ProfileImg from '@src/components/ui/ProfileImg';

type SearchInputProps = {
  onSelect: (valArr: any[]) => void;
  placeholder: string;
  columnItem: AutoCompleteItemInfo;
  defaultValue: any[];
};

const SearchInput: FC<SearchInputProps> = (props) => {
  const { onSelect, placeholder, columnItem, defaultValue } = props;
  const [keyword, setKeyword] = useState<string>('');
  const debounceKeyword = useDebounce(keyword);
  const [selectedKeywordList, setSelectedKeywordList] = useState<any[]>(defaultValue);
  const [unselectedKeywordList, setUnselectedKeywordList] = useState<any[]>([]);
  const { data } = useGetMemberListQuery(debounceKeyword);

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleClickUncheckedItem = (e, item) => {
    // 이벤트 전파 중단 (이벤트가 실행되면서 의도와 상관없이 SearchInput가 닫히게 됨.)
    e.stopPropagation();
    const removeKeyWordList = selectedKeywordList.filter(
      (keywordItem) => keywordItem[columnItem.id.dataName] !== item[columnItem.id.dataName]
    );
    setSelectedKeywordList(removeKeyWordList);
    setUnselectedKeywordList([...unselectedKeywordList, item]);

    onSelect(removeKeyWordList);
  };

  const handleClickCheckedItem = (e, item) => {
    // 이벤트 전파 중단 (이벤트가 실행되면서 의도와 상관없이 SearchInput가 닫히게 됨.)
    e.stopPropagation();

    const removeKeyWordList = unselectedKeywordList.filter(
      (keywordItem) => keywordItem[columnItem.id.dataName] !== item[columnItem.id.dataName]
    );

    setUnselectedKeywordList(removeKeyWordList);
    setSelectedKeywordList([...selectedKeywordList, item]);

    onSelect([...selectedKeywordList, item]);
  };

  useEffect(() => {
    if (selectedKeywordList.length === 0) {
      // 선택한 리스트 값이 없을 때, 선택하지 않은 값 리스트에 전체 멤버 리스트 삽입
      setUnselectedKeywordList(data?.memberList);
    } else {
      // 선택한 리스트 값이 있을 때, 전체 멤버 리스트에서 선택한 멤버 리스트를 제외한 값을 삽입
      const selectedIdList = selectedKeywordList.map((item) => item.MemberId);
      const filterUnselectedMemberList = data?.memberList.filter((item) => !selectedIdList.includes(item.MemberId));

      setUnselectedKeywordList(filterUnselectedMemberList);
    }
  }, [data?.memberCount]);

  return (
    <div {...stylex.props(Styles.container)}>
      {/* 검색어 입력 */}
      <div {...stylex.props(Styles.inputContainer)}>
        <SearchOutlined width={18} height={18} />
        <input
          {...stylex.props(Styles.input, Typography.CaptionLargeRegular)}
          type="text"
          value={keyword}
          onChange={handleChangeKeyword}
          placeholder={placeholder}
        />
      </div>

      {/* 선택 완료된 항목 */}
      {selectedKeywordList.length > 0 && (
        <div {...stylex.props(Styles.itemListContainer, Styles.checkedItemListWrapper)}>
          {selectedKeywordList.map((item) => (
            <button
              type="button"
              key={item.MemberId}
              {...stylex.props(Styles.itemBtn)}
              onClick={(e) => handleClickUncheckedItem(e, item)}
            >
              <div {...stylex.props(Styles.checkedBox)}>
                <CheckmarkOutlined width={12} height={8} />
              </div>
              <div {...stylex.props(Styles.userInfoContainer)}>
                <ProfileImg size={20} src={item.profileImgUrl} />
                <span {...stylex.props(Typography.TagLargeMedium)}>{item[columnItem.name.dataName]}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* 미선택 항목 */}
      <div {...stylex.props(Styles.itemListContainer)}>
        {unselectedKeywordList?.map((item) => (
          <button
            type="button"
            key={item.MemberId}
            {...stylex.props(Styles.itemBtn, Typography.TagLargeMedium)}
            onClick={(e) => handleClickCheckedItem(e, item)}
          >
            <div {...stylex.props(Styles.uncheckedBox)} />
            <div {...stylex.props(Styles.userInfoContainer)}>
              <ProfileImg size={20} src={item.profileImgUrl} />
              <span {...stylex.props(Typography.TagLargeMedium)}>{item[columnItem.name.dataName]}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchInput;

const Styles = stylex.create({
  container: {
    width: '232px',
    height: '242px',
    padding: '12px',
    position: 'absolute',
    top: 0,
    left: 0,
    background: colors.white500,
    boxShadow: Shadows.Shadow1,
    borderRadius: '8px',
    zIndex: 1,
  },
  inputContainer: {
    width: '100%',
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
  input: {
    padding: 0,
    border: 'none',
    outline: 'none',
  },
  userInfoContainer: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
  },
  itemListContainer: {
    paddingTop: '12px',
    display: 'flex',
    gap: '16px',
    flexDirection: 'column',
  },
  itemBtn: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  uncheckedBox: {
    width: '20px',
    height: '20px',
    boxShadow: `inset 0 0 0 1px ${colors.gray50}`,
    borderRadius: '4px',
  },
  checkedBox: {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    background: `${colors.red500}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedItemListWrapper: {
    paddingBottom: '12px',
    borderBottom: `1px solid ${colors.gray30}`,
  },
});
