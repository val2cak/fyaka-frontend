import TitleBar from '../../../components/TitleBar/TitleBar';
import ProfileImage from './ProfileImage';
import ProfileInfo from './ProfileInfo';

const ProfileContainer = () => {
  return (
    <main>
      <TitleBar title={'profil'} />

      <div className='bg-secondaryColor flex py-24 px-56 justify-center items-center gap-32'>
        <ProfileImage />

        <ProfileInfo />
      </div>
    </main>
  );
};

export default ProfileContainer;
