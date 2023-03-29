import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ServiceProps } from '../../../types/typeDefinitions';

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
      getServicesList: builder.query<ServiceProps[], void>({
        query: () => `/`,
        providesTags: ['Services-List'],
      }),
      getSingleService: builder.query<ServiceProps, number>({
        query: (id: number) => `/${id}`,
        providesTags: ['Single-Service'],
      }),
    };
  },
});

export const { useGetServicesListQuery, useGetSingleServiceQuery } =
  servicesApiSlice;
