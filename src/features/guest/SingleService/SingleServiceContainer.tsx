import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoArrowUndoCircleSharp as ArrowBackIcon } from 'react-icons/io5';

import TitleBar from '../../../components/TitleBar/TitleBar';
import SingleServiceCard from './SingleServiceCard';
import { useGetSingleServiceQuery } from '../ServicesList/servicesApiSlice';

const SingleServiceContainer = () => {
  const locationPathname = useLocation().pathname;

  const flag = locationPathname.includes('/favorites') ? 1 : 0;

  const navigateTo = useNavigate();

  const { id } = useParams();

  const { data: serviceData, isFetching: isServiceDataLoading } =
    useGetSingleServiceQuery(Number(id));

  return (
    <main className='bg-secondaryColor'>
      <TitleBar title={`${flag ? 'favoriti' : 'popis usluga'}`} />

      <button
        onClick={() => navigateTo(-1)}
        className='text-lightColor text-3xl m-3 absolute transition ease-in-out delay-50 hover:scale-110 duration-300'
      >
        <ArrowBackIcon />
      </button>

      {!isServiceDataLoading && (
        <div className='px-36 py-10'>
          <SingleServiceCard {...serviceData} />
        </div>
      )}
    </main>
  );
};

export default SingleServiceContainer;
