import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { NewService, ServiceProps } from '../../../types/typeDefinitions';

export const servicesApiSlice = createApi({
  reducerPath: 'Services-List-Api-Slice',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/services`,
  }),
  tagTypes: ['Services-List', 'Single-Service'],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 0,
  endpoints(builder) {
    return {
      getServicesList: builder.query<ServiceProps[], number | void>({
        query: (authorId) => (authorId ? `/?authorId=${authorId}` : '/'),
        providesTags: ['Services-List'],
      }),
      getSingleService: builder.query<ServiceProps, number>({
        query: (id: number) => `/${id}`,
        providesTags: ['Single-Service'],
      }),
      createService: builder.mutation({
        query: (newService: NewService) => ({
          url: '',
          method: 'POST',
          body: newService,
        }),
        invalidatesTags: ['Services-List'],
      }),
    };
  },
});

export const {
  useGetServicesListQuery,
  useGetSingleServiceQuery,
  useCreateServiceMutation,
} = servicesApiSlice;
