import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';

const GoogleLoginComponent = () => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });

  return (
    <button
      onClick={() => login()}
      className='button bg-white h-[50px] gap-4 relative'
    >
      <GoogleIcon className='absolute left-5' />
      Google
    </button>
  );
};

export default GoogleLoginComponent;
