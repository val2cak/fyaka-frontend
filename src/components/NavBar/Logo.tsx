import { NavLink } from 'react-router-dom';

const Logo = () => {
  return (
    <NavLink
      to='/'
      className='font-logo sm:pt-4 pb-2 sm:text-xl text-3xl font-semibold hover:font-bold transition ease-in-out delay-50 hover:scale-110 duration-100 justify-center items-center'
    >
      !Fyaka
    </NavLink>
  );
};

export default Logo;
