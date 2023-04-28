import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import InputElement from '../../../components/Form/InputElement';
import useNotifications from '../../../hooks/useNotifications';
import { useRegisterUserMutation } from '../authApiSlice';

const RegisterForm = () => {
  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [
    registerUser,
    {
      data: userAuthData,
      isError: isUserRegisterError,
      isLoading: isUserRegisterLoading,
    },
  ] = useRegisterUserMutation();

  useEffect(() => {
    if (
      userAuthData !== null &&
      userAuthData !== undefined &&
      !isUserRegisterError &&
      !isUserRegisterLoading
    ) {
      navigateTo('/auth/login');
    }
  }, [isUserRegisterError, isUserRegisterLoading, userAuthData, navigateTo]);

  const { handleUserActionNotification, handlePromiseNotification } =
    useNotifications();

  const handleFormSubmit = async (data) => {
    try {
      handlePromiseNotification(
        registerUser({
          email: data.email,
          username: data.username,
          password: data.password,
        }).unwrap(),
        {
          success: {
            message: 'Uspješno ste se registrirali!',
            type: 'success',
          },
          pending: {
            message: 'Registriranje...',
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

  return (
    <div className='bg-lightColor bg-opacity-80 rounded-lg px-12 py-6 flex flex-col gap-2'>
      <h1 className='flex justify-center items-center font-ubuntu text-secondaryColor font-bold text-xl'>
        Registracija
      </h1>

      {(errors.email?.type ||
        errors.username?.type ||
        errors.password?.type ||
        errors.confirmPassword?.type) && (
        <span className='text-redColor font-ubuntu'>
          Molimo ispunite sva obavezna polja!
        </span>
      )}

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className='flex flex-col gap-6'
      >
        <div className='flex flex-col gap-4'>
          <InputElement
            label={'email'}
            placeholder={'yourmail@mail.com'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              `placeholder-lightColor placeholder:opacity-50 text-lightColor bg-primaryColor h-12` +
              (errors.email ? ' border-2 border-redColor' : '')
            }
            inputProps={{
              ...register('email', {
                required: true,
                pattern: /^\S+@\S+$/i,
              }),
              type: 'email',
            }}
          />

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
                minLength: 3,
              }),
              type: 'text',
            }}
          />

          <InputElement
            label={'lozinka'}
            placeholder={'*********'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              `placeholder-lightColor placeholder:opacity-50 text-lightColor bg-primaryColor h-12` +
              (errors.password ? ' border-2 border-redColor' : '')
            }
            inputProps={{
              ...register('password', {
                required: true,
                minLength: {
                  value: 8,
                  message: 'Lozinka mora imati barem 8 znakova!',
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  message:
                    'Lozinka mora sadržavati barem jedno veliko, jedno malo slovo i broj!',
                },
              }),
            }}
            errors={errors.password?.message.toString()}
          />

          <InputElement
            label={'ponovi lozinku'}
            placeholder={'*********'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              `placeholder-lightColor placeholder:opacity-50 text-lightColor bg-primaryColor h-12` +
              (errors.confirmPassword ? ' border-2 border-redColor' : '')
            }
            inputProps={{
              ...register('confirmPassword', {
                required: true,
              }),
            }}
          />
        </div>

        <div>
          <button
            onClick={handleFormSubmit}
            className='button bg-secondaryColor text-lightColor !py-4 h-16'
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
      </form>
    </div>
  );
};

export default RegisterForm;
