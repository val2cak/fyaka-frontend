import { FC } from 'react';
import { Lookup } from '../../types/typeDefinitions';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

interface Props {
  label: string;
  labelClasses?: string;
  handleCategorySelect: (item: Lookup) => void;
  data: Lookup[];
  selectedId: number;
}

const DropdownElement: FC<Props> = ({
  label,
  labelClasses,
  handleCategorySelect,
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
        onSelect={handleCategorySelect}
        items={data}
        placeholder={'kategorija'}
      />
    </div>
  );
};

export default DropdownElement;
