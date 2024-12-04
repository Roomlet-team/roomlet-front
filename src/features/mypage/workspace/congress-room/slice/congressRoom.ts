import { createSlice } from '@reduxjs/toolkit';
import { editCongressRoomItem } from '../types/congressRoom';

export interface CongressRoomState {
  editCongressRoomList: editCongressRoomItem[];
  tempDeleteCongressRoomList: editCongressRoomItem[];
}

const initialState: CongressRoomState = {
  // 회의실 리스트 저장
  editCongressRoomList: [],
  tempDeleteCongressRoomList: [],
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
      // 임시로 생성한 회의실을 제거할 때, 고유 id 값으로 판별하기 위해 tempRoomId 생성
      const tempRoomId = state.editCongressRoomList.filter((item) => item.tempRoomId).length + 1;

      state.editCongressRoomList = [...state.editCongressRoomList, { ...action.payload, tempRoomId }];
    },
    // 회의실 제거
    tempRemoveCongressRoom: (state, action) => {
      // 회의실 제거 시, 임시로 생성한 회의실과 기존 회의실을 별도로 처리해서 제거
      const filterRemoveCongressRoomList = state.editCongressRoomList.filter((item) => {
        if (item.RoomId) {
          return item.RoomId !== action.payload.RoomId;
        }

        return item.tempRoomId !== action.payload.tempRoomId;
      });

      // RoomId가 존재하는 경우에만 회의실 제거 리스트에 추가
      if (action.payload.RoomId) {
        state.tempDeleteCongressRoomList = [...state.tempDeleteCongressRoomList, action.payload];
      }

      state.editCongressRoomList = filterRemoveCongressRoomList;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveCongressRoomList, addCongressRoom, tempRemoveCongressRoom } = CongressRoomSlice.actions;

export default CongressRoomSlice.reducer;
