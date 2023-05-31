import { FC, useState } from 'react';
import { Filters } from '../../types/typeDefinitions';
import FilterElement from './FilterElement';

interface Props {
  filters: Filters;
  setFilters: (item: Filters) => void;
}

const FilterBar: FC<Props> = ({ filters, setFilters }) => {
  const [reset, setReset] = useState(false);

  const handleReset = () => {
    setFilters(undefined);
    setReset(!reset);
  };

  return (
    <div className='font-ubuntu uppercase text-lightColor font-bold text-sm flex flex-col border border-darkColor border-opacity-40 rounded-lg h-fit min-w-[320px] sm:max-w-full max-w-[320px]'>
      <FilterElement
        name={'cijena'}
        filters={filters}
        setFilters={setFilters}
        reset={reset}
      />

      <FilterElement
        name={'vrijeme obavljanja'}
        filters={filters}
        setFilters={setFilters}
        reset={reset}
      />

      <FilterElement
        name={'ocjena korisnika'}
        filters={filters}
        setFilters={setFilters}
        reset={reset}
      />

      <FilterElement
        name={'kategorija'}
        filters={filters}
        setFilters={setFilters}
        reset={reset}
      />

      <FilterElement
        name={'lokacija'}
        filters={filters}
        setFilters={setFilters}
        reset={reset}
      />

      <FilterElement
        name={'broj osoba'}
        filters={filters}
        setFilters={setFilters}
        reset={reset}
      />

      <button
        onClick={handleReset}
        disabled={filters ? false : true}
        className='flex flex-col uppercase text-primaryColor items-center justify-start w-full p-4 px-12'
      >
        poništi filtere
      </button>
    </div>
  );
};

export default FilterBar;
