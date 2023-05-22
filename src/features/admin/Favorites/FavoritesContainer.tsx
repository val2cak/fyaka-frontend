import { useState } from 'react';
import { Pagination } from '@mui/material';

import { User } from '../../../types/typeDefinitions';
import { getUserFromStorage } from '../../../services/storage';
import ServiceCard from '../../../components/Card/ServiceCard';
import SearchBar from '../../../components/SearchBar/SearchBar';
import TitleBar from '../../../components/TitleBar/TitleBar';
import { useGetFavoritesQuery } from './favoritesApiSlice';
import { useLocation } from 'react-router-dom';
import CustomLoader from '../../../components/Loader/CustomLoader';

const FavoritesContainer = () => {
  const userJson: string | null = getUserFromStorage();
  const user: User | null = userJson ? JSON.parse(userJson).user : null;

  const location = useLocation();

  const [currentPage, setCurrentPage] = useState<number>(
    location.state !== null && location.state.currentPage
      ? location.state.currentPage
      : 1
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
    data: favoritesListData,
    isFetching: isFavoritesListDataLoading,
    refetch,
  } = useGetFavoritesQuery({
    userId: user.id,
    page: currentPage,
    pageSize: 8,
    searchTerm: searchTerm,
  });

  const favoritesData = favoritesListData ? favoritesListData.favorites : [];

  return (
    <main className='bg-lightColor h-full w-full flex flex-col'>
      <div className='bg-primaryColor w-full relative sm:mb-12 mb-16'>
        <div className='sm:pb-10 pb-5'>
          <TitleBar title={'favoriti'} />
        </div>

        <div className='w-full sm:pl-4 sm:pr-4 lg:pl-36 pl-56 absolute -bottom-8'>
          <SearchBar />
        </div>
      </div>

      {!isFavoritesListDataLoading ? (
        <div className='flex flex-col sm:px-4 lg:px-36 px-56 gap-8 2xl:gap-16 pb-8 justify-between 2xl:items-start min-h-[620px]'>
          <div className='grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 grid-cols-6 gap-5'>
            {favoritesData.map((item, index) => (
              <ServiceCard
                id={item.service.id}
                key={index}
                author={item.service.author}
                title={item.service.title}
                date={item.service.date}
                price={item.service.price}
                location={item.service.location}
                description={item.service.description}
                people={item.service.people}
                categoryId={item.service.categoryId}
                currentPage={currentPage}
              />
            ))}
          </div>

          <div className='flex justify-start'>
            <Pagination
              count={favoritesListData?.totalPages ?? 1}
              size='large'
              className={'favorites-pagination'}
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

export default FavoritesContainer;
