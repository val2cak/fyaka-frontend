import { NavLink } from 'react-router-dom';
import InputElement from '../../../components/Form/InputElement';

const LoginForm = () => {
  return (
    <div className='bg-lightColor bg-opacity-80 rounded-lg px-20 py-16 flex flex-col gap-8'>
      <h1 className='flex justify-center items-center font-ubuntu text-primaryColor font-bold text-3xl'>
        Prijava
      </h1>

      <div className='flex flex-col gap-16'>
        <div className='flex flex-col gap-4'>
          <InputElement
            label={'korisničko ime'}
            placeholder={'username'}
            labelClasses={'text-secondaryColor'}
            inputClasses={
              'placeholder-lightColor placeholder:opacity-50 text-lightColor bg-secondaryColor'
            }
          />
          <InputElement
            label={'lozinka'}
            placeholder={'*********'}
            labelClasses={'text-secondaryColor'}
            inputClasses={
              'placeholder-lightColor placeholder:opacity-50 text-lightColor bg-secondaryColor'
            }
          />
        </div>

        <div>
          <button className='button bg-primaryColor text-lightColor !py-4'>
            prijavi se
          </button>
          <div className='flex gap-1 font-ubuntu text-base font-bold text-secondaryColor'>
            Još nemaš račun?
            <NavLink to={'/auth/register'} className='text-primaryColor'>
              Registriraj se
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
