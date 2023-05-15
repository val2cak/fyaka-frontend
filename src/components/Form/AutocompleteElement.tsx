import { FC } from 'react';

import LocationsAutocomplete from '../Locations/LocationsAutocomplete';

interface Props {
  label: string;
  inputProps?: any;
  inputClasses?: string;
  errors?: string;
}

const AutocompleteElement: FC<Props> = ({
  label,
  inputProps,
  inputClasses,
  errors,
}) => {
  return (
    <div className='flex flex-col'>
      <label className='font-ubuntu text-base font-bold text-primaryColor'>
        {label}
      </label>
      <div className='w-full'>
        <LocationsAutocomplete
          inputProps={inputProps}
          className={inputClasses}
        />

        {errors && (
          <p className='text-redColor font-ubuntu w-[300px]'>{errors}</p>
        )}
      </div>
    </div>
  );
};

export default AutocompleteElement;
