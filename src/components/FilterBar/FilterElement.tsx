import { FC, useEffect, useState } from 'react';
import {
  ImPlus as MaximizeIcon,
  ImMinus as MinimizeIcon,
} from 'react-icons/im';
import { Filters } from '../../types/typeDefinitions';
import FilterContent from './FilterContent';

interface Props {
  name: string;
  filters: Filters;
  setFilters: (item: Filters) => void;
  reset: boolean;
}

const FilterElement: FC<Props> = ({ name, filters, setFilters, reset }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [reset]);

  return (
    <div className='flex flex-col items-start justify-start w-full border-b border-darkColor border-opacity-40 p-4 sm:px-4 px-12 last:border-none'>
      <div className='flex flex-row justify-between w-full font-bold sm:text-sm text-base sm:py-0 py-2 gap-3'>
        <h3>{name}</h3>
        <button className='font-bold text-sm' onClick={() => setOpen(!open)}>
          {open ? <MinimizeIcon /> : <MaximizeIcon />}
        </button>
      </div>

      {open && (
        <FilterContent name={name} filters={filters} setFilters={setFilters} />
      )}
    </div>
  );
};

export default FilterElement;
