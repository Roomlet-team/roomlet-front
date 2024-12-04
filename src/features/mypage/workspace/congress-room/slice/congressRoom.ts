import { createSlice } from '@reduxjs/toolkit';
import { CongressRoomInfoItem } from '@src/queries/congress/useGetCongressRoomListQuery';

export interface CongressRoomState {
  editCongressRoomList: CongressRoomInfoItem[];
}

const initialState: CongressRoomState = {
  // 회의실 리스트 저장
  editCongressRoomList: null,
};

export const CongressRoomSlice = createSlice({
  name: 'congressRoom',
  initialState,
  reducers: {
    // 회의실 리스트 저장
    saveCongressRoomList: (state, action) => {
      state.editCongressRoomList = action.payload;
    },
    // 회의실 추가
    addCongressRoom: (state, action) => {
      state.editCongressRoomList = [...state.editCongressRoomList, action.payload];
    },
    // 회의실 제거
    tempRemoveCongressRoom: (state, action) => {
      const filterRemoveCongressRoomList = state.editCongressRoomList.filter((item) => item.RoomId !== action.payload);

      state.editCongressRoomList = filterRemoveCongressRoomList;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveCongressRoomList, addCongressRoom, tempRemoveCongressRoom } = CongressRoomSlice.actions;

export default CongressRoomSlice.reducer;
