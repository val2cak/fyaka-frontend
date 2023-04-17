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
}

const DropdownElement: FC<Props> = ({
  label,
  placeholder,
  labelClasses,
  handleSelect,
  data,
  selectedId,
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
      />
    </div>
  );
};

export default DropdownElement;
