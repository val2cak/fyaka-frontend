import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  Favorite,
  FavoriteProps,
  NewFavorite,
} from '../../../types/typeDefinitions';

interface FavoritesData {
  favorites: FavoriteProps[];
  totalPages: number;
}

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
      getFavorites: builder.query<
        FavoritesData,
        { userId: number; pageSize?: number; page?: number }
      >({
        query: ({ userId, pageSize, page }) => {
          let url = `/${userId}`;
          if (pageSize) {
            url += url.includes('?')
              ? `&pageSize=${pageSize}`
              : `?pageSize=${pageSize}`;
          }
          if (page) {
            url += url.includes('?') ? `&page=${page}` : `?page=${page}`;
          }
          return url;
        },
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
