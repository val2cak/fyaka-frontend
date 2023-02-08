import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// API SLICE
import { authApiSlice } from '../features/auth/authApiSlice';
//

// STATE SLICE
import authStateSliceReducer from '../features/auth/authStateSlice';
//

export const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    userState: authStateSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authApiSlice.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
