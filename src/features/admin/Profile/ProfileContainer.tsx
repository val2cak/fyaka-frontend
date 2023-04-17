import TitleBar from '../../../components/TitleBar/TitleBar';
import { getUserFromStorage } from '../../../services/storage';
import { User } from '../../../types/typeDefinitions';
import { useGetSingleUserQuery } from '../../auth/authApiSlice';
import ProfileImage from './ProfileImage';
import ProfileInfo from './ProfileInfo';

const ProfileContainer = () => {
  const userJson: string | null = getUserFromStorage();
  const user: User | null = userJson ? JSON.parse(userJson).user : null;

  const { data: userData, isFetching: isUserDataLoading } =
    useGetSingleUserQuery(user.id);

  return (
    <main>
      <TitleBar title={'profil'} />

      {!isUserDataLoading && (
        <div className='bg-secondaryColor flex py-24 px-56 justify-center items-center gap-32'>
          <ProfileImage />

          <ProfileInfo {...userData} />
        </div>
      )}
    </main>
  );
};

export default ProfileContainer;
