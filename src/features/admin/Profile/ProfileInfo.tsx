import { Rating } from '@mui/material';
import { FC, useEffect } from 'react';
import {
  RiUserStarFill as ReviewsIcon,
  RiArrowRightSLine as ArrowIcon,
} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';

import DatePickerElement from '../../../components/Form/DatePickerElement';
import InputElement from '../../../components/Form/InputElement';
import TextElement from '../../../components/Form/TextElement';
import useNotifications from '../../../hooks/useNotifications';
import { Lookup, User } from '../../../types/typeDefinitions';
import { useUpdateUserMutation } from '../../auth/authApiSlice';
import genderTypes from '../../../types/genderTypes';
import DropdownElement from '../../../components/Form/DropdownElement';

interface Props extends User {
  isMine: boolean;
}

const ProfileInfo: FC<Props> = ({
  id,
  username,
  email,
  rating,
  biography,
  phoneNumber,
  fullName,
  gender,
  dateOfBirth,
  isMine,
}) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isDirty },
  } = useForm<User>({
    mode: 'onChange',
    defaultValues: {
      id,
      username,
      biography,
      phoneNumber,
      fullName,
      gender,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
    },
  });

  const onSubmit = (data: User) => {
    handleUpdate(data);
  };

  const navigateTo = useNavigate();

  const { handleUserActionNotification, handlePromiseNotification } =
    useNotifications();

  const [updateUser] = useUpdateUserMutation();

  const handleUpdate = (data: User) => {
    try {
      handlePromiseNotification(
        updateUser(data).unwrap(),

        {
          success: {
            message: 'Profil uspješno ažuriran!',
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
      className='flex flex-col gap-8 items-center'
    >
      <div className='flex flex-row gap-16'>
        <div className='flex flex-col gap-4'>
          <InputElement
            label={'email'}
            placeholder={'email'}
            labelClasses={'text-primaryColor'}
            inputClasses={'placeholder-primaryColor w-[300px] bg-lightColor'}
            inputProps={{ type: 'text', disabled: true, value: email }}
          />

          <InputElement
            label={'korisničko ime'}
            placeholder={'korisničko ime'}
            labelClasses={'text-primaryColor'}
            inputClasses={`placeholder-primaryColor w-[300px] bg-lightColor ${
              errors?.username?.message ? 'border-2 border-redColor' : ''
            }`}
            inputProps={register('username', {
              required: 'Ovo polje je obavezno',
              disabled: !isMine,
            })}
            errors={errors?.username?.message}
          />

          <InputElement
            label={'ime i prezime'}
            placeholder={'ime i prezime'}
            labelClasses={'text-primaryColor'}
            inputClasses={'placeholder-primaryColor w-[300px] bg-lightColor'}
            inputProps={register('fullName', {
              disabled: !isMine,
            })}
          />

          <div className='flex flex-col'>
            <label
              className={'font-ubuntu text-base font-bold text-primaryColor'}
            >
              ukupna ocjena
            </label>
            <button
              onClick={() =>
                isMine
                  ? navigateTo('/reviews')
                  : navigateTo(`/user-reviews/${id}`)
              }
              className='flex bg-lightColor px-5 py-3 rounded-lg justify-between items-center h-[64px] transition ease-in-out delay-50 hover:scale-[1.025] duration-300'
            >
              <div className='flex gap-2'>
                <div className='font-bold'>{rating?.toFixed(1) ?? null}</div>
                <Rating
                  name='read-only'
                  value={rating}
                  readOnly
                  size='medium'
                  precision={0.5}
                />
              </div>
              <div className='flex text-base text-secondaryColor items-center'>
                <ReviewsIcon />
                <ArrowIcon className='text-md' />
              </div>
            </button>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <InputElement
            label={'broj telefona'}
            placeholder={'09x xxx xxxx'}
            labelClasses={'text-primaryColor'}
            inputClasses={'placeholder-primaryColor w-[300px] bg-lightColor'}
            inputProps={register('phoneNumber', {
              disabled: !isMine,
            })}
          />

          {isMine ? (
            <Controller
              name='gender'
              control={control}
              render={({ field }) => (
                <DropdownElement
                  label='spol'
                  placeholder='spol'
                  labelClasses='text-primaryColor'
                  inputClasses={`${
                    errors?.gender?.message ? 'border-2 border-redColor' : ''
                  }`}
                  handleSelect={(item: Lookup) => {
                    field.onChange(item.name);
                  }}
                  data={genderTypes}
                  selectedId={
                    getValues('gender') !== null && !getValues('gender')
                      ? genderTypes.find(
                          (item) => item.name === getValues('gender')
                        )?.id
                      : genderTypes.find(
                          (item) => item.name === getValues('gender')
                        )?.id
                  }
                  errors={errors?.gender?.message}
                />
              )}
            />
          ) : (
            <InputElement
              label={'spol'}
              placeholder={'spol'}
              labelClasses={'text-primaryColor'}
              inputClasses={'placeholder-primaryColor w-[300px] bg-lightColor'}
              inputProps={{
                type: 'text',
                defaultValue: gender,
                disabled: true,
              }}
            />
          )}

          {isMine ? (
            <Controller
              name='dateOfBirth'
              control={control}
              render={({ field }) => (
                <DatePickerElement
                  label='datum rođenja'
                  labelClasses='text-primaryColor'
                  inputClasses={`placeholder-primaryColor bg-lightColor w-[300px] ${
                    errors?.dateOfBirth?.message
                      ? '!border-2 !border-redColor'
                      : ''
                  }`}
                  inputProps={{
                    ...field,
                  }}
                  errors={errors?.dateOfBirth?.message}
                />
              )}
            />
          ) : (
            <InputElement
              label={'datum rođenja'}
              placeholder={'datum rođenja'}
              labelClasses={'text-primaryColor'}
              inputClasses={'placeholder-primaryColor w-[300px] bg-lightColor'}
              inputProps={{
                type: 'text',
                defaultValue: format(new Date(dateOfBirth), 'dd.MM.yyyy.'),
                disabled: true,
              }}
            />
          )}

          <TextElement
            label={'biografija'}
            placeholder={'napiši nešto o sebi...'}
            labelClasses={'text-primaryColor'}
            textClasses={'placeholder-primaryColor w-[300px] bg-lightColor'}
            textProps={register('biography', {
              disabled: !isMine,
              maxLength: {
                value: 100,
                message: 'Biografija može sadržavati najviše 100 znakova',
              },
            })}
          />
        </div>
      </div>

      {isMine && (
        <button
          type='submit'
          className='button text-lightColor bg-primaryColor !w-auto'
        >
          spremi promjene
        </button>
      )}
    </form>
  );
};

export default ProfileInfo;
