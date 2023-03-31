import ServiceCard from '../../../components/Card/ServiceCard';
import SearchBar from '../../../components/SearchBar/SearchBar';
import TitleBar from '../../../components/TitleBar/TitleBar';
import arrow from '../../../assets/shapes/arrow-right-light.png';
import { useGetServicesListQuery } from '../../guest/ServicesList/servicesApiSlice';
import { getUserFromStorage } from '../../../services/storage';
import { User } from '../../../types/typeDefinitions';

const ServicesListContainer = () => {
  const userJson: string | null = getUserFromStorage();
  const user: User | null = userJson ? JSON.parse(userJson).user : null;

  const { data: servicesListData, isFetching: isServicesListDataLoading } =
    useGetServicesListQuery({ authorId: user.id, page: 1, pageSize: 8 });

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

      {!isServicesListDataLoading && (
        <div className='flex flex-wrap flex-start gap-4 items-center flex-row px-56 w-full'>
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

      <div className='w-full flex justify-center gap-16 p-8'>
        <button className='transition ease-in-out delay-150 hover:-translate-x-4 duration-300'>
          <img
            src={arrow}
            alt='arrow left'
            className='object-fill h-18 w-36 -rotate-180'
          />
        </button>
        <button className='transition ease-in-out delay-150 hover:translate-x-4 duration-300'>
          <img
            src={arrow}
            alt='arrow right'
            className='object-fill h-18 w-36'
          />
        </button>
      </div>
    </main>
  );
};

export default ServicesListContainer;
