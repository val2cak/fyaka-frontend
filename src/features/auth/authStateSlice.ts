import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getUserFromStorage } from '../../services/storage';
import { User } from '../../types/typeDefinitions';

interface UserState {
  data: {
    username: string;
    token: string;
    tokenExpiry: Date | null;
    isLoggedIn: boolean;
  };
}

const userJson: string | null = getUserFromStorage();
//
const user: User | null = userJson ? JSON.parse(userJson) : null;
//
let tokenExpiryDate: Date | null = null;
//
const currentDate: Date = new Date();
//
if (user && user.tokenExpiry) {
  tokenExpiryDate = new Date(user.tokenExpiry);
}
//
const isLoggedIn: boolean =
  user !== null &&
  tokenExpiryDate !== null &&
  tokenExpiryDate.getTime() >= currentDate.getTime();
//
const initialState: UserState = {
  data: {
    username: user ? user.username : '',
    token: user ? user.token : '',
    tokenExpiry: user ? user.tokenExpiry : null,
    isLoggedIn: isLoggedIn,
  },
};

export const authStateSlice = createSlice({
  name: 'Auth-State-Slice',
  initialState,
  reducers: {
    loginUserSuccess(state, action: PayloadAction<any>) {
      const {
        username: payloadUsername,
        token: payloadToken,
        tokenExpiry: payloadTokenExpiry,
      } = action.payload;

      state.data = {
        username: payloadUsername,
        token: payloadToken,
        tokenExpiry: payloadTokenExpiry,
        isLoggedIn: true,
      };
    },
    logoutUser(state) {
      state = {
        ...state,
        data: { ...state.data, ...initialState.data, isLoggedIn: false },
      };
    },
  },
});

export const { loginUserSuccess, logoutUser } = authStateSlice.actions;

export default authStateSlice.reducer;
