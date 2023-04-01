import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TextField } from '@mui/material';
import { FC } from 'react';

interface Props {
  label: string;
  labelClasses?: string;
  inputClasses?: string;
  inputProps?: any;
}

const DatePickerElement: FC<Props> = ({
  label,
  labelClasses,
  inputClasses,
  inputProps,
}) => {
  return (
    <div className='flex flex-col'>
      <label className={`font-ubuntu text-base font-bold ${labelClasses}`}>
        {label}
      </label>
      <div className='w-full relative'>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            className={`w-full h-16 p-5 rounded-lg font-raleway ${inputClasses}`}
            format='dd.MM.yyyy. HH:mm'
            {...inputProps}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default DatePickerElement;
