import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Controller, useForm, useWatch } from 'react-hook-form';
import stylex from '@stylexjs/stylex';
import Header from '@src/components/ui/Header';
import BookingFormItem from '@src/features/booking/components/BookingFormItem';
// import BookingDatePicker from '@src/features/booking/components/BookingDatePicker';
// import BookingTextInput from '@src/features/booking/components/BookingTextInput';
// import BookingTimePicker from '@src/features/booking/components/BookingTimePicker';
// import BookingTextarea from '@src/features/booking/components/BookingTextarea';
// import BookingMemberSelect from '@src/features/booking/components/BookingMemberSelect';
import { Typography, colors } from '../.../../../public/styles/vars.stylex';
import Radio from '@src/components/ui/Radio';
import MainLayout from '@src/layouts/MainLayout';
import useGetCongressRoomListQuery from '@src/queries/congress/useGetCongressRoomListQuery';
import useGetCategoryListQuery from '@src/queries/category/useGetCategoryListQuery';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import usePostWorkspaceCongressQuery from '@src/features/booking/queries/usePostWorkspaceCongressQuery';
import { TimeItemType } from '@src/features/booking/types';

const BookingMemberSelect = dynamic(() => import('@src/features/booking/components/BookingMemberSelect'), {
  ssr: false,
});
const BookingTextarea = dynamic(() => import('@src/features/booking/components/BookingTextarea'), {
  ssr: false,
});
const BookingTextInput = dynamic(() => import('@src/features/booking/components/BookingTextInput'), {
  ssr: false,
});
const BookingTimePicker = dynamic(() => import('@src/features/booking/components/BookingTimePicker'), {
  ssr: false,
});
const BookingDatePicker = dynamic(() => import('@src/features/booking/components/BookingDatePicker'), {
  ssr: false,
});

type BookingForm = {
  date: string;
  RoomId: number;
  startTime: TimeItemType;
  endTime: TimeItemType;
  attendMemberList: string[];
  CongressCategoryId: number;
  congressTitle: string;
  congressDescription: string;
};

