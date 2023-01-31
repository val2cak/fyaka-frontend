import { useNavigate } from 'react-router-dom';
import image from '../../../assets/vectors/get-started.png';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const GetStartedContainer = () => {
  const navigateTo = useNavigate();

  return (
    <main className='ellipse max-h-screen'>
      <h1 className='flex justify-center font-logo text-lightColor font-semibold text-6xl pt-5'>
        !Fyaka
      </h1>

      <div className='flex flex-row px-5 justify-center items-center'>
        <div className='flex flex-col w-1/3 gap-8 justify-center items-center'>
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

          <div className='flex flex-row text-lightColor items-center gap-2 pt-8'>
            <hr />
            <p>ili se prijavi s</p>
            <hr />
          </div>

          <button className='button bg-white h-[50px] gap-4 relative'>
            <FcGoogle className='absolute left-5' />
            Google
          </button>
          <button className='button bg-[#2D9CDB] text-white h-[50px] gap-4 relative'>
            <FaFacebook className='absolute left-5' /> Facebook
          </button>
        </div>

        <div className='flex justify-center items-center'>
          <img src={image} alt='man' className='' />
        </div>
      </div>
    </main>
  );
};

export default GetStartedContainer;
