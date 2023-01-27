import { NavLink } from 'react-router-dom';

const Logo = () => {
  return (
    <NavLink
      to='/home'
      className='font-logo text-lg font-bold justify-center items-center'
    >
      !Fyaka
    </NavLink>
  );
};

export default Logo;
