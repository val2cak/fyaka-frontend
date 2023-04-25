import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import useNotifications from '../../../hooks/useNotifications';
import {
  getUserFromStorage,
  removeUserFromStorage,
} from '../../../services/storage';
import { User } from '../../../types/typeDefinitions';
import { useDeleteUserMutation } from '../../auth/authApiSlice';
import { logoutUser } from '../../auth/authStateSlice';

const DeleteAccountComponent = () => {
  const userJson: string | null = getUserFromStorage();
  const user: User | null = userJson ? JSON.parse(userJson).user : null;

  const { handleUserActionNotification, handlePromiseNotification } =
    useNotifications();

  const navigateTo = useNavigate();

  const dispatch = useAppDispatch();

  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteAccount = () => {
    if (window.confirm('Sigurno želite izbrisati račun?'))
      try {
        handlePromiseNotification(deleteUser(user?.id).unwrap(), {
          success: {
            message: 'Račun izbrisan!',
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
        });

        removeUserFromStorage();
        dispatch(logoutUser());
        navigateTo('/');
      } catch (error: any) {
        handleUserActionNotification({
          message: error.data.message,
          autoClose: 2500,
          type: 'error',
        });
      }
  };

  return (
    <div className='bg-secondaryColor bg-deleteAccount bg-contain bg-no-repeat bg-right rounded-lg p-6 flex flex-col h-full justify-between gap-4 text-lightColor font-ubuntu text-base'>
      <div className='flex flex-col gap-2  h-full'>
        <p>Žao nam je što odlazite!</p>
        <p>Nakon što izbrišete račun, više ga ne možete vratiti.</p>
      </div>

      <button
        onClick={handleDeleteAccount}
        className='button bg-redColor !w-auto place-self-center'
      >
        izbriši račun
      </button>
    </div>
  );
};

export default DeleteAccountComponent;
