import { FC } from 'react';
import { Lookup } from '../../types/typeDefinitions';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

interface Props {
  label: string;
  placeholder: string;
  labelClasses?: string;
  handleSelect: (item: Lookup) => void;
  data: Lookup[];
  selectedId: number;
  inputClasses?: string;
  errors?: string;
}

const DropdownElement: FC<Props> = ({
  label,
  placeholder,
  labelClasses,
  handleSelect,
  data,
  selectedId,
  inputClasses,
  errors,
}) => {
  return (
    <div className='flex flex-col'>
      <label className={`font-ubuntu text-base font-bold ${labelClasses}`}>
        {label}
      </label>

      <DropdownMenu
        selectedItem={data.find((item) => item.id === selectedId)}
        onSelect={handleSelect}
        items={data}
        placeholder={placeholder}
        className={inputClasses}
      />

      {errors && (
        <p className='text-redColor font-ubuntu w-[300px]'>{errors}</p>
      )}
    </div>
  );
};

export default DropdownElement;
