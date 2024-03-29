import { FC, useState } from 'react';
import {
  IoEyeOff as NotVisibleIcon,
  IoEye as VisibleIcon,
} from 'react-icons/io5';

interface Props {
  label: string;
  placeholder: string;
  labelClasses?: string;
  inputClasses?: string;
  inputProps?: any;
  errors?: string;
}

const InputElement: FC<Props> = ({
  label,
  placeholder,
  labelClasses,
  inputClasses,
  inputProps,
  errors,
}) => {
  const flag = label.includes('lozink');
  const [visible, setVisible] = useState(false);

  return (
    <div className='flex flex-col'>
      <label className={`font-ubuntu text-base font-bold ${labelClasses}`}>
        {label}
      </label>
      <div className='w-full relative'>
        <input
          placeholder={placeholder}
          type={flag && !visible ? 'password' : 'text'}
          className={`w-full p-5 rounded-lg font-raleway ${inputClasses}`}
          {...inputProps}
        />

        {flag && (
          <button
            type='button'
            onClick={() => setVisible(!visible)}
            className={`absolute right-4 top-0 bottom-0 mx-auto my-0 text-md text-lightColor`}
          >
            {visible ? <VisibleIcon /> : <NotVisibleIcon />}
          </button>
        )}
      </div>
      {errors && (
        <p className='text-redColor font-ubuntu w-[300px]'>{errors}</p>
      )}
    </div>
  );
};

export default InputElement;
