import { IoArrowUndoCircleSharp as ArrowBackIcon } from 'react-icons/io5';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import TitleBar from '../../../components/TitleBar/TitleBar';
import { useGetSingleServiceQuery } from '../../guest/ServicesList/servicesApiSlice';
import MySingleServiceForm from './MySingleServiceForm';

const MySingleServiceContainer = () => {
  const navigateTo = useNavigate();

  const { id } = useParams();

  const { data: serviceData, isFetching: isServiceDataLoading } =
    useGetSingleServiceQuery(Number(id));

  const location = useLocation();

  const handleGoBack = () => {
    location.state && location.state !== null && location.state?.currentPage
      ? navigateTo('/my-services', {
          state: { currentPage: location?.state?.currentPage },
        })
      : navigateTo(-1);
  };

  return (
    <main className='bg-lightColor'>
      <TitleBar title={'moje usluge'} />

      <button
        onClick={handleGoBack}
        className='text-secondaryColor text-3xl m-3 absolute transition ease-in-out delay-50 hover:scale-110 duration-300'
      >
        <ArrowBackIcon />
      </button>

      {!isServiceDataLoading && (
        <div className='sm:px-4 px-28 2xl:px-56 sm:py-[4.25rem] py-10 2xl:py-20'>
          <MySingleServiceForm {...serviceData} />
        </div>
      )}
    </main>
  );
};

export default MySingleServiceContainer;
