import { createSlice } from '@reduxjs/toolkit';
import { MemberInfoItem } from '@src/queries/team/useGetTeamListQuery';

export interface BookingState {
  selectBookingDate: string;
  selectBookingMemberObj: { [teamName in string]: MemberInfoItem[] };
}

const initialState: BookingState = {
  selectBookingDate: '',
  selectBookingMemberObj: {},
};

export const BookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
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
export const { saveSelectBookingDate, saveSelectBookingMemberObj } = BookingSlice.actions;

export default BookingSlice.reducer;
