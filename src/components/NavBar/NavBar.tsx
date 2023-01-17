import Links from './Links';
import Logo from './Logo';

const NavBar = () => {
  return (
    <header className='flex justify-between p-4 bg-primaryColor text-lightColor'>
      <Links name='Guest' />
      <Logo />
      <Links name='Admin' />
    </header>
  );
};

export default NavBar;
