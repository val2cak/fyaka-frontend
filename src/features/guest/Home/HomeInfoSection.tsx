import {
  RiShieldCheckFill as SecurityIcon,
  RiUserStarFill as ReviewIcon,
  RiProfileFill as InterfaceIcon,
} from 'react-icons/ri';

import HomeInfoColumn from '../../../components/Home/HomeInfoColumn';

const HomeInfoSection = () => {
  return (
    <main
      id='info-section'
      className='bg-primaryColor text-lightColor mt-20 px-24 p-10 flex flex-row'
    >
      <HomeInfoColumn
        heading={'sigurno korištenje'}
        text={
          'trudimo se našu platformu učiniti što sigurnijom. ako se prevara ipak dogodi - javi nam se, tu smo za tebe!'
        }
        Icon={SecurityIcon}
      />

      <HomeInfoColumn
        heading={'recenzije korisnika'}
        text={
          'recenziraj druge korisnike s kojima si poslovao/la i pomozi nam da stvorimo zajednicu povjerenja'
        }
        Icon={ReviewIcon}
      />

      <HomeInfoColumn
        heading={'jednostavno sučelje'}
        text={
          'zakaži posao u rekordnom roku - naše jednostavno sučelje aplikacije ne zahtjeva nikakve posebne vještine'
        }
        Icon={InterfaceIcon}
      />
    </main>
  );
};

export default HomeInfoSection;
