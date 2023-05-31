import {
  BsFillPatchCheckFill as SuccessIcon,
  BsFillPatchQuestionFill as WarningIcon,
  BsFillPatchExclamationFill as ErrorIcon,
} from 'react-icons/bs';
import CustomLoader from '../Loader/CustomLoader';

const CustomIcon = (type: any) => {
  if (type === 'success') {
    return <SuccessIcon className='text-lg' />;
  }

  if (type === 'info') {
    return <CustomLoader />;
  }

  if (type === 'warning') {
    return <WarningIcon className='text-lg' />;
  }

  if (type === 'error') {
    return <ErrorIcon className='text-lg' />;
  }
};

export default CustomIcon;
