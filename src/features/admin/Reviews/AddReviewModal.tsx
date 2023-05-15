import { Rating } from '@mui/material';
import { FC } from 'react';
import { TfiClose as CloseIcon } from 'react-icons/tfi';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import TextElement from '../../../components/Form/TextElement';
import Modal from '../../../components/Modal/Modal';
import { getUserFromStorage } from '../../../services/storage';
import { User, WriteReview } from '../../../types/typeDefinitions';
import UsersAutocomplete from './UsersAutocomplete';
import { useCreateReviewMutation } from './reviewsApiSlice';
import useNotifications from '../../../hooks/useNotifications';
import InputElement from '../../../components/Form/InputElement';

interface Props {
  isOpen: boolean;
  closeModal: (isSuccess?: boolean) => void;
}

const AddReviewModal: FC<Props> = ({ isOpen, closeModal }) => {
  const userJson: string | null = getUserFromStorage();
  const user: User | null = userJson ? JSON.parse(userJson).user : null;

  const { id } = useParams();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WriteReview>({
    mode: 'onChange',
    defaultValues: {
      userId: id ? parseInt(id) : undefined,
      authorId: user.id,
      rating: '',
      text: '',
    },
  });

  const { handleUserActionNotification, handlePromiseNotification } =
    useNotifications();

  const [createReview] = useCreateReviewMutation();

  const onSubmit = (data: WriteReview) => {
    handlePublish(data);
  };

  const handlePublish = (data: WriteReview) => {
    try {
      handlePromiseNotification(
        createReview(data)
          .unwrap()
          .then(() => {
            closeModal(true);
            reset();
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`bg-lightColor w-[500px] ${
          id ? 'h-[475px]' : 'h-[575px]'
        } rounded-lg opacity-95 p-8 flex flex-col gap-4 relative`}
      >
        <header className='flex justify-between items-center text-primaryColor text-base'>
          <h3 className='font-ubuntu text-lg font-medium'>ostavi recenziju</h3>
          <button
            type='button'
            onClick={() => {
              closeModal(false);
              reset();
            }}
          >
            <CloseIcon />
          </button>
        </header>

        <div className='flex flex-col gap-2'>
          {!id && (
            <Controller
              name='userId'
              control={control}
              rules={{
                required: 'Ovo polje je obavezno',
              }}
              render={({ field }) => (
                <UsersAutocomplete
                  label='korisnik'
                  inputProps={{
                    ...field,
                  }}
                  className={`${
                    errors?.userId?.message ? 'border-2 border-redColor' : ''
                  }`}
                  errors={errors?.userId?.message}
                />
              )}
            />
          )}

          <div className='flex flex-col'>
            <div className='flex items-center gap-4'>
              <InputElement
                label='ocjena'
                placeholder=''
                inputClasses={`rounded-lg p-2 px-5 flex flex-nowrap bg-transparent border-[0.5px] border-grayColor h-[64px] w-[100px] !font-ubuntu ${
                  errors?.rating?.message ? '!border-2 !border-redColor' : ''
                }`}
                labelClasses='font-ubuntu text-base font-bold text-primaryColor'
                inputProps={register('rating', {
                  required: 'Ovo polje je obavezno',
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: 'Ocjena mora biti barem 1',
                  },
                })}
                errors={errors?.rating?.message}
              />
              {/* <Rating
                value={parseFloat(reviewData.rating)}
                onChange={handleInputChange('rating')}
                size='medium'
                precision={0.5}
                className='pt-8'
              /> */}
            </div>
          </div>

          <TextElement
            label={'recenzija'}
            placeholder={'napiši recenziju...'}
            labelClasses={'text-primaryColor'}
            textClasses={`placeholder-[#b1b1b1] !font-ubuntu bg-transparent border-[0.5px] border-grayColor font-normal ${
              errors?.text?.message ? '!border-2 !border-redColor' : ''
            }`}
            textProps={register('text', {
              required: 'Ovo polje je obavezno',
              maxLength: {
                value: 100,
                message: 'Recenzija može sadržavati najviše 100 znakova',
              },
            })}
            errors={errors?.text?.message}
          />
        </div>

        <div className='absolute w-full flex justify-center gap-5 bottom-5 pr-14'>
          <button
            type='submit'
            className='button bg-primaryColor text-lightColor !w-auto !text-base'
          >
            spremi
          </button>
          <button
            type='button'
            onClick={() => {
              closeModal(false);
              reset();
            }}
            className='button bg-redColor text-lightColor !w-auto !text-base'
          >
            odustani
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddReviewModal;
