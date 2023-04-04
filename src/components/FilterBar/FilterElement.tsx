import { FC, useState } from 'react';
import {
  ImPlus as MaximizeIcon,
  ImMinus as MinimizeIcon,
} from 'react-icons/im';
import FilterContent from './FilterContent';

interface Props {
  filter: string;
}

const FilterElement: FC<Props> = ({ filter }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='flex flex-col items-start justify-start w-full border-b border-darkColor border-opacity-40 p-4 px-12 last:border-none'>
      <div className='flex flex-row justify-between w-full font-bold text-base py-2 gap-3'>
        <h3>{filter}</h3>
        <button className='font-bold text-sm' onClick={() => setOpen(!open)}>
          {open ? <MinimizeIcon /> : <MaximizeIcon />}
        </button>
      </div>

      {open && <FilterContent filter={filter} />}
    </div>
  );
};

export default FilterElement;
