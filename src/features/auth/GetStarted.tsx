import { useNavigate } from 'react-router-dom';
import image from '../../assets/vectors/get-started.png';

const GetStarted = () => {
  const navigateTo = useNavigate();

  return (
    <main className='ellipse max-h-screen'>
      <h1 className='flex justify-center font-logo text-lightColor font-black text-6xl pt-5'>
        !Fyaka
      </h1>

      <div className='flex flex-row'>
        <div className='flex flex-col w-1/3'>
          <button
            className='button bg-secondaryColor text-lightColor'
            onClick={() => navigateTo('/login')}
          >
            Prijava
          </button>
          <button
            className='button bg-lightColor text-secondaryColor'
            onClick={() => navigateTo('/register')}
          >
            Registracija
          </button>

          <div>
            <p>ili se prijavi s</p>
          </div>

          <button className='button bg-white'>Google</button>
          <button className='button bg-[#2D9CDB] text-white'>Facebook</button>
        </div>

        <div>
          <img src={image} alt='man' />
        </div>
      </div>
    </main>
  );
};

export default GetStarted;
