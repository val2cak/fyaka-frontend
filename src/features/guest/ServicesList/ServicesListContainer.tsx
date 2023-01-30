import { Pagination } from '@mui/material';
import { Fragment } from 'react';
import ServiceCard from '../../../components/Card/ServiceCard';
import FilterBar from '../../../components/FilterBar/FilterBar';
import SearchBar from '../../../components/SearchBar/SearchBar';
import TitleBar from '../../../components/TitleBar/TitleBar';

const ServicesListContainer = () => {
  const Cards = [
    {
      author: 'marko5ovic',
      title: 'Prošetat pasa',
      date: '31.04.2022. 18:00 h',
      price: '20 €',
      location: 'Pujanke, Split',
    },
    {
      author: 'ivanaa',
      title: 'Krečenje soba',
      date: '19.04.2022. 09:00 h',
      price: '50 €',
      location: 'Japirko, Solin',
    },
    {
      author: 'tosamjaante',
      title: 'Odvoz šuta',
      date: '11.05.2022. 13:00 h',
      price: '100 €',
      location: 'Kman, Split',
    },
    {
      author: 'marinamatic21',
      title: 'Sastavit namještaj',
      date: '22.04.2022. 12:00 h',
      price: '30 €',
      location: 'Brda, Split',
    },
    {
      author: 'marko5ovic',
      title: 'Prošetat pasa',
      date: '31.04.2022. 18:00 h',
      price: '20 €',
      location: 'Pujanke, Split',
    },
    {
      author: 'ivanaa',
      title: 'Krečenje soba',
      date: '19.04.2022. 09:00 h',
      price: '50 €',
      location: 'Japirko, Solin',
    },
  ];
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

      <div className='flex flex-row px-44 gap-5 pb-8 w-full'>
        <Fragment>
          <FilterBar />
        </Fragment>

        <div className='flex flex-wrap justify-between w-3/4'>
          {Cards.map((item, index) => (
            <ServiceCard
              key={index}
              author={item.author}
              title={item.title}
              date={item.date}
              price={item.price}
              location={item.location}
            />
          ))}
          <Pagination count={10} size='large' />
        </div>
      </div>
    </main>
  );
};

export default ServicesListContainer;
