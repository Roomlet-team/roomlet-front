import { createSlice } from '@reduxjs/toolkit';
import { MemberInfoItem } from '@src/queries/team/useGetTeamListQuery';

export interface BookingState {
  isUpdatedBookingDate: boolean;
  selectBookingDate: string;
  selectBookingMemberObj: { [teamName in string]: MemberInfoItem[] };
}

const initialState: BookingState = {
  isUpdatedBookingDate: false,
  selectBookingDate: '',
  selectBookingMemberObj: {},
};

export const BookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    resetIsUpdatedBookingDate: (state) => {
      state.isUpdatedBookingDate = false;
    },
    setIsUpdatedBookingDate: (state) => {
      state.isUpdatedBookingDate = true;
    },
    // 선택한 회의 예약 날짜
    saveSelectBookingDate: (state, action) => {
      state.selectBookingDate = action.payload;
    },
    // 선택한 참석자를 모은 객체
    saveSelectBookingMemberObj: (state, action) => {
      state.selectBookingMemberObj = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveSelectBookingDate, saveSelectBookingMemberObj, resetIsUpdatedBookingDate, setIsUpdatedBookingDate } =
  BookingSlice.actions;

export default BookingSlice.reducer;
