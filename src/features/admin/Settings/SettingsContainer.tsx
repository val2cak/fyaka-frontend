import { useState } from 'react';
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
  const [chosenId, setChosenId] = useState(1);

  return (
    <main className='bg-lightColor'>
      <TitleBar title={'postavke'} />

      <div className='flex flex-row px-48 py-10 w-full gap-4 h-[500px]'>
        <div className='w-1/3'>
          <OptionsListComponent
            options={options}
            chosenId={chosenId}
            setChosenId={setChosenId}
          />
        </div>
        <div className='w-2/3'>
          {chosenId === 1 && <ChangePasswordComponent />}
          {chosenId === 2 && <ChangeEmailComponent />}
          {chosenId === 3 && <DeleteAccountComponent />}
        </div>
      </div>
    </main>
  );
};

export default SettingsContainer;
