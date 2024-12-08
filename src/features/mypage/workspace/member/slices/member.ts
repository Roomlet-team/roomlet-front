import { createSlice } from '@reduxjs/toolkit';
import { EditTeamItem } from '../types/member';

export interface MemberState {
  editTeamList: EditTeamItem[];
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
    // 팀 추가
    addTeam: (state, action) => {
      // 임시로 생성한 팀을 제거할 때, 고유 id 값으로 판별하기 위해 tempTeamId 생성
      const tempTeamId = state.editTeamList.filter((item) => item.tempTeamId).length + 1;

      state.editTeamList = [...state.editTeamList, { ...action.payload, tempTeamId, memberList: [] }];
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveTeamList, addTeam } = MemberSlice.actions;

export default MemberSlice.reducer;
