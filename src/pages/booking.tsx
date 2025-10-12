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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/store';
import usePostWorkspaceCongressQuery from '@src/features/booking/queries/usePostWorkspaceCongressQuery';
import { TimeItemType } from '@src/features/booking/types';
import useGetWorkspaceCongressQuery from '@src/features/reservation/queries/useGetWorkspaceCongressQuery';
import { useRouter } from 'next/router';
import { saveSelectBookingDate, saveSelectBookingMemberObj } from '@src/features/booking/slices/booking';
import dayjs from 'dayjs';
import AddCongressRoomBottomSheet from '@src/features/mypage/workspace/congress-room/components/AddCongressRoomBottomSheet';
import useRenderModal from '@src/hooks/ui/useRenderModal';
import AddCategoryBottomSheet from '@src/features/mypage/workspace/category/components/AddCategoryBottomSheet';
import useGetMypageInfoQuery from '@src/features/mypage/queries/useGetMypageInfoQuery';

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

export type BookingForm = {
  date: string;
  RoomId: number | null;
  startDt: TimeItemType;
  endDt: TimeItemType;
  attendMemberList: number[] | null;
  CongressCategoryId: number | null;
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
    setValue,
    formState: { errors },
  } = useForm<BookingForm>({ mode: 'onChange' }); // 실시간으로 입력값 확인 및 모든 필드가 유효한지 확인
  const router = useRouter();
  const dispatch = useDispatch();
  const { id, mode } = router.query;
  const { renderModal } = useRenderModal();
  const { data: myInfoData } = useGetMypageInfoQuery();
  const { data: congressRoomData } = useGetCongressRoomListQuery();
  const { data: categoryData } = useGetCategoryListQuery();
  const { data: congressData } = useGetWorkspaceCongressQuery({ cgsid: Number(id) || null });
  const mutation = usePostWorkspaceCongressQuery();
  // 시간 선택시 roomId, date, startDt 값이 필요해서 해당 값들은 실시간 추적이 가능하도록 함.
  const RoomId = useWatch({ control, name: 'RoomId' });
  const startDt = useWatch({ control, name: 'startDt' });
  // selectBookingDate 설정시 값이 초기화 되는 문제가 있어서 제목, 카테고리, 종료 시간, 참석자, 상세 내용도 추적이 가능하게 함
  const endDt = useWatch({ control, name: 'endDt' });

  // 모든 필드의 값을 감시
  const values = watch();

  // 모든 필수 필드가 채워져있는지 확인
  const isAllFieldsFilled = Object.values(values).every((value) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return value !== undefined && value !== '' && value !== null;
  });

  const onSubmit = (data) => {
    const mappedAttendMemberList = data.attendMemberList.map((memberId) => ({ MemberId: memberId }));

    mutation.mutate({
      ...data,
      attendMemberList: mappedAttendMemberList,
      CongressCategoryId: Number(data.CongressCategoryId),
      RoomId: Number(data.RoomId),
      startDt: data.startDt.value,
      endDt: data.endDt.value,
    });
  };

  const handleClickAddMeetingRoom = () => {
    renderModal(AddCongressRoomBottomSheet, { mode: 'immediate' });
  };

  const handleClickAddCategory = () => {
    renderModal(AddCategoryBottomSheet, { mode: 'immediate' });
  };

  useEffect(() => {
    // 회의 수정하는 경우, 기존 회의 정보를 가져와서 저장
    if (congressData?.congress && mode === 'edit') {
      const mappedAttendMemberObj = congressData?.congress?.attendTeamList.reduce((acc, val) => {
        acc[val.teamName] = val.memberList;
        return acc;
      }, {});

      reset({
        congressTitle: congressData?.congress?.congressTitle,
        CongressCategoryId: congressData?.congress?.congressCategory.CongressCategoryId,
        RoomId: congressData?.congress?.congressRoom.RoomId,
        date: congressData?.congress?.date,
        startDt: {
          name: dayjs(congressData.congress.startDt).format('A HH:mm'),
          value: congressData.congress.startDt,
        },
        endDt: {
          name: dayjs(congressData.congress.endDt).format('A HH:mm'),
          value: congressData.congress.endDt,
        },
        congressDescription: congressData?.congress?.congressDescription,
      });

      dispatch(saveSelectBookingMemberObj(mappedAttendMemberObj));
      dispatch(saveSelectBookingDate(congressData?.congress?.date));
    }
  }, [congressRoomData?.congressRoomList, categoryData?.congressCategoryList, congressData?.congress]);

  return (
    <MainLayout isScroll>
      <Header title="예약하기" />

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
                        {...(mode === 'edit' && {
                          checked: field.value === congressData?.congress.congressRoom.RoomId,
                        })}
                      />
                    )}
                  />
                ))
              )}
              {myInfoData?.myInfo.isAdmin && (
                <button type="button" {...stylex.props(Styles.addBtn)} onClick={handleClickAddMeetingRoom}>
                  + 추가하기
                </button>
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
                        {...(mode === 'edit' && {
                          checked: field.value === congressData?.congress.congressCategory.CongressCategoryId,
                        })}
                      />
                    )}
                  />
                ))
              )}
              {myInfoData?.myInfo.isAdmin && (
                <button type="button" {...stylex.props(Styles.addBtn)} onClick={handleClickAddCategory}>
                  + 추가하기
                </button>
              )}
            </div>
          </BookingFormItem>

          {/* 날짜 선택 */}
          <BookingFormItem label="날짜 선택" required>
            <Controller
              name="date"
              control={control}
              defaultValue={selectBookingDate}
              render={({ field }) => <BookingDatePicker setValue={setValue} />}
              rules={{ required: '날짜를 선택해주세요' }}
            />
          </BookingFormItem>

          {/* 시간 선택 */}
          <BookingFormItem label="시간 선택" required>
            <div {...stylex.props(Styles.TimePickerContainer)}>
              <Controller
                name="startDt"
                control={control}
                defaultValue={null}
                rules={{ required: '시작 시간을 선택해주세요' }}
                render={({ field }) => (
                  <BookingTimePicker
                    placeholder="시작 시간"
                    onSelect={field.onChange}
                    roomId={RoomId}
                    defaultValue={startDt}
                  />
                )}
              />
              <span {...stylex.props(Styles.Hyphen)} />
              <Controller
                name="endDt"
                control={control}
                defaultValue={null}
                rules={{ required: '종료 시간을 선택해주세요' }}
                render={({ field }) => (
                  <BookingTimePicker
                    placeholder="종료 시간"
                    onSelect={field.onChange}
                    roomId={RoomId}
                    startDt={startDt}
                    defaultValue={endDt}
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
    flexWrap: 'wrap',
  },
  addBtn: {
    width: 'fit-content',
    padding: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    borderRadius: '20px',
    boxShadow: `inset 0 0 0 1px ${colors.gray40}`,
    fontSize: '1.2rem',
    fontWeight: 500,
    color: '#070505',
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
