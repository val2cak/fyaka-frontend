import { FC, useState } from 'react';
import placeholder from '../../../assets/vectors/profile-placeholder.png';
import UploadImage from '../../../components/UploadImage/UploadImage';
import useNotifications from '../../../hooks/useNotifications';
import { useUpdateUserMutation } from '../../auth/authApiSlice';

interface Props {
  id: number;
  imageUrl: string;
}

const ProfileImage: FC<Props> = ({ id, imageUrl }) => {
  const [imageUploadUrl, setImageUploadUrl] = useState('');

  const handleUpload = (filename: string) => {
    setImageUploadUrl(filename);
    handleUpdate();
  };

  const { handleUserActionNotification, handlePromiseNotification } =
    useNotifications();

  const [updateUser] = useUpdateUserMutation();

  const handleUpdate = () => {
    try {
      handlePromiseNotification(
        updateUser({
          id: id,
          imageUrl: imageUploadUrl,
        }).unwrap(),

        {
          success: {
            message: 'Profilna slika uspješno ažurirana!',
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
    } catch (error: any) {
      handleUserActionNotification({
        message: error.data.message,
        autoClose: 2500,
        type: 'error',
      });
    }
  };

  return (
    <div className='flex flex-col justify-center items-center gap-5'>
      <div className='rounded-full w-[300px] h-[300px]'>
        <img
          src={imageUrl}
          onError={(event: any) => {
            event.target.src = placeholder;
          }}
          alt='profile'
        />
      </div>

      <UploadImage onSave={handleUpload} />
    </div>
  );
};

export default ProfileImage;
