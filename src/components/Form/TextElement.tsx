import { FC } from 'react';

interface Props {
  label: string;
  placeholder: string;
  value?: string | number;
  labelClasses?: string;
  textClasses?: string;
  textProps?: any;
  errors?: string;
}

const TextElement: FC<Props> = ({
  label,
  placeholder,
  value,
  labelClasses,
  textClasses,
  textProps,
  errors,
}) => {
  return (
    <div className='flex flex-col'>
      <label className={`font-ubuntu text-base font-bold ${labelClasses}`}>
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        className={`p-5 rounded-lg font-raleway ${textClasses}`}
        {...textProps}
      />
      {errors && (
        <p className='text-redColor font-ubuntu w-[300px]'>{errors}</p>
      )}
    </div>
  );
};

export default TextElement;
