import { TfiClose as CloseIcon } from 'react-icons/tfi';

const CloseButton = ({ closeToast }: any) => (
  <button className='flex justify-center items-center p-1' onClick={closeToast}>
    <CloseIcon />
  </button>
);

export default CloseButton;
