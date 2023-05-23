import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import InputElement from '../../../components/Form/InputElement';
import useNotifications from '../../../hooks/useNotifications';
import { getUserFromStorage } from '../../../services/storage';
import { ChangePassword, User } from '../../../types/typeDefinitions';
import { useChangePasswordMutation } from '../../auth/authApiSlice';

const ChangePasswordComponent = () => {
  const userJson: string | null = getUserFromStorage();
  const user: User | null = userJson ? JSON.parse(userJson).user : null;

  const { handleUserActionNotification, handlePromiseNotification } =
    useNotifications();

  const [changePassword] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<ChangePassword>({
    mode: 'onChange',
    defaultValues: {
      id: user?.id,
    },
  });

  const onSubmit = (data: ChangePassword) => {
    handlePasswordSubmit(data);
  };

  const handlePasswordSubmit = (data: ChangePassword) => {
    if (data?.newPassword === data?.repeatPassword)
      try {
        handlePromiseNotification(
          changePassword({
            id: user?.id,
            newPassword: data.newPassword,
            currentPassword: data.currentPassword,
          }).unwrap(),

          {
            success: {
              message: 'Lozinka uspješno ažurirana!',
              type: 'success',
            },
            pending: {
              message: 'Učitavanje...',
              type: 'info',
            },
            error: {
              message: 'Nešto je pošlo po zlu!',
              type: 'error',
            },
          }
        );

        reset();
      } catch (error: any) {
        handleUserActionNotification({
          message: error.data.message,
          autoClose: 2500,
          type: 'error',
        });
      }
    else
      handleUserActionNotification({
        message: 'Ponovljena lozinka netočna!',
        autoClose: 2500,
        type: 'error',
      });
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue =
          'Niste spremili promjene. Sigurno želite napustiti stranicu?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-secondaryColor sm:w-full h-full rounded-lg p-6 flex flex-col gap-4 text-lightColor'
    >
      <div className='flex flex-col h-full justify-between'>
        <div className='flex flex-col gap-3 sm:w-full w-[400px]'>
          <InputElement
            label='stara lozinka'
            placeholder='upiši staru lozinku...'
            labelClasses={'text-primaryColor'}
            inputClasses={`placeholder:opacity-70 h-12 text-darkColor ${
              errors?.currentPassword?.message ? 'border-2 border-redColor' : ''
            }`}
            inputProps={register('currentPassword', {
              required: 'Ovo polje je obavezno',
            })}
            errors={errors?.currentPassword?.message}
          />

          <InputElement
            label='nova lozinka'
            placeholder='upiši novu lozinku...'
            labelClasses={'text-primaryColor'}
            inputClasses={`placeholder:opacity-70 h-12 text-darkColor ${
              errors?.newPassword?.message ? 'border-2 border-redColor' : ''
            }`}
            inputProps={register('newPassword', {
              required: 'Ovo polje je obavezno',
              validate: {
                matchOldPassword: (value) =>
                  value !== watch('currentPassword') ||
                  'Nova lozinka ne smije biti jednaka staroj!',
              },
            })}
            errors={errors?.newPassword?.message}
          />

          <InputElement
            label='ponovi lozinku'
            placeholder='ponovi novu lozinku...'
            labelClasses={'text-primaryColor'}
            inputClasses={`placeholder:opacity-70 h-12 text-darkColor ${
              errors?.repeatPassword?.message ? 'border-2 border-redColor' : ''
            }`}
            inputProps={register('repeatPassword', {
              required: 'Ovo polje je obavezno',
              validate: {
                matchNewPassword: (value) =>
                  value === watch('newPassword') ||
                  'Ponovljena lozinka mora odgovarati novoj lozinki!',
              },
            })}
            errors={errors?.repeatPassword?.message}
          />
        </div>

        <button
          type='submit'
          className='button bg-primaryColor !w-auto place-self-center'
        >
          spremi promjene
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordComponent;
