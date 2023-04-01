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
        {
          userId: number;
          pageSize?: number;
          page?: number;
          searchTerm?: string;
        }
      >({
        query: ({ userId, pageSize, page, searchTerm }) => {
          const queryParams = new URLSearchParams();
          if (searchTerm) {
            queryParams.append('searchTerm', encodeURI(searchTerm));
          }
          if (pageSize) {
            queryParams.append('pageSize', pageSize.toString());
          }
          if (page) {
            queryParams.append('page', page.toString());
          }
          const queryString = queryParams.toString();
          const encodedQueryString = queryString ? queryString : '';
          return encodedQueryString
            ? `/${userId}?${encodedQueryString}`
            : `/${userId}`;
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
