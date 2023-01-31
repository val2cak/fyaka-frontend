import { NavLink } from 'react-router-dom';
import InputElement from '../../../components/Form/InputElement';

const RegisterForm = () => {
  return (
    <div className='bg-lightColor bg-opacity-80 rounded-lg px-20 py-8 flex flex-col gap-4'>
      <h1 className='flex justify-center items-center font-ubuntu text-secondaryColor font-bold text-3xl'>
        Registracija
      </h1>

      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-4'>
          <InputElement
            label={'email'}
            placeholder={'yourmail@mail.com'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              'placeholder-lightColor placeholder:opacity-50 text-lightColor bg-primaryColor'
            }
          />

          <InputElement
            label={'korisničko ime'}
            placeholder={'username'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              'placeholder-lightColor placeholder:opacity-50 text-lightColor bg-primaryColor'
            }
          />

          <InputElement
            label={'lozinka'}
            placeholder={'*********'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              'placeholder-lightColor placeholder:opacity-50 text-lightColor bg-primaryColor'
            }
          />

          <InputElement
            label={'ponovi lozinku'}
            placeholder={'*********'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              'placeholder-lightColor placeholder:opacity-50 text-lightColor bg-primaryColor'
            }
          />
        </div>

        <div>
          <button className='button bg-secondaryColor text-lightColor !py-4'>
            registriraj se
          </button>
          <div className='flex gap-1 font-ubuntu text-base font-bold text-secondaryColor'>
            Već imaš račun?
            <NavLink to={'/auth/login'} className='text-primaryColor'>
              Prijavi se
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
