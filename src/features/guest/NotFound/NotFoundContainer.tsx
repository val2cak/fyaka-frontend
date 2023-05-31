import { useNavigate } from 'react-router-dom';

const NotFoundContainer = () => {
  const navigateTo = useNavigate();

  return (
    <div className='bg-notFound sm:bg-right bg-cover sm:p-4 w-screen h-screen sm:text-xl text-3xl font-ubuntu font-medium flex flex-col justify-start items-center pt-24'>
      <p>Stranica nije pronađena!</p>
      <p>
        Vrati se na{' '}
        <span
          className='text-primaryColor hover:cursor-pointer hover:opacity-80'
          onClick={() => navigateTo('')}
        >
          naslovnu
        </span>
      </p>
    </div>
  );
};

export default NotFoundContainer;
