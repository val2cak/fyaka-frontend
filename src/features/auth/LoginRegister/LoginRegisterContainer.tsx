import { useLocation } from 'react-router-dom';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const LoginRegisterContainer = () => {
  const location = useLocation();

  return (
    <main className='bg-primaryColor w-screen h-screen'>
      <section className='ellipse !bg-secondaryColor max-h-screen w-screen h-screen'>
        <div className='h-screen w-screen bg-login bg-no-repeat bg-right'>
          <h1 className='flex justify-center font-logo text-lightColor font-semibold text-6xl pt-5'>
            !Fyaka
          </h1>

          {location.pathname === '/auth/login' ? (
            <div className='flex justify-start items-center ml-52 my-20'>
              <LoginForm />
            </div>
          ) : (
            <div className='flex justify-start items-center ml-52 my-8'>
              <RegisterForm />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default LoginRegisterContainer;
