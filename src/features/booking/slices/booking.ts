import { createSlice } from '@reduxjs/toolkit';

export interface BookingState {
  selectBookingDate: string;
}

const initialState: BookingState = {
  selectBookingDate: '',
};

export const BookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    saveSelectBookingDate: (state, action) => {
      state.selectBookingDate = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveSelectBookingDate } = BookingSlice.actions;

export default BookingSlice.reducer;
