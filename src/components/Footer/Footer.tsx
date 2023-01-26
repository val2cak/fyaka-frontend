// ICONS
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { SiLinkedin } from 'react-icons/si';
//

import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  const flag =
    location.pathname === '/home' ||
    location.pathname === '/looking-for-service' ||
    location.pathname === '/ratings' ||
    location.pathname === '/favorites' ||
    location.pathname === '/settings'
      ? 1
      : 0;

  return (
    <main
      className={`font-ubuntu ${
        flag ? 'bg-secondaryColor' : 'bg-lightColor'
      } flex flex-row justify-evenly p-12 bottom-0 w-full gap-10 text-base`}
    >
      <ul
        className={`flex flex-col ${
          !flag ? 'text-primaryColor' : 'text-lightColor'
        }`}
      >
        <li>
          <a href='/settings'>Kako funkcionira</a>
        </li>
        <li>
          <a href='/settings'>O nama</a>
        </li>
        <li>
          <a href='/settings'>Centar za pomoć</a>
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
        <li>All rights reserved ©!Fyaka</li>
      </ul>
      <ul
        className={`flex flex-col ${
          !flag ? 'text-primaryColor' : 'text-lightColor'
        }`}
      >
        <li>
          <a href='/settings'>Odredbe i uvjeti</a>
        </li>
        <li>
          <a href='/settings'>Mediji</a>
        </li>
        <li>
          <a href='/settings'>Postavke kolačića</a>
        </li>
      </ul>
    </main>
  );
};

export default Footer;
