import { NavLink } from 'react-router-dom';
import InputElement from '../../../components/Form/InputElement';

const LoginForm = () => {
  return (
    <div className='bg-lightColor bg-opacity-80 rounded-lg p-8 flex flex-col gap-4'>
      <h1 className='flex justify-center items-center font-ubuntu text-primaryColor font-bold text-3xl'>
        Prijava
      </h1>

      <InputElement
        label={'Korisničko ime'}
        placeholder={'username'}
        labelClasses={'text-secondaryColor'}
        inputClasses={
          'placeholder-lightColor placeholder:opacity-50 bg-secondaryColor'
        }
      />

      <InputElement
        label={'Lozinka'}
        placeholder={'*********'}
        labelClasses={'text-secondaryColor'}
        inputClasses={
          'placeholder-lightColor placeholder:opacity-50 bg-secondaryColor'
        }
      />

      <button className='button bg-primaryColor text-lightColor'>
        Prijavi se
      </button>
      <div className='flex gap-1 font-ubuntu text-base font-bold text-secondaryColor'>
        Još nemaš račun?
        <NavLink to={'/auth/register'} className='text-primaryColor'>
          Registriraj se
        </NavLink>
      </div>
    </div>
  );
};

export default LoginForm;
