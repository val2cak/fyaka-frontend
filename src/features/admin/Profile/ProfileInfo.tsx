import { Rating } from '@mui/material';
import { FC, useState } from 'react';
import DatePickerElement from '../../../components/Form/DatePickerElement';
import InputElement from '../../../components/Form/InputElement';
import TextElement from '../../../components/Form/TextElement';
import useNotifications from '../../../hooks/useNotifications';
import { Lookup, User } from '../../../types/typeDefinitions';
import { useUpdateUserMutation } from '../../auth/authApiSlice';
import genderTypes from '../../../types/genderTypes';
import DropdownElement from '../../../components/Form/DropdownElement';
import {
  RiUserStarFill as ReviewsIcon,
  RiArrowRightSLine as ArrowIcon,
} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const ProfileInfo: FC<User> = ({
  id,
  username,
  email,
  rating,
  biography,
  phoneNumber,
  fullName,
  gender,
  dateOfBirth,
}) => {
  const [userData, setUserData] = useState<User>();

  const navigateTo = useNavigate();

  const { handleUserActionNotification, handlePromiseNotification } =
    useNotifications();

  const [updateUser] = useUpdateUserMutation();

  const handleUpdate = () => {
    try {
      handlePromiseNotification(
        updateUser({
          ...userData,
          id: id,
        }).unwrap(),

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
    } catch (error: any) {
      handleUserActionNotification({
        message: error.data.message,
        autoClose: 2500,
        type: 'error',
      });
    }
  };

  const handleDataChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      switch (name) {
        case 'username':
          setUserData({ ...userData, username: event.target.value });
          break;
        case 'biography':
          setUserData({ ...userData, biography: event.target.value });
          break;
        case 'phoneNumber':
          setUserData({
            ...userData,
            phoneNumber: event.target.value,
          });
          break;
        case 'fullName':
          setUserData({ ...userData, fullName: event.target.value });
          break;
        default:
          return '';
      }
    };

  const handleDateChange = (newValue: Date) => {
    setUserData({ ...userData, dateOfBirth: newValue });
  };

  const handleGenderChange = (newValue: Lookup) => {
    setUserData({ ...userData, gender: newValue.name });
  };

  return (
    <div className='flex flex-col gap-8 items-center'>
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
            inputClasses={'placeholder-primaryColor w-[300px] bg-lightColor'}
            inputProps={{
              type: 'text',
              defaultValue: username,
              onChange: handleDataChange('username'),
            }}
          />

          <InputElement
            label={'ime i prezime'}
            placeholder={'ime i prezime'}
            labelClasses={'text-primaryColor'}
            inputClasses={'placeholder-primaryColor w-[300px]'}
            inputProps={{
              type: 'text',
              defaultValue: fullName,
              onChange: handleDataChange('fullName'),
            }}
          />

          <div className='flex flex-col'>
            <label
              className={'font-ubuntu text-base font-bold text-primaryColor'}
            >
              ukupna ocjena
            </label>
            <button
              onClick={() => navigateTo('/reviews')}
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
            inputClasses={'placeholder-primaryColor w-[300px]'}
            inputProps={{
              type: 'text',
              defaultValue: phoneNumber,
              onChange: handleDataChange('phoneNumber'),
            }}
          />

          <DropdownElement
            label={'spol'}
            placeholder={'spol'}
            labelClasses={'text-primaryColor'}
            handleSelect={handleGenderChange}
            data={genderTypes}
            selectedId={
              userData?.gender !== null && !userData?.gender
                ? genderTypes.find((item) => item.name === gender)?.id
                : genderTypes.find((item) => item.name === userData?.gender)?.id
            }
          />

          <DatePickerElement
            label={'datum rođenja'}
            labelClasses={'text-primaryColor'}
            inputClasses={'placeholder-primaryColor bg-lightColor w-[300px]'}
            inputProps={{
              type: 'text',
              defaultValue:
                dateOfBirth && dateOfBirth !== null && new Date(dateOfBirth),
              onChange: handleDateChange,
            }}
          />

          <TextElement
            label={'biografija'}
            placeholder={'napiši nešto o sebi...'}
            labelClasses={'text-primaryColor'}
            textClasses={'placeholder-primaryColor w-[300px]'}
            textProps={{
              type: 'text',
              defaultValue: biography,
              onChange: handleDataChange('biography'),
            }}
          />
        </div>
      </div>

      <button
        onClick={handleUpdate}
        disabled={userData ? false : true}
        className='button text-lightColor bg-primaryColor !w-auto'
      >
        spremi promjene
      </button>
    </div>
  );
};

export default ProfileInfo;
