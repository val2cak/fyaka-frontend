import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Favorite, NewFavorite } from '../../../types/typeDefinitions';

export const favoritesApiSlice = createApi({
  reducerPath: 'Favorites-Api-Slice',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/favorites`,
  }),
  tagTypes: ['Favorites-List'],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 0,
  endpoints(builder) {
    return {
      getFavorites: builder.query<Favorite[], number>({
        query: (userId: number) => ({
          url: `/${userId}`,
        }),
        providesTags: ['Favorites-List'],
      }),
      getSingleFavorite: builder.query<Favorite | null, NewFavorite>({
        query: (favorite: NewFavorite) => ({
          url: `/${favorite.userId}/${favorite.serviceId}`,
        }),
        providesTags: ['Favorites-List'],
      }),
      addFavorite: builder.mutation({
        query: (favorite: NewFavorite) => ({
          url: '',
          method: 'POST',
          body: favorite,
        }),
        invalidatesTags: ['Favorites-List'],
      }),
      removeFavorite: builder.mutation({
        query: (favorite: NewFavorite) => ({
          url: '',
          method: 'DELETE',
          body: favorite,
        }),
        invalidatesTags: ['Favorites-List'],
      }),
    };
  },
});

export const {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetSingleFavoriteQuery,
} = favoritesApiSlice;
