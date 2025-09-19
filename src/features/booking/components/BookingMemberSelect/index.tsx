import React, { FC, useEffect, useRef, useState } from 'react';
import stylex from '@stylexjs/stylex';
import ProfileImg from '@src/components/ui/ProfileImg';
import MemberSearchSelect from './MemberSearchSelect';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { Typography } from '../../../../../public/styles/vars.stylex';

interface BookingMemberSelectProps {
  onSelect: (data: number[]) => void;
}

const BookingMemberSelect: FC<BookingMemberSelectProps> = (props) => {
  const { onSelect } = props;
  const { selectBookingMemberObj } = useSelector((state: RootState) => state.booking);
  const defaultImgUrl = 'https://roomlet.s3.ap-northeast-2.amazonaws.com/public/images/booking_default_2x.png'; // 참가자를 선택하지 않았을 때 보여지는 이미지
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e) => {
    e.stopPropagation();
    const target = e.target;
    if (!selectRef?.current?.contains(target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickMemberSelect = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    // 선택된 멤버 리스트에서 id만 추출해서 저장한 배열
    const memberIds = Object.values(selectBookingMemberObj)
      .flat()
      .map((memberItem) => memberItem?.MemberId);

    // 선택한 멤버의 id만 저장한 배열을 전달
    onSelect(memberIds);
  }, [selectBookingMemberObj]);

  return (
    <div {...stylex.props(Styles.Container)} ref={selectRef}>
      {/* 선택이 완료된 멤버 리스트 */}
      {Object.values(selectBookingMemberObj).length > 0 ? (
        <div {...stylex.props(Styles.TeamListContainer)} onClick={handleClickMemberSelect}>
          {Object.keys(selectBookingMemberObj).map((teamName) => (
            <div {...stylex.props(Styles.TeamContainer)}>
              <p {...stylex.props(Styles.TeamName)}>{teamName}</p>
              <div {...stylex.props(Styles.MemberListContainer)}>
                {selectBookingMemberObj[teamName].map((memberItem) => (
                  <div {...stylex.props(Styles.MemberInfoContainer)}>
                    <ProfileImg size={20} imgKey={memberItem.profileImgKey} />
                    <span {...stylex.props(Typography.TagLargeMedium)}>{memberItem.displayName}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // 아직 선택된 멤버가 없을 때
        <button type="button" onClick={handleClickMemberSelect}>
          <ProfileImg size={32} imgKey={defaultImgUrl} />
        </button>
      )}

      {/* 멤버 선택창 열기 */}
      {isOpen && <MemberSearchSelect />}
    </div>
  );
};

export default BookingMemberSelect;

const Styles = stylex.create({
  Container: {
    position: 'relative',
    cursor: 'pointer',
  },
  TeamListContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  TeamContainer: {
    alignItems: 'center',
    display: 'flex',
    gap: '16px',
  },
  MemberListContainer: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  MemberInfoContainer: {
    display: 'flex',
    gap: '4px',
    alignContent: 'center',
  },
  TeamName: {
    width: '56px',
    fontWeight: 400,
    fontSize: '1.6rem',
    lineHeight: '2.4rem',
  },
});
