import { Autocomplete, TextField } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { getUserFromStorage } from '../../../services/storage';
import { User } from '../../../types/typeDefinitions';
import { useGetUsersQuery } from '../../auth/authApiSlice';

interface Props {
  inputProps?: any;
  className?: string;
  label?: string;
}

const UsersAutocomplete: FC<Props> = ({ inputProps, className, label }) => {
  let userJson: string | null = getUserFromStorage();
  let user: User = userJson && JSON.parse(userJson).user;

  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: usersData,
    isFetching: isUsersDataLoading,
    refetch,
  } = useGetUsersQuery(searchTerm);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (searchTerm.length >= 3) {
      refetch();
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    if (inputProps?.onChange) {
      inputProps.onChange('');
    }
    refetch();
  };

  useEffect(() => {
    if (inputProps?.defaultValue) setSearchTerm(inputProps?.defaultValue);
  }, []);

  return (
    <div>
      <label className='font-ubuntu text-base font-bold text-primaryColor'>
        {label}
      </label>

      <Autocomplete
        id='users-autocomplete'
        className={`w-full bg-lightColor rounded-lg font-raleway placeholder-primaryColor text-primaryColor autocomplete ${className}`}
        options={
          usersData ? usersData.filter((item) => item.id !== user.id) : []
        }
        defaultValue={inputProps?.defaultValue}
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined'
            onChange={handleSearch}
            placeholder='pronađi korisnika...'
          />
        )}
        getOptionLabel={(option) => `${option.username}`}
        renderOption={(props, option, state) => (
          <li {...props}>{!isUsersDataLoading && <>{option.username}</>}</li>
        )}
        onChange={(event, value) => {
          if (!value || value === undefined || value === null) {
            handleClear();
          } else if (inputProps?.onChange) {
            inputProps.onChange(value);
          }
        }}
      />
    </div>
  );
};

export default UsersAutocomplete;
