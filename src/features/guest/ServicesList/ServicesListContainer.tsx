import { Fragment } from 'react';
import { Pagination } from '@mui/material';

import ServiceCard from '../../../components/Card/ServiceCard';
import FilterBar from '../../../components/FilterBar/FilterBar';
import SearchBar from '../../../components/SearchBar/SearchBar';
import TitleBar from '../../../components/TitleBar/TitleBar';
import { useGetServicesListQuery } from './servicesApiSlice';

const ServicesListContainer = () => {
  const { data: servicesListData, isFetching: isServicesListDataLoading } =
    useGetServicesListQuery();

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

        {!isServicesListDataLoading && (
          <div className='flex flex-col justify-between w-3/4'>
            <div className='flex flex-wrap flex-start gap-4'>
              {servicesListData.map((item, index) => (
                <ServiceCard
                  id={item.id}
                  key={index}
                  author={item.author}
                  title={item.title}
                  date={item.date}
                  price={item.price}
                  location={item.location}
                  description={item.description}
                  people={item.people}
                />
              ))}
            </div>
            <Pagination count={10} size='large' />
          </div>
        )}
      </div>
    </main>
  );
};

export default ServicesListContainer;
