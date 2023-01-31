import { AiOutlineSearch } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const location = useLocation();

  const flag = location.pathname === '/favorites' ? 1 : 0;

  return (
    <div
      className={`flex flex-row w-[700px] ${
        flag
          ? 'bg-secondaryColor text-lightColor'
          : 'bg-lightColor shadow-lightGrayColor'
      }  rounded-lg justify-between items-center relative`}
    >
      <input
        placeholder='pretraži poslove, lokacije, ...'
        className={`bg-transparent font-raleway w-full p-5 text-base rounded-lg ${
          flag
            ? 'placeholder-lightColor text-lightColor'
            : 'placeholder-darkColor text-darkColor'
        }`}
      />
      <button className='absolute text-lg right-5'>
        <AiOutlineSearch
          className={`${flag ? 'text-lightColor' : 'text-darkColor'}`}
        />
      </button>
    </div>
  );
};

export default SearchBar;
