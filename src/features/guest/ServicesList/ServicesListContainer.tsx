import { Fragment, useState } from 'react';
import { Pagination } from '@mui/material';

import ServiceCard from '../../../components/Card/ServiceCard';
import FilterBar from '../../../components/FilterBar/FilterBar';
import SearchBar from '../../../components/SearchBar/SearchBar';
import TitleBar from '../../../components/TitleBar/TitleBar';
import { useGetServicesListQuery } from './servicesApiSlice';
import { useLocation } from 'react-router-dom';

const ServicesListContainer = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    refetch();
  };

  const searchTerm = useLocation().state;

  const {
    data: servicesListData,
    isFetching: isServicesListDataLoading,
    refetch,
  } = useGetServicesListQuery({
    page: currentPage,
    pageSize: 9,
    searchTerm: searchTerm,
  });

  const servicesData = servicesListData ? servicesListData.services : [];

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
          <div className='flex flex-col justify-start gap-8 w-3/4'>
            <div className='flex flex-wrap flex-start gap-5'>
              {servicesData.map((item, index) => (
                <ServiceCard key={index} {...item} />
              ))}
            </div>

            <div className='flex justify-start'>
              <Pagination
                count={servicesListData?.totalPages ?? 1}
                size='large'
                page={currentPage}
                onChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ServicesListContainer;
