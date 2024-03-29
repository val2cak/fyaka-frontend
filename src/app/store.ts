import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// API SLICE
import { authApiSlice } from '../features/auth/authApiSlice';
import { servicesApiSlice } from '../features/guest/ServicesList/servicesApiSlice';
import { favoritesApiSlice } from '../features/admin/Favorites/favoritesApiSlice';
import { locationsApiSlice } from '../components/Locations/locationsSlice';
import { reviewsApiSlice } from '../features/admin/Reviews/reviewsApiSlice';
//

// STATE SLICE
import authStateSliceReducer from '../features/auth/authStateSlice';
//

export const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    userState: authStateSliceReducer,
    [servicesApiSlice.reducerPath]: servicesApiSlice.reducer,
    [favoritesApiSlice.reducerPath]: favoritesApiSlice.reducer,
    [locationsApiSlice.reducerPath]: locationsApiSlice.reducer,
    [reviewsApiSlice.reducerPath]: reviewsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authApiSlice.middleware,
      servicesApiSlice.middleware,
      favoritesApiSlice.middleware,
      locationsApiSlice.middleware,
      reviewsApiSlice.middleware
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
