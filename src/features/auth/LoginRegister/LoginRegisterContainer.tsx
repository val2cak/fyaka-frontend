import { useLocation } from 'react-router-dom';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const LoginRegisterContainer = () => {
  const location = useLocation();

  return (
    <main className='bg-primaryColor w-screen h-screen'>
      <section className='ellipse !bg-secondaryColor max-h-screen w-screen h-screen'>
        <div className='h-screen w-screen bg-login bg-no-repeat sm:bg-center bg-right'>
          <h1 className='flex justify-center font-logo text-lightColor font-semibold sm:text-4xl text-6xl pt-5'>
            !Fyaka
          </h1>

          <div className='flex justify-start 2xl:justify-center items-center sm:ml-0 lg:ml-32 ml-52 2xl:ml-0 sm:my-4 lg:my-16 my-20 2xl:my-40'>
            {location.pathname === '/auth/login' ? (
              <LoginForm />
            ) : (
              <RegisterForm />
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginRegisterContainer;
