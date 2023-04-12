import { TfiClose as CloseCircleIcon } from 'react-icons/tfi';

const CloseButton = ({ closeToast }: any) => (
  <button className='flex justify-center items-center p-1' onClick={closeToast}>
    <CloseCircleIcon />
  </button>
);

export default CloseButton;
