import ServiceCard from '../../../components/Card/ServiceCard';
import SearchBar from '../../../components/SearchBar/SearchBar';
import TitleBar from '../../../components/TitleBar/TitleBar';
import { useGetServicesListQuery } from '../../guest/ServicesList/servicesApiSlice';
import { getUserFromStorage } from '../../../services/storage';
import { User } from '../../../types/typeDefinitions';
import { Pagination } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CustomLoader from '../../../components/Loader/CustomLoader';

const ServicesListContainer = () => {
  const userJson: string | null = getUserFromStorage();
  const user: User | null = userJson ? JSON.parse(userJson).user : null;

  const location = useLocation();

  const [currentPage, setCurrentPage] = useState<number>(
    location.state !== null && location.state.currentPage
      ? location.state.currentPage
      : 1
  );

  const searchTerm =
    location.state !== null && location.state.search
      ? location.state.search
      : '';

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (currentPage !== value) {
      setCurrentPage(value);
      refetch();
    }
  };

  const {
    data: servicesListData,
    isFetching: isServicesListDataLoading,
    refetch,
  } = useGetServicesListQuery({
    authorId: user.id,
    page: currentPage,
    pageSize: 8,
    searchTerm: searchTerm,
  });

  const servicesData = servicesListData ? servicesListData.services : [];

  return (
    <main className='bg-secondaryColor h-full w-full flex flex-col'>
      <div className='bg-primaryColor w-full relative mb-16'>
        <div className='pb-5'>
          <TitleBar title={'moje usluge'} />
        </div>

        <div className='w-full lg:pl-36 pl-56 absolute -bottom-8'>
          <SearchBar />
        </div>
      </div>

      {!isServicesListDataLoading ? (
        <div className='flex flex-col lg:px-36 px-56 gap-8 2xl:gap-16 pb-8 2xl:pb-56 justify-between 2xl:items-start min-h-[620px]'>
          <div className='grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5'>
            {servicesData.map((item, index) => (
              <ServiceCard key={index} {...item} currentPage={currentPage} />
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
        <div className='min-h-[620px] flex items-center justify-center'>
          <CustomLoader />
        </div>
      )}
    </main>
  );
};

export default ServicesListContainer;
