import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = () => {
  return (
    <div className='flex flex-row w-[700px] bg-lightColor rounded-lg justify-between items-center relative'>
      <input
        placeholder='pretraži poslove, lokacije, ...'
        className='bg-transparent font-raleway text-darkColor w-full p-5 text-base rounded-lg placeholder-darkColor'
      />
      <button className='absolute text-lg right-5'>
        <AiOutlineSearch />
      </button>
    </div>
  );
};

export default SearchBar;
