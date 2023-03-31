import ServiceCard from '../../../components/Card/ServiceCard';
import SearchBar from '../../../components/SearchBar/SearchBar';
import TitleBar from '../../../components/TitleBar/TitleBar';
import { useGetServicesListQuery } from '../../guest/ServicesList/servicesApiSlice';
import { getUserFromStorage } from '../../../services/storage';
import { User } from '../../../types/typeDefinitions';
import { Pagination } from '@mui/material';
import { useState } from 'react';

const ServicesListContainer = () => {
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

  const {
    data: servicesListData,
    isFetching: isServicesListDataLoading,
    refetch,
  } = useGetServicesListQuery({
    authorId: user.id,
    page: currentPage,
    pageSize: 8,
  });

  const servicesData = servicesListData?.services;

  return (
    <main className='bg-secondaryColor h-full w-full flex flex-col'>
      <div className='bg-primaryColor w-full relative mb-16'>
        <div className='pb-5'>
          <TitleBar title={'moje usluge'} />
        </div>

        <div className='w-full pl-56 absolute -bottom-8'>
          <SearchBar />
        </div>
      </div>

      <div className='flex flex-col px-56 gap-8 pb-8'>
        {!isServicesListDataLoading && (
          <div className='flex flex-wrap flex-start gap-4 items-center flex-row  w-full'>
            {servicesData.map((item, index) => (
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
        )}

        <Pagination
          count={servicesListData?.totalPages ?? 1}
          size='large'
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </main>
  );
};

export default ServicesListContainer;
