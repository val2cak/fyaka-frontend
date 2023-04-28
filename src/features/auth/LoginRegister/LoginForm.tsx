import { useCallback, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../app/hooks';
import InputElement from '../../../components/Form/InputElement';
import useNotifications from '../../../hooks/useNotifications';
import { setUserToStorage } from '../../../services/storage';
import { User } from '../../../types/typeDefinitions';
import { useLoginUserMutation } from '../authApiSlice';
import { loginUserSuccess } from '../authStateSlice';

const LoginForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigateTo = useNavigate();

  const dispatch = useAppDispatch();

  const [
    loginUser,
    {
      data: userAuthData,
      isError: isUserLoginError,
      isLoading: isUserLoginLoading,
    },
  ] = useLoginUserMutation();

  const saveUserToStorageAndMemory = useCallback(
    (userData: User) => {
      setUserToStorage(userData);
      dispatch(loginUserSuccess(userData));
      navigateTo('/');
    },
    [dispatch, navigateTo]
  );

  const handleFormInputChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      switch (name) {
        case 'userName':
          setUserName(event.target.value);
          break;
        case 'password':
          setPassword(event.target.value);
          break;
        default:
          return '';
      }
    };

  const { handleUserActionNotification, handlePromiseNotification } =
    useNotifications();

  const handleFormSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      handlePromiseNotification(
        loginUser({ username: userName, password: password }).unwrap(),
        {
          success: {
            message: 'Dobrodošli!',
            type: 'success',
          },
          pending: {
            message: 'Logiranje...',
            type: 'info',
          },
          error: {
            message: 'Nešto je pošlo po zlu!',
            type: 'error',
          },
        }
      );
    } catch (error: any) {
      handleUserActionNotification({
        message: error.data.message,
        autoClose: 2500,
        type: 'error',
      });
    }
  };

  useEffect(() => {
    if (
      userAuthData !== null &&
      userAuthData !== undefined &&
      !isUserLoginError &&
      !isUserLoginLoading
    ) {
      saveUserToStorageAndMemory(userAuthData as User);
    }
  }, [
    isUserLoginError,
    isUserLoginLoading,
    userAuthData,
    saveUserToStorageAndMemory,
  ]);

  return (
    <div className='bg-lightColor bg-opacity-80 rounded-lg px-12 py-8 flex flex-col gap-8'>
      <h1 className='flex justify-center items-center font-ubuntu text-primaryColor font-bold text-xl'>
        Prijava
      </h1>

      <div className='flex flex-col gap-16'>
        <div className='flex flex-col gap-4'>
          <InputElement
            label={'korisničko ime'}
            placeholder={'username'}
            labelClasses={'text-secondaryColor'}
            inputClasses={
              'placeholder-lightColor placeholder:opacity-50 text-lightColor bg-secondaryColor h-12'
            }
            inputProps={{
              value: userName,
              onChange: handleFormInputChange('userName'),
              type: 'text',
            }}
          />
          <InputElement
            label={'lozinka'}
            placeholder={'*********'}
            labelClasses={'text-secondaryColor'}
            inputClasses={
              'placeholder-lightColor placeholder:opacity-50 text-lightColor bg-secondaryColor h-12'
            }
            inputProps={{
              value: password,
              onChange: handleFormInputChange('password'),
            }}
          />
        </div>

        <div>
          <button
            onClick={handleFormSubmit}
            className='button bg-primaryColor text-lightColor !py-4'
          >
            prijavi se
          </button>
          <div className='flex gap-1 font-ubuntu text-base font-bold text-secondaryColor'>
            Još nemaš račun?
            <NavLink to={'/auth/register'} className='text-primaryColor'>
              Registriraj se
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
