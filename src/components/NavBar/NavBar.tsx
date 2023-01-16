import Links from './Links';
import Logo from './Logo';

const NavBar = () => {
  return (
    <header className='flex justify-between p-5 bg-primaryColor text-lightColor h-[82px]'>
      <Links name='Guest' />
      <Logo />
      <Links name='Admin' />
    </header>
  );
};

export default NavBar;
