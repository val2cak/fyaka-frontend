import Links from './Links';
import Logo from './Logo';

const NavBar = () => {
  return (
    <header className='flex justify-between sm:py-0 p-2 bg-primaryColor text-lightColor z-[9]'>
      <Links name='Guest' />
      <Logo />
      <Links name='Admin' />
    </header>
  );
};

export default NavBar;
