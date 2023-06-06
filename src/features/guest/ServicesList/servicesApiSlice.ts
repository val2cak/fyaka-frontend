import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  Filters,
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
          filters?: Filters;
        }
      >({
        query: ({ authorId, pageSize, page, searchTerm, filters }) => {
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
          if (filters) {
            if (filters.minPrice) {
              queryParams.append('minPrice', filters.minPrice.toString());
            }
            if (filters.maxPrice) {
              queryParams.append('maxPrice', filters.maxPrice.toString());
            }
            if (filters.minDate) {
              queryParams.append('minDate', filters.minDate.toString());
            }
            if (filters.maxDate) {
              queryParams.append('maxDate', filters.maxDate.toString());
            }
            if (filters.categoryId) {
              Array.isArray(filters.categoryId)
                ? filters.categoryId?.map((catId) =>
                    queryParams.append('categoryId', catId.toString())
                  )
                : queryParams.append(
                    'categoryId',
                    filters.categoryId.toString()
                  );
            }
            if (filters.location) {
              queryParams.append('location', filters.location.toString());
            }
            if (filters.people) {
              queryParams.append('people', filters.people.toString());
            }
            if (filters.userRating) {
              queryParams.append('userRating', filters.userRating.toString());
            }
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
