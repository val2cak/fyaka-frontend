import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const location = useLocation();

  const navigateTo = useNavigate();

  const flag = location.pathname === '/favorites' ? 1 : 0;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    if (location.pathname === '/' || location.pathname === '/services-list')
      navigateTo('/services-list', { state: searchTerm });
    else if (location.pathname === '/my-services')
      navigateTo('/my-services', { state: searchTerm });
    else if (location.pathname === '/favorites')
      navigateTo('/favorites', { state: searchTerm });
  };

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
        onChange={handleInputChange}
        defaultValue={location.state}
        onKeyDown={(event) => (event.key === 'Enter' ? handleSearch() : '')}
      />
      <button onClick={handleSearch} className='absolute text-lg right-5'>
        <AiOutlineSearch
          className={`${flag ? 'text-lightColor' : 'text-darkColor'}`}
        />
      </button>
    </div>
  );
};

export default SearchBar;