const Booking = () => {
  const { selectBookingDate } = useSelector((state: RootState) => state.booking);
  const {
    watch,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<BookingForm>({ mode: 'onChange' }); // 실시간으로 입력값 확인 및 모든 필드가 유효한지 확인
  const { data: congressRoomData } = useGetCongressRoomListQuery();
  const { data: categoryData } = useGetCategoryListQuery();
  const mutation = usePostWorkspaceCongressQuery();
  // 시간 선택시 roomId, date, startTime 값이 필요해서 해당 값들은 실시간 추적이 가능하도록 함.
  const RoomId = useWatch({ control, name: 'RoomId' });
  const date = useWatch({ control, name: 'date' });
  const startTime = useWatch({ control, name: 'startTime' });
  // selectBookingDate 설정시 값이 초기화 되는 문제가 있어서 제목, 카테고리, 종료 시간, 참석자, 상세 내용도 추적이 가능하게 함
  const congressTitle = useWatch({ control, name: 'congressTitle' });
  const CongressCategoryId = useWatch({ control, name: 'CongressCategoryId' });
  const endTime = useWatch({ control, name: 'endTime' });
  const congressDescription = useWatch({ control, name: 'congressDescription' });
  const attendMemberList = useWatch({ control, name: 'attendMemberList' });

  // 모든 필드의 값을 감시
  const values = watch();

  // 모든 필수 필드가 채워져있는지 확인
  const isAllFieldsFilled = Object.values(values).every((value) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return value !== undefined && value !== '';
  });

  const onSubmit = (data) => {
    const mappedAttendMemberList = data.attendMemberList.map((memberId) => ({ MemberId: memberId }));

    mutation.mutate({
      ...data,
      attendMemberList: mappedAttendMemberList,
      CongressCategoryId: Number(data.CongressCategoryId),
      RoomId: Number(data.RoomId),
      startTime: data.startTime.value,
      endTime: data.endTime.value,
    });
  };

  // Redux 상태 변경 시 React Hook Form의 값 동기화
  useEffect(() => {
    if (selectBookingDate) {
      reset({
        date: selectBookingDate,
        RoomId,
        startTime,
        congressTitle,
        CongressCategoryId,
        endTime,
        congressDescription,
        attendMemberList,
      });
    }
  }, [selectBookingDate, reset]);

  return (
    <MainLayout isScroll>
      <Header title="예약하기" prevUrl="/calendar" />

      {/* 예약하기 폼 */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div {...stylex.props(Styles.container)}>
          {/* 회의 타이틀 */}
          <BookingFormItem label="회의 타이틀" required>
            <Controller
              name="congressTitle"
              control={control}
              defaultValue=""
              rules={{ required: '회의 타이틀을 입력해주세요' }}
              render={({ field }) => (
                <BookingTextInput
                  placeholder="회의 타이틀을 입력해주세요."
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </BookingFormItem>

          {/* 장소 */}
          <BookingFormItem label="장소" required>
            <div {...stylex.props(Styles.RadioBtnContainer)}>
              {React.Children.toArray(
                congressRoomData?.congressRoomList.map((item) => (
                  <Controller
                    name="RoomId"
                    control={control}
                    defaultValue={null}
                    rules={{ required: '장소를 선택해주세요' }}
                    render={({ field }) => (
                      <Radio
                        name="RoomId"
                        id={item.roomName}
                        label={item.roomName}
                        value={item.RoomId}
                        onChange={field.onChange}
                      />
                    )}
                  />
                ))
              )}
            </div>
          </BookingFormItem>

          {/* 카테고리 */}
          <BookingFormItem label="카테고리" required>
            <div {...stylex.props(Styles.RadioBtnContainer)}>
              {React.Children.toArray(
                categoryData?.congressCategoryList.map((item) => (
                  <Controller
                    name="CongressCategoryId"
                    control={control}
                    defaultValue={null}
                    rules={{ required: '카테고리를 선택해주세요' }}
                    render={({ field }) => (
                      <Radio
                        name="CongressCategoryId"
                        id={item.categoryName}
                        label={item.categoryName}
                        value={item.CongressCategoryId}
                        onChange={field.onChange}
                      />
                    )}
                  />
                ))
              )}
            </div>
          </BookingFormItem>

          {/* 날짜 선택 */}
          <BookingFormItem label="날짜 선택" required>
            <Controller
              name="date"
              control={control}
              defaultValue={selectBookingDate}
              render={({ field }) => <BookingDatePicker />}
              rules={{ required: '날짜를 선택해주세요' }}
            />
          </BookingFormItem>

          {/* 시간 선택 */}
          <BookingFormItem label="시간 선택" required>
            <div {...stylex.props(Styles.TimePickerContainer)}>
              <Controller
                name="startTime"
                control={control}
                defaultValue={null}
                rules={{ required: '시작 시간을 선택해주세요' }}
                render={({ field }) => (
                  <BookingTimePicker
                    placeholder="시작 시간"
                    onSelect={field.onChange}
                    roomId={RoomId}
                    reserDate={date}
                  />
                )}
              />
              <span {...stylex.props(Styles.Hyphen)} />
              <Controller
                name="endTime"
                control={control}
                defaultValue={null}
                rules={{ required: '종료 시간을 선택해주세요' }}
                render={({ field }) => (
                  <BookingTimePicker
                    placeholder="종료 시간"
                    onSelect={field.onChange}
                    roomId={RoomId}
                    reserDate={date}
                    startTime={startTime}
                  />
                )}
              />
            </div>
          </BookingFormItem>

          {/* 참석자 */}
          <BookingFormItem label="참석자" required>
            <Controller
              name="attendMemberList"
              control={control}
              defaultValue={null}
              rules={{ required: '참석자를 선택해주세요' }}
              render={({ field }) => <BookingMemberSelect onSelect={field.onChange} />}
            />
          </BookingFormItem>

          {/* 상세 내용 */}
          <BookingFormItem label="상세 내용" required>
            <Controller
              name="congressDescription"
              control={control}
              defaultValue=""
              rules={{ required: '상세 내용을 입력해주세요' }}
              render={({ field }) => (
                <BookingTextarea
                  placeholder="업무에 필요한 정보를 작성해주세요"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </BookingFormItem>
        </div>

        {/* 작성 완료 버튼 */}
        <div {...stylex.props(Styles.submitBtnWrapper)}>
          <button type="submit" {...stylex.props(Styles.submitBtn(isAllFieldsFilled), Typography.TextSmallMedium)}>
            작성 완료
          </button>
        </div>
      </form>
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
  submitBtn: (isAllFieldsFilled: boolean) => ({
    width: '100%',
    padding: '15px 0',
    background: isAllFieldsFilled ? colors.red500 : colors.redDim,
    color: colors.white500,
    textAlign: 'center',
    borderRadius: '16px',
  }),
});
