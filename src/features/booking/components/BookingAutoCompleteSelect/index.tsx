import React, { FC, useEffect, useRef, useState } from 'react';
import stylex from '@stylexjs/stylex';
import ProfileImg from '@src/components/ui/ProfileImg';
import SearchInput from './SearchInput';
import { AutoCompleteItemInfo } from '../../types';
import { Typography, colors } from '../../../../../public/styles/vars.stylex';

type BookingAutoCompleteSelectProps = {
  defaultValueImgUrl?: string;
  onSelect: (value: any) => void;
  replaceSelectedItemsWithImage?: boolean; // 선택된 항목들을 이미지로만 보여줄지 말지 결정하는 함수(ex. 프로필 이미지로만 보여줄지 결정)
  placeholder: string;
  columnItem: AutoCompleteItemInfo;
};

const BookingAutoCompleteSelect: FC<BookingAutoCompleteSelectProps> = (props) => {
  const { defaultValueImgUrl, onSelect, replaceSelectedItemsWithImage, placeholder, columnItem } = props;
  const [selectedItemList, setSelectedItemList] = useState<any[]>([]);
  const [isOpenAutoCompleteSelect, setIsOpenAutoCompleteSelect] = useState<boolean>(false);
  const autoCompleteRef = useRef<HTMLDivElement>(null);

  const handleClickItem = () => {
    setIsOpenAutoCompleteSelect(true);
  };

  const handleSelectedKeywordList = (list: any[]) => {
    setSelectedItemList(list);
    onSelect(list);
  };

  const handleClickOutside = ({ target }) => {
    if (!autoCompleteRef.current.contains(target)) {
      setIsOpenAutoCompleteSelect(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div {...stylex.props(Styles.autoCompleteSelect)} ref={autoCompleteRef}>
      {/* 선택된 참가자 목록을 밖에서 보여주는 영역 */}
      {selectedItemList.length ? (
        <>
          {replaceSelectedItemsWithImage ? (
            <div {...stylex.props(Styles.selectedItemContainer)}>
              {selectedItemList.map((item) => (
                <button type="button" onClick={handleClickItem}>
                  <div {...stylex.props(Styles.userInfoContainer)}>
                    <ProfileImg src={item.profileImgUrl} size={20} />
                    <span {...stylex.props(Typography.TagLargeMedium)}>{item.displayName}</span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div {...stylex.props(Styles.selectedItemContainer)}>
              {selectedItemList.map((item) => (
                <button type="button" onClick={handleClickItem}>
                  <span {...stylex.props(Styles.selectedItemName, Typography.TextSmallRegular)}>{item.teamName}</span>
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <button type="button" onClick={handleClickItem}>
          {replaceSelectedItemsWithImage ? (
            <ProfileImg src={defaultValueImgUrl} size={32} />
          ) : (
            <div {...stylex.props(Styles.unselectedTeamWrapper)}>팀</div>
          )}
        </button>
      )}

      {/* 참석자 검색 및 선택 */}
      {isOpenAutoCompleteSelect && (
        <SearchInput
          onSelect={handleSelectedKeywordList}
          placeholder={placeholder}
          columnItem={columnItem}
          defaultValue={selectedItemList}
        />
      )}
    </div>
  );
};

export default BookingAutoCompleteSelect;

const Styles = stylex.create({
  autoCompleteSelect: {
    width: 'fit-content',
    position: 'relative',
  },
  selectedItemContainer: {
    display: 'flex',
    gap: '6px',
  },
  selectedItemName: {
    color: colors.black500,
  },
  unselectedTeamWrapper: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: colors.gray60,
    borderRadius: '50%',
    color: colors.white500,
  },
  userInfoContainer: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
  },
});
