import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../app/hooks';
import InputElement from '../../../components/Form/InputElement';
import useNotifications from '../../../hooks/useNotifications';
import { setUserToStorage } from '../../../services/storage';
import { User } from '../../../types/typeDefinitions';
import { useLoginUserMutation } from '../authApiSlice';
import { loginUserSuccess } from '../authStateSlice';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const { handleUserActionNotification, handlePromiseNotification } =
    useNotifications();

  const handleFormSubmit = async (data) => {
    try {
      handlePromiseNotification(
        loginUser({
          username: data.username,
          password: data.password,
        }).unwrap(),
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
    <div className='bg-lightColor bg-opacity-80 rounded-lg px-12 py-8 flex flex-col gap-4'>
      <h1 className='flex justify-center items-center font-ubuntu text-primaryColor font-bold text-xl'>
        Prijava
      </h1>

      {(errors.username?.type || errors.password?.type) && (
        <span className='text-redColor font-ubuntu'>
          Molimo ispunite sva obavezna polja!
        </span>
      )}

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className='flex flex-col gap-16'
      >
        <div className='flex flex-col gap-4'>
          <InputElement
            label={'korisničko ime'}
            placeholder={'username'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              `placeholder-lightColor placeholder:opacity-50 text-lightColor bg-primaryColor h-12` +
              (errors.username ? ' border-2 border-redColor' : '')
            }
            inputProps={{
              ...register('username', {
                required: true,
              }),
              type: 'text',
            }}
          />

          <InputElement
            label={'lozinka'}
            placeholder={'lozinka'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              `placeholder-lightColor placeholder:opacity-50 text-lightColor bg-primaryColor h-12` +
              (errors.password ? ' border-2 border-redColor' : '')
            }
            inputProps={{
              ...register('password', {
                required: true,
              }),
            }}
          />
        </div>

        <div>
          <button
            type='submit'
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
      </form>
    </div>
  );
};

export default LoginForm;
