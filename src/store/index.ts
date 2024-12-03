import { configureStore } from '@reduxjs/toolkit';
import onboardingReducer from '@features/onboarding/slices/onboarding';
import bookingReducer from '@features/booking/slices/booking';
import congressRoomReducer from '@features/mypage/workspace/congress-room/slice/congressRoom';
import modalReducer from '@src/slices/modal';

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
    booking: bookingReducer,
    congressRoom: congressRoomReducer,
    modal: modalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
