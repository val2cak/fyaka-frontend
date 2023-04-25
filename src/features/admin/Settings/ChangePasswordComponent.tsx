import { useState } from 'react';
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

  const [passwordData, setPasswordData] = useState<ChangePassword>();

  const handlePasswordData =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      switch (name) {
        case 'currentPassword':
          setPasswordData({
            ...passwordData,
            currentPassword: event.target.value,
          });
          break;
        case 'newPassword':
          setPasswordData({ ...passwordData, newPassword: event.target.value });
          break;
        case 'repeatPassword':
          setPasswordData({
            ...passwordData,
            repeatPassword: event.target.value,
          });
          break;
        default:
          return '';
      }
    };

  const handlePasswordSubmit = () => {
    if (passwordData?.newPassword === passwordData?.repeatPassword)
      try {
        handlePromiseNotification(
          changePassword({
            id: user?.id,
            newPassword: passwordData.newPassword,
            currentPassword: passwordData.currentPassword,
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

        setPasswordData({
          id: undefined,
          newPassword: '',
          currentPassword: '',
          repeatPassword: '',
        });
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

  return (
    <div className='bg-secondaryColor h-full rounded-lg p-6 flex flex-col gap-4 text-lightColor'>
      <div className='flex flex-col h-full justify-between'>
        <div className='flex flex-col gap-3 w-[400px]'>
          <InputElement
            label='stara lozinka'
            placeholder='upiši staru lozinku...'
            labelClasses={'text-primaryColor'}
            inputClasses={'placeholder:opacity-70 h-12 text-darkColor'}
            inputProps={{
              value: passwordData?.currentPassword,
              onChange: handlePasswordData('currentPassword'),
            }}
          />
          <InputElement
            label='nova lozinka'
            placeholder='upiši novu lozinku...'
            labelClasses={'text-primaryColor'}
            inputClasses={'placeholder:opacity-70 h-12 text-darkColor'}
            inputProps={{
              value: passwordData?.newPassword,
              onChange: handlePasswordData('newPassword'),
            }}
          />
          <InputElement
            label='ponovi lozinku'
            placeholder='ponovi novu lozinku...'
            labelClasses={'text-primaryColor'}
            inputClasses={'placeholder:opacity-70 h-12 text-darkColor'}
            inputProps={{
              value: passwordData?.repeatPassword,
              onChange: handlePasswordData('repeatPassword'),
            }}
          />
        </div>

        <button
          onClick={handlePasswordSubmit}
          className='button bg-primaryColor !w-auto place-self-center'
        >
          spremi promjene
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordComponent;
