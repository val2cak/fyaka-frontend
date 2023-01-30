import TitleBar from '../../../components/TitleBar/TitleBar';
import { IoArrowUndoCircleSharp as ArrowBackIcon } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import MySingleServiceCard from './MySingleServiceCard';

const SingleServiceContainer = () => {
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
      <TitleBar title={'moje usluge'} />

      <button
        onClick={() => navigateTo('/my-services')}
        className='text-lightColor text-3xl m-3 absolute'
      >
        <ArrowBackIcon />
      </button>

      <div className='px-36 py-10'>
        <MySingleServiceCard service={service} />
      </div>
    </main>
  );
};

export default SingleServiceContainer;
