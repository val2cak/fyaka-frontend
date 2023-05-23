import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import InputElement from '../../../components/Form/InputElement';
import useNotifications from '../../../hooks/useNotifications';
import { getUserFromStorage } from '../../../services/storage';
import { User } from '../../../types/typeDefinitions';
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from '../../auth/authApiSlice';

const ChangeEmailComponent = () => {
  const userJson: string | null = getUserFromStorage();
  const user: User | null = userJson ? JSON.parse(userJson).user : null;

  const { data: userData, isFetching: isUserDataLoading } =
    useGetSingleUserQuery(user.id);

  const { handleUserActionNotification, handlePromiseNotification } =
    useNotifications();

  const [updateUser] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<User>({
    mode: 'onChange',
    defaultValues: {
      id: user?.id,
    },
  });

  const onSubmit = (data: User) => {
    handleEmailSubmit(data);
  };

  const handleEmailSubmit = (data: User) => {
    if (userData?.email !== data?.email)
      try {
        handlePromiseNotification(
          updateUser({
            id: user?.id,
            email: data?.email,
          }).unwrap(),

          {
            success: {
              message: 'E-mail adresa uspješno ažurirana!',
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
        message: 'Nova e-mail adresa ne smije biti jednaka staroj!',
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
    <div className='bg-secondaryColor sm:w-full h-full rounded-lg p-6 flex flex-col gap-4 text-lightColor'>
      {!isUserDataLoading && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col h-full justify-between'
        >
          <div className='flex flex-col gap-3 sm:w-full w-[400px]'>
            <InputElement
              label='stara e-mail adresa'
              placeholder={'stara@mail.hr'}
              labelClasses={'text-primaryColor'}
              inputClasses={
                'placeholder:opacity-70 h-12 text-darkColor bg-lightColor'
              }
              inputProps={{
                type: 'email',
                disabled: true,
                value: userData?.email,
              }}
            />

            <InputElement
              label='nova e-mail adresa'
              placeholder={'nova@mail.hr'}
              labelClasses={'text-primaryColor'}
              inputClasses={`placeholder:opacity-70 h-12 text-darkColor ${
                errors?.email?.message ? 'border-2 border-redColor' : ''
              }`}
              inputProps={{
                ...register('email', {
                  required: 'Ovo polje je obavezno',
                  pattern: /^\S+@\S+$/i,
                  validate: {
                    matchOldEmail: (value) =>
                      value !== userData?.email ||
                      'Nova e-mail adresa ne smije biti jednaka staroj!',
                  },
                }),
                type: 'email',
              }}
              errors={errors?.email?.message}
            />
          </div>

          <button
            type='submit'
            className='button bg-primaryColor !w-auto place-self-center'
          >
            spremi promjene
          </button>
        </form>
      )}
    </div>
  );
};

export default ChangeEmailComponent;
