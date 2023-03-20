import { FC, useState } from 'react';
import {
  IoEyeOff as NotVisibleIcon,
  IoEye as VisibleIcon,
} from 'react-icons/io5';

interface Props {
  label: string;
  placeholder: string;
  value?: string | number;
  labelClasses?: string;
  inputClasses?: string;
  inputProps?: any;
}

const InputElement: FC<Props> = ({
  label,
  placeholder,
  value,
  labelClasses,
  inputClasses,
  inputProps,
}) => {
  const flag = label === 'lozinka' || label === 'ponovi lozinku';
  const [visible, setVisible] = useState(false);

  return (
    <div className='flex flex-col'>
      <label className={`font-ubuntu text-base font-bold ${labelClasses}`}>
        {label}
      </label>
      <div className='w-full relative'>
        <input
          placeholder={placeholder}
          value={value}
          type={flag && !visible ? 'password' : 'text'}
          className={`w-full h-full p-5 rounded-lg font-raleway ${inputClasses}`}
          {...inputProps}
        />
        {flag && (
          <button
            onClick={() => setVisible(!visible)}
            className='absolute right-4 top-0 bottom-0 mx-auto my-0 text-lightColor text-md'
          >
            {visible ? <VisibleIcon /> : <NotVisibleIcon />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputElement;
