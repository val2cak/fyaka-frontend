import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { generateHeaders } from '../../services/generateHeaders';
import { User } from '../../types/typeDefinitions';

const authApiHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData extends LoginData {
  email: string;
}

export const authApiSlice = createApi({
  reducerPath: 'Auth-Api-Slice',

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/users`,
    prepareHeaders: (headers) => generateHeaders(headers),
  }),
  tagTypes: ['Users-List', 'Single-User'],

  endpoints(builder) {
    return {
      getUsers: builder.query<User[], string>({
        query: (searchTerm?: string) => {
          const queryParams = new URLSearchParams();
          if (searchTerm) {
            queryParams.append('searchTerm', encodeURI(searchTerm));
          }
          const queryString = queryParams.toString();
          const encodedQueryString = queryString ? queryString : '';
          return encodedQueryString ? `?${encodedQueryString}` : ``;
        },
        providesTags: ['Users-List'],
      }),
      getSingleUser: builder.query<User, number>({
        query: (id: number) => `/${id}`,
        providesTags: ['Single-User'],
      }),
      updateUser: builder.mutation({
        query: (updatedUser: User) => ({
          url: `/${updatedUser.id}`,
          method: 'PUT',
          body: { ...updatedUser },
        }),
        invalidatesTags: ['Single-User'],
      }),
      loginUser: builder.mutation<User, LoginData>({
        query: ({ ...credentials }) => ({
          url: `/login`,
          method: 'POST',
          body: credentials,
          headers: authApiHeaders,
        }),
      }),
      //
      registerUser: builder.mutation<User, RegisterData>({
        query: ({ ...credentials }) => ({
          url: `/register`,
          method: 'POST',
          body: credentials,
          headers: authApiHeaders,
        }),
      }),
    };
  },
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} = authApiSlice;
