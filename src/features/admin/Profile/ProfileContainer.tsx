import ProfileImage from './ProfileImage';
import ProfileInfo from './ProfileInfo';

const ProfileContainer = () => {
  return (
    <main className='bg-secondaryColor flex py-24 px-56 justify-center items-center gap-32'>
      <ProfileImage />

      <ProfileInfo />
    </main>
  );
};

export default ProfileContainer;
