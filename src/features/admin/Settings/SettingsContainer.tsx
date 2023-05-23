import { useEffect, useState } from 'react';
import { IoArrowUndoCircleSharp as ArrowBackIcon } from 'react-icons/io5';

import TitleBar from '../../../components/TitleBar/TitleBar';
import { Lookup } from '../../../types/typeDefinitions';
import ChangeEmailComponent from './ChangeEmailComponent';
import ChangePasswordComponent from './ChangePasswordComponent';
import DeleteAccountComponent from './DeleteAccountComponent';
import OptionsListComponent from './OptionsListComponent';

const options: Lookup[] = [
  { id: 1, name: 'Promijeni lozinku' },
  { id: 2, name: 'Promijeni e-mail adresu' },
  { id: 3, name: 'Izbriši račun' },
];

const SettingsContainer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [chosenId, setChosenId] = useState(isMobile ? undefined : 1);

  const handleGoBack = () => {
    setChosenId(undefined);
  };

  return (
    <main className='bg-lightColor'>
      <TitleBar title={'postavke'} />

      {chosenId && (
        <button
          onClick={handleGoBack}
          className='text-secondaryColor text-3xl m-3 absolute transition ease-in-out delay-50 hover:scale-110 duration-300'
        >
          <ArrowBackIcon />
        </button>
      )}

      <div
        className={`${
          chosenId && 'sm:pt-[4.25rem]'
        } flex flex-row sm:px-4 lg:px-32 px-48 sm:py-4 py-10 w-full gap-4 h-[500px] 2xl:h-[900px]`}
      >
        {isMobile ? (
          !chosenId ? (
            <OptionsListComponent
              options={options}
              chosenId={chosenId}
              setChosenId={setChosenId}
            />
          ) : chosenId === 1 ? (
            <ChangePasswordComponent />
          ) : chosenId === 2 ? (
            <ChangeEmailComponent />
          ) : (
            chosenId === 3 && <DeleteAccountComponent />
          )
        ) : (
          <>
            <div className='sm:w-full w-1/3'>
              <OptionsListComponent
                options={options}
                chosenId={chosenId}
                setChosenId={setChosenId}
              />
            </div>
            <div className='sm:w-full w-2/3'>
              {chosenId === 1 && <ChangePasswordComponent />}
              {chosenId === 2 && <ChangeEmailComponent />}
              {chosenId === 3 && <DeleteAccountComponent />}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default SettingsContainer;
