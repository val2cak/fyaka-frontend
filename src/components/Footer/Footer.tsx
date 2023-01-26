// ICONS
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { SiLinkedin } from 'react-icons/si';
//

const Footer = () => {
  return (
    <main
      className={`font-ubuntu bg-secondaryColor flex flex-row justify-evenly p-12 bottom-0 w-full gap-10 text-base`}
    >
      <ul className='flex flex-col text-lightColor'>
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
      <ul className='flex flex-col text-lightColor justify-center justify-between'>
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
      <ul className='flex flex-col text-lightColor'>
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
