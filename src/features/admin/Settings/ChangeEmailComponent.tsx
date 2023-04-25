import { useState } from 'react';
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

  const [newEmail, setNewEmail] = useState<string>('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(event.target.value);
  };

  const handleEmailSubmit = () => {
    if (userData?.email !== newEmail)
      try {
        handlePromiseNotification(
          updateUser({
            id: user?.id,
            email: newEmail,
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

        setNewEmail('');
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

  return (
    <div className='bg-secondaryColor h-full rounded-lg p-6 flex flex-col gap-4 text-lightColor'>
      {!isUserDataLoading && (
        <div className='flex flex-col h-full justify-between'>
          <div className='flex flex-col gap-3 w-[400px]'>
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
              inputClasses={'placeholder:opacity-70 h-12 text-darkColor'}
              inputProps={{
                type: 'email',
                onChange: handleEmailChange,
                value: newEmail,
              }}
            />
          </div>

          <button
            onClick={handleEmailSubmit}
            className='button bg-primaryColor !w-auto place-self-center'
          >
            spremi promjene
          </button>
        </div>
      )}
    </div>
  );
};

export default ChangeEmailComponent;
