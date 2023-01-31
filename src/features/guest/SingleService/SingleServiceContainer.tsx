import TitleBar from '../../../components/TitleBar/TitleBar';
import SingleServiceCard from './SingleServiceCard';
import { IoArrowUndoCircleSharp as ArrowBackIcon } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';

const SingleServiceContainer = () => {
  const location = useLocation();

  const flag = location.pathname.includes('/favorites') ? 1 : 0;

  const navigateTo = useNavigate();

  const service = {
    author: 'marinamatic21',
    title: 'Sastavit namještaj',
    category: 'Stolarija',
    description:
      'Triba mi neko da mi sastavi spavacu garnituru (ormar, krevet, komoda). Tribalo bi ponit svoj alat i volila bi da to bude sto prije napravljeno. Placam 30 eura bez obzira na brzinu sastavljanja',
    location: 'Brda, Split',
    price: '30 €',
    date: '22.04.2022. 12:00 h',
    people: 1,
  };

  return (
    <main className='bg-secondaryColor'>
      <TitleBar title={`${flag ? 'favoriti' : 'popis usluga'}`} />

      <button
        onClick={() => navigateTo(-1)}
        className='text-lightColor text-3xl m-3 absolute transition ease-in-out delay-50 hover:scale-110 duration-300'
      >
        <ArrowBackIcon />
      </button>

      <div className='px-36 py-10'>
        <SingleServiceCard service={service} />
      </div>
    </main>
  );
};

export default SingleServiceContainer;
