import { FC } from 'react';
import { Filters } from '../../types/typeDefinitions';
import FilterElement from './FilterElement';

interface Props {
  filters: Filters;
  setFilters: (item: Filters) => void;
}

const FilterBar: FC<Props> = ({ filters, setFilters }) => {
  return (
    <div className='font-ubuntu uppercase text-lightColor font-bold text-sm flex flex-col border border-darkColor border-opacity-40 rounded-lg'>
      <FilterElement
        name={'cijena'}
        filters={filters}
        setFilters={setFilters}
      />

      <FilterElement
        name={'vrijeme obavljanja'}
        filters={filters}
        setFilters={setFilters}
      />

      <FilterElement
        name={'ocjena korisnika'}
        filters={filters}
        setFilters={setFilters}
      />

      <FilterElement
        name={'kategorija'}
        filters={filters}
        setFilters={setFilters}
      />

      <FilterElement
        name={'lokacija'}
        filters={filters}
        setFilters={setFilters}
      />

      <FilterElement
        name={'broj osoba'}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default FilterBar;
