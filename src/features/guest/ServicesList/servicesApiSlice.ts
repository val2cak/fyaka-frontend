import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  Lookup,
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
          const queryParams = new URLSearchParams();
          if (authorId) {
            queryParams.append('authorId', authorId.toString());
          }
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
          return encodedQueryString ? `/?${encodedQueryString}` : '/';
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
      getCategories: builder.query<Lookup[], void>({
        query: () => `${process.env.REACT_APP_BASE_URL}/categories`,
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
  useGetCategoriesQuery,
} = servicesApiSlice;
