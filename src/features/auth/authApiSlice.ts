import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { generateHeaders } from '../../services/generateHeaders';

const authApiHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

interface AuthData {
  username: string;
  password: string;
}

interface User {
  username: string;
  token: string;
  tokenExpiry: Date;
}

export const authApiSlice = createApi({
  reducerPath: 'Auth-Api-Slice',

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
    prepareHeaders: (headers) => generateHeaders(headers),
  }),

  endpoints(builder) {
    return {
      loginUser: builder.mutation<User, AuthData>({
        query: ({ ...credentials }) => ({
          url: `http://localhost:8000/api/users/login`,
          method: 'POST',
          body: credentials,
          headers: authApiHeaders,
        }),
      }),
    };
  },
});

export const { useLoginUserMutation } = authApiSlice;
