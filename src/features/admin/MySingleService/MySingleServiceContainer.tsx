import { IoArrowUndoCircleSharp as ArrowBackIcon } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';

import TitleBar from '../../../components/TitleBar/TitleBar';
import { useGetSingleServiceQuery } from '../../guest/ServicesList/servicesApiSlice';
import MySingleServiceForm from './MySingleServiceForm';

const SingleServiceContainer = () => {
  const navigateTo = useNavigate();

  const { id } = useParams();

  const { data: serviceData, isFetching: isServiceDataLoading } =
    useGetSingleServiceQuery(Number(id));

  return (
    <main className='bg-lightColor'>
      <TitleBar title={'moje usluge'} />

      <button
        onClick={() => navigateTo(-1)}
        className='text-secondaryColor text-3xl m-3 absolute transition ease-in-out delay-50 hover:scale-110 duration-300'
      >
        <ArrowBackIcon />
      </button>

      {!isServiceDataLoading && (
        <div className='px-28 py-10'>
          <MySingleServiceForm {...serviceData} />
        </div>
      )}
    </main>
  );
};

export default SingleServiceContainer;
