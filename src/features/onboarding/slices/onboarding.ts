import { createSlice } from '@reduxjs/toolkit';

export interface OnboardingState {
  isHidden: boolean;
}

const initialState: OnboardingState = {
  isHidden: false,
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    changeHiddenStatus: (state) => {
      state.isHidden = !state.isHidden;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeHiddenStatus } = onboardingSlice.actions;

export default onboardingSlice.reducer;
