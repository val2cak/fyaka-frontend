import { Autocomplete, TextField } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useGetLocationsQuery } from './locationsSlice';

interface Props {
  inputProps?: any;
}

const LocationsAutocomplete: FC<Props> = ({ inputProps }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: locationsData,
    isFetching: isLocationsDataLoading,
    refetch,
  } = useGetLocationsQuery(searchTerm);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (searchTerm.length >= 3) {
      refetch();
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    refetch();
  };

  useEffect(() => {
    if (inputProps?.defaultValue)
      setSearchTerm(
        `${inputProps.defaultValue.name}, ${inputProps.defaultValue.adminName1}`
      );
  }, [inputProps.defaultValue]);

  return (
    <Autocomplete
      id='croatia-areas-autocomplete'
      className='w-full bg-lightColor rounded-lg font-raleway placeholder-primaryColor text-primaryColor autocomplete'
      options={locationsData?.geonames ?? []}
      defaultValue={inputProps?.defaultValue}
      renderInput={(params) => (
        <TextField
          {...params}
          variant='outlined'
          onChange={handleSearch}
          placeholder='upiši lokaciju...'
        />
      )}
      getOptionLabel={(option) => `${option.name}, ${option.adminName1}`}
      renderOption={(props, option, state) => (
        <li {...props}>
          {!isLocationsDataLoading && (
            <>
              {option.name}, {option.adminName1}
            </>
          )}
        </li>
      )}
      clearOnEscape
      onChange={(event, value) => {
        if (!value) {
          handleClear();
        }
        if (inputProps) {
          inputProps.onChange(`${value.name}, ${value.adminName1}`);
        }
      }}
    />
  );
};

export default LocationsAutocomplete;
