import { Rating } from '@mui/material';
import InputElement from '../../../components/Form/InputElement';

const ProfileInfo = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col'>
        <label className={'font-ubuntu text-base font-bold text-primaryColor'}>
          ukupna ocjena
        </label>
        <div className='flex bg-lightColor p-3 rounded-lg justify-start items-center gap-2'>
          <div className='font-bold'>4.0</div>
          <Rating
            name='read-only'
            value={4}
            readOnly
            size='medium'
            precision={0.5}
          />
        </div>
      </div>

      <InputElement
        label={'email'}
        placeholder={'email'}
        labelClasses={'text-primaryColor'}
        inputClasses={'placeholder-darkColor w-[300px]'}
      />

      <InputElement
        label={'korisničko ime'}
        placeholder={'korisničko ime'}
        labelClasses={'text-primaryColor'}
        inputClasses={'placeholder-darkColor w-[300px]'}
      />

      <InputElement
        label={'lozinka'}
        placeholder={'*********'}
        labelClasses={'text-primaryColor'}
        inputClasses={'placeholder-darkColor w-[300px]'}
      />
    </div>
  );
};

export default ProfileInfo;
