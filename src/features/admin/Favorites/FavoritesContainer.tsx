import { useState } from 'react';
import { Pagination } from '@mui/material';

import { User } from '../../../types/typeDefinitions';
import { getUserFromStorage } from '../../../services/storage';
import ServiceCard from '../../../components/Card/ServiceCard';
import SearchBar from '../../../components/SearchBar/SearchBar';
import TitleBar from '../../../components/TitleBar/TitleBar';
import { useGetFavoritesQuery } from './favoritesApiSlice';
import { useLocation } from 'react-router-dom';

const FavoritesContainer = () => {
  const userJson: string | null = getUserFromStorage();
  const user: User | null = userJson ? JSON.parse(userJson).user : null;

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
    data: favoritesListData,
    isFetching: isFavoritesListDataLoading,
    refetch,
  } = useGetFavoritesQuery({
    userId: user.id,
    page: currentPage,
    pageSize: 8,
    searchTerm: searchTerm,
  });

  const favoritesData = favoritesListData?.favorites;

  return (
    <main className='bg-lightColor h-full w-full flex flex-col'>
      <div className='bg-primaryColor w-full relative mb-16'>
        <div className='pb-5'>
          <TitleBar title={'favoriti'} />
        </div>

        <div className='w-full pl-56 absolute -bottom-8'>
          <SearchBar />
        </div>
      </div>

      <div className='flex flex-col px-56 gap-8 pb-8'>
        {!isFavoritesListDataLoading && (
          <div className='flex flex-wrap flex-start gap-4 items-center flex-row  w-full'>
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
              />
            ))}
          </div>
        )}
        <Pagination
          count={favoritesListData?.totalPages ?? 1}
          size='large'
          className={'favorites-pagination'}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </main>
  );
};

export default FavoritesContainer;
