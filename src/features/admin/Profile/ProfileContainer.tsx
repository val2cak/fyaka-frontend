import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowUndoCircleSharp as ArrowBackIcon } from 'react-icons/io5';
import TitleBar from '../../../components/TitleBar/TitleBar';
import { getUserFromStorage } from '../../../services/storage';
import { User } from '../../../types/typeDefinitions';
import { useGetSingleUserQuery } from '../../auth/authApiSlice';
import ProfileImage from './ProfileImage';
import ProfileInfo from './ProfileInfo';

const ProfileContainer = () => {
  const userJson: string | null = getUserFromStorage();
  const user: User | null = userJson ? JSON.parse(userJson).user : null;

  const navigateTo = useNavigate();

  const { id } = useParams();

  const { data: userData, isFetching: isUserDataLoading } =
    useGetSingleUserQuery(id ? parseInt(id) : user.id);

  return (
    <main>
      <TitleBar title={id ? 'profil korisnika' : 'profil'} />

      {id && (
        <button
          onClick={() => navigateTo(-1)}
          className='text-lightColor text-3xl m-3 absolute transition ease-in-out delay-50 hover:scale-110 duration-300'
        >
          <ArrowBackIcon />
        </button>
      )}

      {!isUserDataLoading && (
        <div className='bg-secondaryColor flex py-24 px-56 justify-center items-center gap-32'>
          <ProfileImage
            imageUrl={userData?.imageUrl}
            id={userData?.id}
            isMine={id ? false : true}
          />

          <ProfileInfo {...userData} isMine={id ? false : true} />
        </div>
      )}
    </main>
  );
};

export default ProfileContainer;
