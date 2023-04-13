import { Rating } from '@mui/material';
import { FC, useState } from 'react';
import { TfiClose as CloseIcon } from 'react-icons/tfi';

import TextElement from '../../../components/Form/TextElement';
import Modal from '../../../components/Modal/Modal';
import { getUserFromStorage } from '../../../services/storage';
import { User, WriteReview } from '../../../types/typeDefinitions';
import UsersAutocomplete from './UsersAutocomplete';
import { useCreateReviewMutation } from './reviewsApiSlice';
import useNotifications from '../../../hooks/useNotifications';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const AddReviewModal: FC<Props> = ({ isOpen, closeModal }) => {
  const userJson: string | null = getUserFromStorage();
  const user: User | null = userJson ? JSON.parse(userJson).user : null;

  const [reviewData, setReviewData] = useState<WriteReview>({
    userId: undefined,
    authorId: user.id,
    rating: 0,
    text: '',
  });

  const handleUserChange = (value: User) => {
    setReviewData({ ...reviewData, userId: value.id });
  };

  const handleInputChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (name === 'text')
        setReviewData({ ...reviewData, text: event.target.value });

      if (name === 'rating')
        setReviewData({
          ...reviewData,
          rating: parseFloat(event.target.value),
        });
    };

  const { handleUserActionNotification, handlePromiseNotification } =
    useNotifications();

  const [createReview] = useCreateReviewMutation();

  const handleSubmit = () => {
    try {
      handlePromiseNotification(
        createReview(reviewData)
          .unwrap()
          .then(() => closeModal()),
        {
          success: {
            message: 'Recenzija dodana!',
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
    <Modal isOpen={isOpen}>
      <div className='bg-lightColor w-[500px] h-[525px] rounded-lg opacity-95 p-5 flex flex-col gap-5 relative'>
        <header className='flex justify-between items-center text-primaryColor text-base'>
          <h3 className='font-ubuntu text-lg font-medium'>ostavi recenziju</h3>
          <button
            onClick={() => {
              closeModal();
              setReviewData({
                userId: undefined,
                authorId: user.id,
                rating: 0,
                text: '',
              });
            }}
          >
            <CloseIcon />
          </button>
        </header>

        <div className='flex flex-col gap-5'>
          <UsersAutocomplete
            label='korisnik'
            inputProps={{
              onChange: handleUserChange,
            }}
          />

          <div className='flex flex-col'>
            <label className='font-ubuntu text-base font-bold text-primaryColor'>
              ocjena
            </label>
            <div className='flex items-center gap-2'>
              <input
                value={reviewData.rating}
                className={`border rounded-lg p-2 px-5 flex flex-nowrap bg-transparent`}
                type='number'
                onChange={handleInputChange('rating')}
              />
              <Rating
                value={reviewData.rating}
                onChange={handleInputChange('rating')}
                size='medium'
                precision={0.5}
              />
            </div>
          </div>

          <TextElement
            label={'recenzija'}
            placeholder={'napiši recenziju'}
            labelClasses={'text-primaryColor'}
            textClasses={'placeholder-primaryColor'}
            textProps={{
              onChange: handleInputChange('text'),
              defaultValue: reviewData.text,
            }}
          />
        </div>

        <div className='absolute w-full flex justify-center gap-5 bottom-5 pr-10'>
          <button
            onClick={handleSubmit}
            className='button bg-primaryColor text-lightColor !w-auto !text-base'
          >
            spremi
          </button>
          <button
            onClick={() => {
              closeModal();
              setReviewData({
                userId: undefined,
                authorId: user.id,
                rating: 0,
                text: '',
              });
            }}
            className='button bg-redColor text-lightColor !w-auto !text-base'
          >
            odustani
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddReviewModal;
