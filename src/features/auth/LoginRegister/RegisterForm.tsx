import { NavLink } from 'react-router-dom';
import InputElement from '../../../components/Form/InputElement';

const RegisterForm = () => {
  return (
    <div className='bg-lightColor bg-opacity-80 rounded-lg p-8 flex flex-col gap-4'>
      <h1 className='flex justify-center items-center font-ubuntu text-secondaryColor font-bold text-3xl'>
        Registracija
      </h1>

      <InputElement
        label={'Email'}
        placeholder={'yourmail@mail.com'}
        labelClasses={'text-primaryColor'}
        inputClasses={
          'placeholder-lightColor placeholder:opacity-50 bg-primaryColor'
        }
      />

      <InputElement
        label={'Korisničko ime'}
        placeholder={'username'}
        labelClasses={'text-primaryColor'}
        inputClasses={
          'placeholder-lightColor placeholder:opacity-50 bg-primaryColor'
        }
      />

      <InputElement
        label={'Lozinka'}
        placeholder={'*********'}
        labelClasses={'text-primaryColor'}
        inputClasses={
          'placeholder-lightColor placeholder:opacity-50 bg-primaryColor'
        }
      />

      <InputElement
        label={'Ponovi lozinku'}
        placeholder={'*********'}
        labelClasses={'text-primaryColor'}
        inputClasses={
          'placeholder-lightColor placeholder:opacity-50 bg-primaryColor'
        }
      />

      <button className='button bg-secondaryColor text-lightColor'>
        Registriraj se
      </button>
      <div className='flex gap-1 font-ubuntu text-base font-bold text-secondaryColor'>
        Već imaš račun?
        <NavLink to={'/login'} className='text-primaryColor'>
          Prijavi se
        </NavLink>
      </div>
    </div>
  );
};

export default RegisterForm;
