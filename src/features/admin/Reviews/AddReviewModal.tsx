import { Rating } from '@mui/material';
import { FC } from 'react';
import { TfiClose as CloseIcon } from 'react-icons/tfi';

import TextElement from '../../../components/Form/TextElement';
import Modal from '../../../components/Modal/Modal';
import UsersAutocomplete from './UsersAutocomplete';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  // addNewReview: (userId: number) => Promise<string | undefined>;
}

const AddReviewModal: FC<Props> = ({ isOpen, closeModal }) => {
  const handleUserChange = () => {};

  return (
    <Modal isOpen={isOpen}>
      <div className='bg-lightColor w-[500px] h-[525px] rounded-lg opacity-95 p-5 flex flex-col gap-5 relative'>
        <header className='flex justify-between items-center text-primaryColor text-base'>
          <h3 className='font-ubuntu text-lg font-medium'>ostavi recenziju</h3>
          <button
            onClick={() => {
              closeModal();
            }}
          >
            <CloseIcon />
          </button>
        </header>

        <div className='flex flex-col gap-5'>
          <UsersAutocomplete
            label='korisnik'
            inputProps={{
              onChange: handleUserChange,
            }}
          />

          <div className='flex flex-col'>
            <label className='font-ubuntu text-base font-bold text-primaryColor'>
              ocjena
            </label>
            <div className='flex items-center gap-2'>
              <input
                value={1}
                className={`border rounded-lg p-2 px-5 flex flex-nowrap bg-transparent text-lightColor w-[130px]`}
                type='number'
              />
              <Rating value={1} size='medium' precision={0.5} />
            </div>
          </div>

          <TextElement
            label={'recenzija'}
            placeholder={'napiši recenziju'}
            labelClasses={'text-primaryColor'}
            textClasses={'placeholder-primaryColor'}
          />
        </div>

        <div className='absolute w-full flex justify-center gap-5 bottom-5 pr-10'>
          <button className='button bg-primaryColor text-lightColor !w-auto !text-base'>
            spremi
          </button>
          <button
            onClick={() => {
              closeModal();
            }}
            className='button bg-redColor text-lightColor !w-auto !text-base'
          >
            odustani
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddReviewModal;
