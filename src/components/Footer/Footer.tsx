import { NavLink, useLocation } from 'react-router-dom';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { SiLinkedin } from 'react-icons/si';

const Footer = () => {
  const locationPathname = useLocation().pathname;

  const flag =
    locationPathname === '/' ||
    locationPathname === '/looking-for-service' ||
    locationPathname === '/reviews' ||
    locationPathname === '/favorites' ||
    locationPathname === '/settings' ||
    locationPathname.includes('/my-services/')
      ? 1
      : 0;

  return (
    <main
      className={`font-raleway font-medium ${
        flag ? 'bg-secondaryColor' : 'bg-lightColor'
      } flex sm:flex-col flex-row justify-evenly p-12 w-full h-full gap-10 text-base`}
    >
      <ul
        className={`flex flex-col sm:order-1 ${
          !flag ? 'text-primaryColor' : 'text-lightColor'
        }`}
      >
        <li>
          <NavLink to='/settings'>Kako funkcionira</NavLink>
        </li>
        <li>
          <NavLink to='/settings'>O nama</NavLink>
        </li>
        <li>
          <NavLink to='/settings'>Centar za pomoć</NavLink>
        </li>
      </ul>
      <ul
        className={`flex flex-col justify-between sm:order-3 ${
          flag ? 'text-primaryColor' : 'text-lightColor'
        }`}
      >
        <ul className='flex flex-row text-primaryColor gap-5 text-lg items-center justify-start'>
          <li>
            <a href='https://www.facebook.com/'>
              <FaFacebook />
            </a>
          </li>
          <li>
            <a href='https://www.twitter.com/'>
              <FaTwitter />
            </a>
          </li>
          <li className='text-2xl'>
            <a href='https://www.instagram.com/'>
              <RiInstagramFill />
            </a>
          </li>
          <li>
            <a href='https://www.linkedin.com/'>
              <SiLinkedin />
            </a>
          </li>
        </ul>
        <li className={`${!flag ? 'text-primaryColor' : 'text-lightColor'}`}>
          All rights reserved ©!Fyaka
        </li>
      </ul>
      <ul
        className={`flex flex-col sm:order-2 ${
          !flag ? 'text-primaryColor' : 'text-lightColor'
        }`}
      >
        <li>
          <NavLink to='/settings'>Odredbe i uvjeti</NavLink>
        </li>
        <li>
          <NavLink to='/settings'>Mediji</NavLink>
        </li>
        <li>
          <NavLink to='/settings'>Postavke kolačića</NavLink>
        </li>
      </ul>
    </main>
  );
};

export default Footer;
