import { createSlice } from '@reduxjs/toolkit';
import { EditTeamItem } from '../types/member';

export interface MemberState {
  editTeamList: EditTeamItem[];
  tempDeleteTeamList: EditTeamItem[];
}

const initialState: MemberState = {
  // 팀 리스트 저장
  editTeamList: [],
  // 임시 팀 제거 리스트 저장
  tempDeleteTeamList: [],
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
    // 팀 제거
    tempRemoveTeam: (state, action) => {
      // 팀 제거 전, 미분류 팀으로 모두 이동
      const moveMemberTeamList = state.editTeamList.map((item) => {
        let memberList = item.memberList;

        // [ ] teamType이 base로 설정되기 전까지 미분류 이름으로 나눌 수 있게 수정
        if (item.teamType === 'base' || item.teamName === '미분류') {
          memberList = [...item.memberList, ...action.payload.memberList];
        }

        return { ...item, memberList };
      });

      // 팀 제거 시, 임시로 생성한 팀과 기존 팀을 별도로 처리해서 제거
      const filterRemoveTeamList = moveMemberTeamList.filter((item) => {
        if (item.TeamId) {
          return item.TeamId !== action.payload.TeamId;
        }

        return item.tempTeamId !== action.payload.tempTeamId;
      });

      // TeamId가 존재하는 경우에만 팀 제거 리스트에 추가
      if (action.payload.TeamId) {
        state.tempDeleteTeamList = [...state.tempDeleteTeamList, action.payload];
      }

      state.editTeamList = filterRemoveTeamList;
    },
    // 편집용 팀 리스트 및 임시 팀 리스트 제거 state 초기화
    resetTeamList: (state) => {
      state.editTeamList = [];
      state.tempDeleteTeamList = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveTeamList, addTeam, tempRemoveTeam, resetTeamList } = MemberSlice.actions;

export default MemberSlice.reducer;
