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
import { useParams } from 'react-router-dom';
import InputElement from '../../../components/Form/InputElement';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const AddReviewModal: FC<Props> = ({ isOpen, closeModal }) => {
  const userJson: string | null = getUserFromStorage();
  const user: User | null = userJson ? JSON.parse(userJson).user : null;

  const { id } = useParams();

  const [reviewData, setReviewData] = useState<WriteReview>({
    userId: parseInt(id) ?? undefined,
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

      if (name === 'rating') {
        const value = parseFloat(event.target.value);

        if (isNaN(value))
          setReviewData({
            ...reviewData,
            rating: 0,
          });
        else
          setReviewData({
            ...reviewData,
            rating: value,
          });
      }
    };

  const { handleUserActionNotification, handlePromiseNotification } =
    useNotifications();

  const [createReview] = useCreateReviewMutation();

  const handleSubmit = () => {
    try {
      handlePromiseNotification(
        createReview(reviewData)
          .unwrap()
          .then(() => {
            closeModal();
            setReviewData({
              userId: parseInt(id) ?? undefined,
              authorId: user.id,
              rating: 0,
              text: '',
            });
          }),
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
      <div
        className={`bg-lightColor w-[500px] ${
          id ? 'h-[425px]' : 'h-[525px]'
        } rounded-lg opacity-95 p-8 flex flex-col gap-4 relative`}
      >
        <header className='flex justify-between items-center text-primaryColor text-base'>
          <h3 className='font-ubuntu text-lg font-medium'>ostavi recenziju</h3>
          <button
            onClick={() => {
              closeModal();
              setReviewData({
                userId: parseInt(id) ?? undefined,
                authorId: user.id,
                rating: 0,
                text: '',
              });
            }}
          >
            <CloseIcon />
          </button>
        </header>

        <div className='flex flex-col gap-2'>
          {!id && (
            <UsersAutocomplete
              label='korisnik'
              inputProps={{
                onChange: handleUserChange,
              }}
            />
          )}

          <div className='flex flex-col'>
            <label className='font-ubuntu text-base font-bold text-primaryColor'>
              ocjena
            </label>
            <div className='flex items-center gap-4'>
              <input
                value={reviewData.rating}
                className={`rounded-lg p-2 px-5 flex flex-nowrap bg-transparent border-[0.5px] border-grayColor h-[64px] w-[100px]`}
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
            placeholder={'napiši recenziju...'}
            labelClasses={'text-primaryColor'}
            textClasses={
              'placeholder-[#b1b1b1] !font-ubuntu bg-transparent border-[0.5px] border-grayColor font-normal'
            }
            textProps={{
              onChange: handleInputChange('text'),
              value: reviewData.text,
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
                userId: parseInt(id) ?? undefined,
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
