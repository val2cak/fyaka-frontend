// ICONS
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { SiLinkedin } from 'react-icons/si';
//

import { NavLink, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  const flag =
    location.pathname === '/' ||
    location.pathname === '/looking-for-service' ||
    location.pathname === '/ratings' ||
    location.pathname === '/favorites' ||
    location.pathname === '/settings' ||
    location.pathname.includes('/my-services/')
      ? 1
      : 0;

  return (
    <main
      className={`font-raleway font-medium ${
        flag ? 'bg-secondaryColor' : 'bg-lightColor'
      } flex flex-row justify-evenly p-12 bottom-0 w-full gap-10 text-base`}
    >
      <ul
        className={`flex flex-col ${
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
        className={`flex flex-col justify-between ${
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
        className={`flex flex-col ${
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
