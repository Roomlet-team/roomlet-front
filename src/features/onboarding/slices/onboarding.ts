import { createSlice } from '@reduxjs/toolkit';

export interface OnboardingState {
  isOnboardingHidden: boolean;
}

const initialState: OnboardingState = {
  isOnboardingHidden: false,
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    changeHiddenStatus: (state) => {
      state.isOnboardingHidden = !state.isOnboardingHidden;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeHiddenStatus } = onboardingSlice.actions;

export default onboardingSlice.reducer;
