import { createSlice } from '@reduxjs/toolkit';
import { editTeamItem } from '../types/member';

export interface MemberState {
  editTeamList: editTeamItem[];
}

const initialState: MemberState = {
  // 팀 리스트 저장
  editTeamList: [],
};

export const MemberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    // 팀 리스트 저장
    saveTeamList: (state, action) => {
      state.editTeamList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveTeamList } = MemberSlice.actions;

export default MemberSlice.reducer;
