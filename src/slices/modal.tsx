import { createSlice } from '@reduxjs/toolkit';

export const ModalSlice = createSlice({
  name: 'modal',
  initialState: null,
  reducers: {
    // 모달 보여주기
    showModal: (state, action: { payload: React.ReactElement | React.ReactElement[] | string }) => action.payload,
    // 모달 숨기기
    hideModal: () => null,
  },
});

// Action creators are generated for each case reducer function
export const { showModal, hideModal } = ModalSlice.actions;

export default ModalSlice.reducer;
