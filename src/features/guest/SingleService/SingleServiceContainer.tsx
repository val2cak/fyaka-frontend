import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoArrowUndoCircleSharp as ArrowBackIcon } from 'react-icons/io5';

import { useGetSingleServiceQuery } from '../ServicesList/servicesApiSlice';
import TitleBar from '../../../components/TitleBar/TitleBar';
import SingleServiceCard from './SingleServiceCard';

const SingleServiceContainer = () => {
  const location = useLocation();

  const flag = location.pathname.includes('/favorites') ? 1 : 0;

  const navigateTo = useNavigate();

  const { id } = useParams();

  const { data: serviceData, isFetching: isServiceDataLoading } =
    useGetSingleServiceQuery(Number(id));

  const handleGoBack = () => {
    flag
      ? navigateTo('/favorites', {
          state: {
            currentPage: location.state && location?.state?.currentPage,
          },
        })
      : navigateTo('/services-list', {
          state: {
            currentPage: location.state && location?.state?.currentPage,
            filters: location.state && location?.state?.filters,
          },
        });
  };

  return (
    <main className='bg-secondaryColor'>
      <TitleBar title={`${flag ? 'favoriti' : 'popis usluga'}`} />

      <button
        onClick={handleGoBack}
        className='text-lightColor text-3xl m-3 absolute transition ease-in-out delay-50 hover:scale-110 duration-300'
      >
        <ArrowBackIcon />
      </button>

      {!isServiceDataLoading && (
        <div className='sm:px-4 px-36 2xl:px-80 sm:pt-[4.25rem] py-10 2xl:py-20'>
          <SingleServiceCard {...serviceData} />
        </div>
      )}
    </main>
  );
};

export default SingleServiceContainer;
