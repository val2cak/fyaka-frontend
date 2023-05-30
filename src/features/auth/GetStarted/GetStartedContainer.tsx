import { useNavigate } from 'react-router-dom';

import image from '../../../assets/vectors/get-started.png';
import GoogleLoginComponent from '../LoginRegister/GoogleLoginComponent';

const GetStartedContainer = () => {
  const navigateTo = useNavigate();

  return (
    <main className='ellipse max-h-screen'>
      <h1 className='flex justify-center font-logo text-lightColor font-semibold sm:text-4xl text-6xl pt-5'>
        !Fyaka
      </h1>

      <div className='flex flex-row sm:px-0 lg:px-16 px-5 2xl:py-24 justify-center items-center sm:h-full sm:bg-getStarted sm:bg-no-repeat sm:bg-top-right'>
        <div className='flex flex-col sm:w-full w-1/3 gap-8 justify-center items-center sm:py-8 sm:bg-grayColor sm:bg-opacity-50'>
          <button
            className='button bg-secondaryColor text-lightColor h-[70px]'
            onClick={() => navigateTo('/auth/login')}
          >
            Prijava
          </button>
          <button
            className='button bg-lightColor text-secondaryColor h-[70px]'
            onClick={() => navigateTo('/auth/register')}
          >
            Registracija
          </button>

          <div className='flex flex-row text-lightColor items-center gap-1 pt-8'>
            <hr />
            <p>ili se registriraj s</p>
            <hr />
          </div>

          <GoogleLoginComponent />
        </div>

        <div className='flex justify-center items-center sm:hidden'>
          <img src={image} alt='man' className='2xl:w-[1000px]' />
        </div>
      </div>
    </main>
  );
};

export default GetStartedContainer;
