import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  NewService,
  ServiceProps,
  UpdateService,
} from '../../../types/typeDefinitions';

interface ServicesData {
  services: ServiceProps[];
  totalPages: number;
}

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
      getServicesList: builder.query<
        ServicesData,
        {
          authorId?: number;
          pageSize?: number;
          page?: number;
          searchTerm?: string;
        }
      >({
        query: ({ authorId, pageSize, page, searchTerm }) => {
          let url = '/';
          if (authorId) {
            url += `?authorId=${authorId}`;
          }
          if (searchTerm) {
            const encodedSearchTerm = encodeURIComponent(
              searchTerm.replace(/ /g, '%20')
            );
            url += url.includes('?')
              ? `&searchTerm=${encodedSearchTerm}`
              : `?searchTerm=${encodedSearchTerm}`;
          }
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
      updateService: builder.mutation({
        query: (updatedService: UpdateService) => ({
          url: `/${updatedService.id}`,
          method: 'PUT',
          body: { ...updatedService },
        }),
        invalidatesTags: ['Services-List'],
      }),
      deleteService: builder.mutation({
        query: (id: number) => ({
          url: `/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Services-List'],
      }),
    };
  },
});

export const {
  useGetServicesListQuery,
  useLazyGetServicesListQuery,
  useGetSingleServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApiSlice;
