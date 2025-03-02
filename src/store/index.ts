import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import onboardingReducer from '@features/onboarding/slices/onboarding';
import bookingReducer from '@features/booking/slices/booking';
import congressRoomReducer from '@features/mypage/workspace/congress-room/slice/congressRoom';
import modalReducer from '@src/slices/modal';
import memberReducer from '@features/mypage/workspace/member/slices/member';
import categoryReducer from '@features/mypage/workspace/category/slices/category';
import workspaceReducer from '@src/slices/workspace';

const reducers = combineReducers({
  onboarding: onboardingReducer,
  booking: bookingReducer,
  congressRoom: congressRoomReducer,
  modal: modalReducer,
  member: memberReducer,
  category: categoryReducer,
  workspace: workspaceReducer,
});

const persistConfig = {
  key: 'root',
  storage, // 로컬 스토리지에 저장
  whitelist: ['onboarding'], // 로컬 스토리지에 저장할 리듀서
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
