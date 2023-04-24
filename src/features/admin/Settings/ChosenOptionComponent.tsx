import { FC } from 'react';
import InputElement from '../../../components/Form/InputElement';

interface Props {
  chosenId: number;
}

const ChosenOptionComponent: FC<Props> = ({ chosenId }) => {
  return (
    <div className='bg-secondaryColor h-full rounded-lg p-6 flex flex-col gap-4 text-lightColor'>
      {chosenId === 1 && (
        <div className='flex flex-col h-full justify-between'>
          <div className='flex flex-col gap-3 w-[400px]'>
            <InputElement
              label='stara lozinka'
              placeholder='xxxxxxxx'
              labelClasses={'text-primaryColor'}
              inputClasses={'placeholder:opacity-70 h-12 text-darkColor'}
              inputProps={{}}
            />
            <InputElement
              label='nova lozinka'
              placeholder='upiši novu lozinku...'
              labelClasses={'text-primaryColor'}
              inputClasses={'placeholder:opacity-70 h-12 text-darkColor'}
              inputProps={{}}
            />
            <InputElement
              label='ponovi lozinku'
              placeholder='ponovi lozinku...'
              labelClasses={'text-primaryColor'}
              inputClasses={'placeholder:opacity-70 h-12 text-darkColor'}
              inputProps={{}}
            />
          </div>

          <button className='button bg-primaryColor !w-auto place-self-center'>
            spremi promjene
          </button>
        </div>
      )}

      {chosenId === 2 && (
        <div className='flex flex-col h-full justify-between'>
          <div className='flex flex-col gap-3 w-[400px]'>
            <InputElement
              label='stara e-mail adresa'
              placeholder={'yourmail@mail.hr'}
              labelClasses={'text-primaryColor'}
              inputClasses={'placeholder:opacity-70 h-12 text-darkColor'}
              inputProps={{
                type: 'email',
              }}
            />

            <InputElement
              label='nova e-mail adresa'
              placeholder={'yourmail@mail.hr'}
              labelClasses={'text-primaryColor'}
              inputClasses={'placeholder:opacity-70 h-12 text-darkColor'}
              inputProps={{
                type: 'email',
              }}
            />
          </div>

          <button className='button bg-primaryColor !w-auto place-self-center'>
            spremi promjene
          </button>
        </div>
      )}

      {chosenId === 3 && <div></div>}
    </div>
  );
};

export default ChosenOptionComponent;
