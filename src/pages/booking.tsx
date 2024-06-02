import React, { useState } from 'react';
import stylex from '@stylexjs/stylex';
import Header from '@src/components/ui/Header';
import BookingDatePicker from '@src/features/booking/components/BookingDatePicker';
import BookingFormItem from '@src/features/booking/components/BookingFormItem';
import BookingTextInput from '@src/features/booking/components/BookingTextInput';
import BookingTimePicker from '@src/features/booking/components/BookingTimePicker';
import useInput from '@src/hooks/useInput';
import GnbNavLayout from '@src/layouts/GnbNavLayout';
import { Typography, colors } from '../.../../../public/styles/vars.stylex';
import type { TimeItemType } from '@src/features/booking/types';
import Radio from '@src/components/ui/Radio';
import BookingAutoCompleteSelect from '@src/features/booking/components/BookingAutoCompleteSelect';
import MainLayout from '@src/layouts/MainLayout';
import BookingTextarea from '@src/features/booking/components/BookingTextarea';
import useTextArea from '@src/hooks/useTextarea';

const Booking = () => {
  const [meetingTitle, handleMeetingTitle] = useInput<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [roomId, setRoomId] = useState<number>(null);
  const [categoryId, setCategoryId] = useState<number>(null);
  const [detailContent, handleDetailContent] = useTextArea<string>('');
  const defaultImgUrl = 'https://roomlet.s3.ap-northeast-2.amazonaws.com/public/images/booking_default_2x.png';

  const columnItem = {
    id: {
      dataName: 'TeamId',
    },
    name: {
      dataName: 'teamName',
    },
  };
  const meetingRoomList = [
    {
      RoomId: 1,
      roomName: '회의실 이름',
      roomDescription: '회의실 설명',
      roomSize: 1,
    },
  ];
  const categoryList = [
    {
      CongressCategoryId: 1,
      categoryType: 'custom',
      categoryName: '전체',
    },
  ];

  const dummyList = [
    {
      TeamId: 1,
      teamName: '개발',
      memberList: [
        {
          MemberId: 1,
          displayName: '연두',
          profileImgUrl: 'https://프로필이미지 Url',
          position: '백엔드',
          isAdmin: true,
          email: 'catalyst88@gmail.com',
        },
      ],
    },
  ];

  const handleSelectStartTime = (timeObj: TimeItemType) => {
    setStartTime(timeObj.value);
  };

  const handleSelectEndTime = (timeObj: TimeItemType) => {
    setEndTime(timeObj.value);
  };

  const handleChangeMeetingRoom = (id: number) => {
    setRoomId(id);
  };

  const handleChangeCategory = (id: number) => {
    setCategoryId(id);
  };

  const handleSelectTeam = (teamList) => {
    console.log({ teamList });
  };

  return (
    <MainLayout isScroll>
      <Header title="예약하기" />
      <div {...stylex.props(Styles.container)}>
        <BookingFormItem label="회의 타이틀" required>
          <BookingTextInput
            placeholder="회의 타이틀을 입력해주세요."
            value={meetingTitle}
            onChange={handleMeetingTitle}
          />
        </BookingFormItem>
        <BookingFormItem label="날짜 선택" required>
          <BookingDatePicker />
        </BookingFormItem>
        <BookingFormItem label="시간 선택" required>
          <div {...stylex.props(Styles.TimePickerContainer)}>
            <BookingTimePicker placeholder="시작 시간" onSelect={handleSelectStartTime} />
            <span {...stylex.props(Styles.Hyphen)} />
            <BookingTimePicker placeholder="종료 시간" onSelect={handleSelectEndTime} />
          </div>
        </BookingFormItem>
        <BookingFormItem label="장소" required>
          <div {...stylex.props(Styles.RadioBtnContainer)}>
            {React.Children.toArray(
              meetingRoomList.map((item) => (
                <Radio
                  id={item.roomName}
                  name="meeting-room"
                  label={item.roomName}
                  onChange={() => handleChangeMeetingRoom(item.RoomId)}
                />
              ))
            )}
          </div>
        </BookingFormItem>
        <BookingFormItem label="카테고리" required>
          <div {...stylex.props(Styles.RadioBtnContainer)}>
            {React.Children.toArray(
              categoryList.map((item) => (
                <Radio
                  id={item.categoryName}
                  name="category"
                  label={item.categoryName}
                  onChange={() => handleChangeCategory(item.CongressCategoryId)}
                />
              ))
            )}
          </div>
        </BookingFormItem>
        <BookingFormItem label="팀" required>
          <BookingAutoCompleteSelect
            placeholder="참석팀 검색"
            columnItem={columnItem}
            data={dummyList}
            apiUrl={`/v1/workspace/@{wid}/team`}
            onSelect={handleSelectTeam}
          />
        </BookingFormItem>
        <BookingFormItem label="참석자" required>
          <BookingAutoCompleteSelect
            placeholder="참석자 검색"
            replaceSelectedItemsWithImage
            columnItem={columnItem}
            data={dummyList}
            defaultValueImgUrl={defaultImgUrl}
            apiUrl={`/v1/workspace/@{wid}/team`}
            onSelect={handleSelectTeam}
          />
        </BookingFormItem>
        <BookingFormItem label="상세 내용" required>
          <BookingTextarea
            placeholder="업무에 필요한 정보를 작성해주세요"
            value={detailContent}
            onChange={handleDetailContent}
          />
        </BookingFormItem>
      </div>
      <div {...stylex.props(Styles.submitBtnWrapper)}>
        <button type="button" {...stylex.props(Styles.submitBtn, Typography.TextSmallMedium)}>
          작성 완료
        </button>
      </div>
    </MainLayout>
  );
};

export default Booking;

const Styles = stylex.create({
  container: {
    marginTop: '14px',
    padding: '0 16px',
  },
  TimePickerContainer: {
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
  },
  Hyphen: {
    width: '16px',
    height: '1px',
    background: colors.gray30,
  },
  RadioBtnContainer: {
    display: 'flex',
    gap: '8px',
  },
  submitBtnWrapper: {
    padding: '16px 16px 40px',
  },
  submitBtn: {
    width: '100%',
    padding: '15px 0',
    background: colors.redDim,
    color: colors.white500,
    textAlign: 'center',
    borderRadius: '16px',
  },
});
