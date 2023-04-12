import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { WriteReview, ReadReview } from '../../../types/typeDefinitions';

interface ReviewsData {
  reviews: ReadReview[];
  totalPages: number;
}

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
      getReviews: builder.query<
        ReviewsData,
        {
          userId: number;
          pageSize?: number;
          page?: number;
        }
      >({
        query: ({ userId, page, pageSize }) => {
          const queryParams = new URLSearchParams();
          if (pageSize) {
            queryParams.append('pageSize', pageSize.toString());
          }
          if (page) {
            queryParams.append('page', page.toString());
          }
          const queryString = queryParams.toString();
          return `/${userId}?${queryString}`;
        },
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
