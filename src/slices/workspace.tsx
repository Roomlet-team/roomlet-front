import { createSlice } from '@reduxjs/toolkit';

export interface WorkspaceState {
  isWorkspace: boolean;
}

const initialState: WorkspaceState = {
  isWorkspace: false,
};

export const WorkspaceSlice = createSlice({
  name: 'workspace',
  initialState: initialState,
  reducers: {
    // 워크스페이스 존재 여부 데이터 저장
    workspaceExists: (state, action: { payload: boolean }) => {
      state.isWorkspace = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { workspaceExists } = WorkspaceSlice.actions;

export default WorkspaceSlice.reducer;
