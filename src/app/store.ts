import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import socialReducer from '../features/socialCard/socialSlice';

export const store = configureStore({
  reducer: {
    users: socialReducer 
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
