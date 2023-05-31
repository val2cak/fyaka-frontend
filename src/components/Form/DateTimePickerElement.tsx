import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { FC } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface Props {
  label: string;
  labelClasses?: string;
  inputClasses?: string;
  inputProps?: any;
  errors?: string;
}

const DateTimePickerElement: FC<Props> = ({
  label,
  labelClasses,
  inputClasses,
  inputProps,
  errors,
}) => {
  return (
    <div className='flex flex-col'>
      <label className={`font-ubuntu text-base font-bold ${labelClasses}`}>
        {label}
      </label>
      <div className='w-full !flex !items-center'>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            className={`w-full rounded-lg ${inputClasses} date-picker`}
            format='dd.MM.yyyy. HH:mm'
            {...inputProps}
            textField={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      {errors && (
        <p className='text-redColor font-ubuntu w-[300px]'>{errors}</p>
      )}
    </div>
  );
};

export default DateTimePickerElement;
