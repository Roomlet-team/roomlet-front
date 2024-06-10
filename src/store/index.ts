import { configureStore } from '@reduxjs/toolkit';
import onboardingReducer from '@features/onboarding/slices/onboarding';
import bookingReducer from '@features/booking/slices/booking';

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
    booking: bookingReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
