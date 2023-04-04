import FilterElement from './FilterElement';

const FilterBar = () => {
  return (
    <div className='font-ubuntu uppercase text-lightColor font-bold text-sm flex flex-col border border-darkColor border-opacity-40 rounded-lg'>
      <FilterElement filter={'cijena'} />

      <FilterElement filter={'vrijeme obavljanja'} />

      <FilterElement filter={'ocjena korisnika'} />

      <FilterElement filter={'kategorija'} />

      <FilterElement filter={'lokacija'} />

      <FilterElement filter={'broj osoba'} />
    </div>
  );
};

export default FilterBar;
