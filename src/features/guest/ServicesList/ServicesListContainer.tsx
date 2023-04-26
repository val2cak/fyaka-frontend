import { Fragment, useState } from 'react';
import { Pagination } from '@mui/material';

import ServiceCard from '../../../components/Card/ServiceCard';
import FilterBar from '../../../components/FilterBar/FilterBar';
import SearchBar from '../../../components/SearchBar/SearchBar';
import TitleBar from '../../../components/TitleBar/TitleBar';
import { useGetServicesListQuery } from './servicesApiSlice';
import { useLocation } from 'react-router-dom';
import { Filters } from '../../../types/typeDefinitions';
import CustomLoader from '../../../components/Loader/CustomLoader';

const ServicesListContainer = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState<Filters>();

  const location = useLocation();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (currentPage !== value) {
      setCurrentPage(value);
      refetch();
    }
  };

  const searchTerm =
    location.state !== null && location.state.search
      ? location.state.search
      : '';

  const {
    data: servicesListData,
    isFetching: isServicesListDataLoading,
    refetch,
  } = useGetServicesListQuery({
    page: currentPage,
    pageSize: 6,
    searchTerm: searchTerm,
    filters: filters,
  });

  const servicesData = servicesListData ? servicesListData.services : [];

  return (
    <main className='bg-secondaryColor h-full w-full flex flex-col'>
      <div className='bg-primaryColor w-full relative mb-16'>
        <div className='pb-5'>
          <TitleBar title={'popis usluga'} />
        </div>

        <div className='w-full pl-40 absolute -bottom-8'>
          <SearchBar />
        </div>
      </div>

      <div className='flex flex-row h-full px-40 gap-8 pb-8 w-full'>
        <Fragment>
          <FilterBar filters={filters} setFilters={setFilters} />
        </Fragment>

        {!isServicesListDataLoading ? (
          <div className='flex flex-col gap-8 w-3/4 justify-between min-h-[592px]'>
            <div className='flex flex-wrap gap-5'>
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
        ) : (
          <div className='w-3/4 min-h-[592px] flex items-center justify-center'>
            <CustomLoader />
          </div>
        )}
      </div>
    </main>
  );
};

export default ServicesListContainer;
