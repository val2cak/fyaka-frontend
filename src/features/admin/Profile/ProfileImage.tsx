import placeholder from '../../../assets/vectors/profile-placeholder.png';

const ProfileImage = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-5'>
      <div className='rounded-full w-[300px] h-[300px]'>
        <img
          src={placeholder}
          onError={(event: any) => {
            event.target.src = placeholder;
          }}
          alt='profile'
        />
      </div>

      <button className='button bg-lightColor text-primaryColor !w-auto !text-base'>
        uredi sliku
      </button>
    </div>
  );
};

export default ProfileImage;
