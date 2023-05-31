import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { RiFilter2Line as FilterIcon } from 'react-icons/ri';

import { useGetServicesListQuery } from './servicesApiSlice';
import ServiceCard from '../../../components/Card/ServiceCard';
import FilterBar from '../../../components/FilterBar/FilterBar';
import SearchBar from '../../../components/SearchBar/SearchBar';
import TitleBar from '../../../components/TitleBar/TitleBar';
import CustomLoader from '../../../components/Loader/CustomLoader';
import { Filters } from '../../../types/typeDefinitions';

const ServicesListContainer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const location = useLocation();

  const [currentPage, setCurrentPage] = useState<number>(
    location.state !== null && location.state.currentPage
      ? location.state.currentPage
      : 1
  );
  const [filters, setFilters] = useState<Filters>(
    location.state !== null && location.state.filters
      ? location.state.filters
      : undefined
  );

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
      <div className='bg-primaryColor w-full relative sm:mb-12 mb-16'>
        <div className='sm:pb-10 pb-5'>
          <TitleBar title={'popis usluga'} />
        </div>

        <div className='w-full sm:pl-4 sm:pr-4 pl-40 absolute -bottom-8'>
          <SearchBar />
        </div>
      </div>

      <div className='flex flex-row sm:flex-col h-full justify-between 2xl:justify-start sm:px-4 lg:px-24 px-40 sm:gap-4 gap-8 pb-8 w-full'>
        <Fragment>
          {isMobile && (
            <button
              onClick={() => setShowFilters(!showFilters)}
              className='flex justify-start items-center px-3 gap-2 font-bold text-lightColor uppercase'
            >
              {isMobile && <FilterIcon />}
              {showFilters ? 'sakrij filtere' : 'prikaži filtere'}
            </button>
          )}
          <div className={isMobile ? (showFilters ? '' : 'hidden') : ''}>
            <FilterBar filters={filters} setFilters={setFilters} />
          </div>
        </Fragment>

        {!isServicesListDataLoading ? (
          <div className='flex flex-col gap-8 justify-between min-h-[592px]'>
            <div className='grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-cols-5 gap-5'>
              {servicesData.map((item, index) => (
                <ServiceCard
                  key={index}
                  {...item}
                  currentPage={currentPage}
                  filters={filters}
                />
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
