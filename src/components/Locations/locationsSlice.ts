import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Locations } from '../../types/typeDefinitions';

const USERNAME = process.env.REACT_APP_GEONAMES_USERNAME;

export const locationsApiSlice = createApi({
  reducerPath: 'Locations-Api-Slice',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/geonames`,
  }),
  tagTypes: ['Locations-List'],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 0,
  endpoints(builder) {
    return {
      getLocations: builder.query<Locations, string>({
        query: (searchTerm: string) =>
          `/searchJSON?q=${searchTerm}&country=HR&featureClass=P&maxRows=20&type=json&username=${USERNAME}`,
        providesTags: ['Locations-List'],
      }),
    };
  },
});

export const { useGetLocationsQuery } = locationsApiSlice;
