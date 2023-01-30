import { AiOutlineSearch } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const location = useLocation();

  const flag = location.pathname === '/favorites' ? 1 : 0;

  return (
    <div
      className={`flex flex-row w-[700px] ${
        flag ? 'border border-darkColor' : ''
      } bg-lightColor rounded-lg justify-between items-center relative`}
    >
      <input
        placeholder='pretraži poslove, lokacije, ...'
        className='bg-transparent font-raleway w-full p-5 text-base rounded-lg placeholder-darkColor text-darkColor'
      />
      <button className='absolute text-lg right-5'>
        <AiOutlineSearch className='text-darkColor' />
      </button>
    </div>
  );
};

export default SearchBar;
