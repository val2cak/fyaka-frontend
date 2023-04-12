import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { WriteReview, ReadReview } from '../../../types/typeDefinitions';

export const reviewsApiSlice = createApi({
  reducerPath: 'Reviews-Api-Slice',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/reviews`,
  }),
  tagTypes: ['Reviews-List'],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 0,
  endpoints(builder) {
    return {
      getReviews: builder.query<ReadReview[], number>({
        query: (userId: number) => ({
          url: `/${userId}`,
        }),
        providesTags: ['Reviews-List'],
      }),
      createReview: builder.mutation({
        query: (review: WriteReview) => ({
          url: '',
          method: 'POST',
          body: review,
        }),
        invalidatesTags: ['Reviews-List'],
      }),
    };
  },
});

export const { useGetReviewsQuery, useCreateReviewMutation } = reviewsApiSlice;
