import { FC } from 'react';

import { Location } from '../../types/typeDefinitions';
import LocationsAutocomplete from '../Locations/LocationsAutocomplete';

interface Props {
  label: string;
  inputProps?: {
    onChange?: (value: any) => void;
    defaultValue?: Location;
  };
  inputClasses?: string;
}

const AutocompleteElement: FC<Props> = ({
  label,
  inputProps,
  inputClasses,
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
      </div>
    </div>
  );
};

export default AutocompleteElement;
