import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import InputElement from '../../../components/Form/InputElement';
import { useRegisterUserMutation } from '../authApiSlice';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigateTo = useNavigate();

  const [
    registerUser,
    {
      data: userAuthData,
      isError: isUserRegisterError,
      isLoading: isUserRegisterLoading,
    },
  ] = useRegisterUserMutation();

  const handleFormInputChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      switch (name) {
        case 'email':
          setEmail(event.target.value);
          break;
        case 'username':
          setUsername(event.target.value);
          break;
        case 'password':
          setPassword(event.target.value);
          break;
        default:
          return '';
      }
    };

  const handleFormSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      registerUser({
        email: email,
        username: username,
        password: password,
      }).unwrap();

      if (!isUserRegisterError && !isUserRegisterLoading)
        navigateTo('/auth/login');
    } catch (error: any) {
      console.log(error.data.message);
    }
  };

  return (
    <div className='bg-lightColor bg-opacity-80 rounded-lg px-20 py-8 flex flex-col gap-4'>
      <h1 className='flex justify-center items-center font-ubuntu text-secondaryColor font-bold text-3xl'>
        Registracija
      </h1>

      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-4'>
          <InputElement
            label={'email'}
            placeholder={'yourmail@mail.com'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              'placeholder-lightColor placeholder:opacity-50 text-lightColor bg-primaryColor'
            }
            inputProps={{
              value: email,
              onChange: handleFormInputChange('email'),
            }}
          />

          <InputElement
            label={'korisničko ime'}
            placeholder={'username'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              'placeholder-lightColor placeholder:opacity-50 text-lightColor bg-primaryColor'
            }
            inputProps={{
              value: username,
              onChange: handleFormInputChange('username'),
            }}
          />

          <InputElement
            label={'lozinka'}
            placeholder={'*********'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              'placeholder-lightColor placeholder:opacity-50 text-lightColor bg-primaryColor'
            }
            inputProps={{
              value: password,
              onChange: handleFormInputChange('password'),
            }}
          />

          <InputElement
            label={'ponovi lozinku'}
            placeholder={'*********'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              'placeholder-lightColor placeholder:opacity-50 text-lightColor bg-primaryColor'
            }
          />
        </div>

        <div>
          <button
            onClick={handleFormSubmit}
            className='button bg-secondaryColor text-lightColor !py-4'
          >
            registriraj se
          </button>
          <div className='flex gap-1 font-ubuntu text-base font-bold text-secondaryColor'>
            Već imaš račun?
            <NavLink to={'/auth/login'} className='text-primaryColor'>
              Prijavi se
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
