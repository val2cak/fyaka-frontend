import { FC } from 'react';

import InputElement from '../../../components/Form/InputElement';
import TextElement from '../../../components/Form/TextElement';
import { ServiceProps } from '../../../types/typeDefinitions';

const MySingleServiceCard: FC<ServiceProps> = ({
  title,
  description,
  location,
  date,
  people,
  price,
}) => {
  return (
    <div className='bg-secondaryColor rounded-lg py-12 px-32 flex flex-col gap-8'>
      <div className='flex flex-row justify-evenly gap-10'>
        <div className='w-1/2 flex flex-col gap-6'>
          <InputElement
            label={'naslov'}
            value={title}
            placeholder={'naslov'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              'placeholder-primaryColor bg-lightColor text-darkColor'
            }
          />

          {/* <InputElement
            label={'kategorija'}
            value={service.category}
            placeholder={'kategorija'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              'placeholder-primaryColor bg-lightColor text-darkColor'
            }
          /> */}

          <TextElement
            label={'opis'}
            value={description}
            placeholder={'naslov'}
            labelClasses={'text-primaryColor'}
            textClasses={
              'placeholder-primaryColor h-[184px] bg-lightColor text-darkColor'
            }
          />
        </div>

        <div className='w-1/2 flex flex-col gap-6'>
          <InputElement
            label={'lokacija'}
            value={location}
            placeholder={'lokacija'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              'placeholder-primaryColor bg-lightColor text-darkColor'
            }
          />

          <InputElement
            label={'vrijeme obavljanja'}
            value={new Date(date)}
            placeholder={'vrijeme obavljanja'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              'placeholder-primaryColor bg-lightColor text-darkColor'
            }
          />

          <InputElement
            label={'broj osoba'}
            value={people}
            placeholder={'naslov'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              'placeholder-primaryColor bg-lightColor text-darkColor'
            }
          />

          <InputElement
            label={'cijena usluge'}
            value={price}
            placeholder={'naslov'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              'placeholder-primaryColor bg-lightColor text-darkColor'
            }
          />
        </div>
      </div>
      <div className='flex justify-center items-center gap-4 pt-4'>
        <button className='button bg-primaryColor text-lightColor h-[60px] !w-auto'>
          spremi
        </button>
        <button className='button bg-redColor text-lightColor h-[60px] !w-auto'>
          izbriši
        </button>
      </div>
    </div>
  );
};

export default MySingleServiceCard;
