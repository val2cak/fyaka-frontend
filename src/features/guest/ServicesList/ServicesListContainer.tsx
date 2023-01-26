import Card from '../../../components/Card/Card';
import FilterBar from '../../../components/FilterBar/FilterBar';
import SearchBar from '../../../components/SearchBar/SearchBar';
import TitleBar from '../../../components/TitleBar/TitleBar';

const ServicesListContainer = () => {
  return (
    <main className='bg-secondaryColor h-full w-full flex flex-col'>
      <div className='bg-primaryColor w-full relative mb-16'>
        <div className='pb-5'>
          <TitleBar title={'popis usluga'} />
        </div>

        <div className='w-full pl-44 absolute -bottom-8'>
          <SearchBar />
        </div>
      </div>

      <div className='flex flex-row pl-44 pr-44 gap-5 pb-8'>
        <FilterBar />
        <Card />
      </div>
    </main>
  );
};

export default ServicesListContainer;
