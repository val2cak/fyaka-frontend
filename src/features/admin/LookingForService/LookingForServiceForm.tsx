import InputElement from '../../../components/Form/InputElement';
import TextElement from '../../../components/Form/TextElement';

const LookingForServiceForm = () => {
  return (
    <div className='bg-secondaryColor rounded-lg py-12 px-32 flex flex-col gap-8'>
      <div className='grid grid-cols-2 gap-8'>
        <InputElement
          label={'autor'}
          placeholder={'autor'}
          labelClasses={'text-primaryColor'}
          inputClasses={'placeholder-primaryColor'}
        />

        <InputElement
          label={'lokacija'}
          placeholder={'lokacija'}
          labelClasses={'text-primaryColor'}
          inputClasses={'placeholder-primaryColor'}
        />

        <InputElement
          label={'naslov'}
          placeholder={'naslov'}
          labelClasses={'text-primaryColor'}
          inputClasses={'placeholder-primaryColor'}
        />

        <InputElement
          label={'vrijeme obavljanja'}
          placeholder={'vrijeme obavljanja'}
          labelClasses={'text-primaryColor'}
          inputClasses={'placeholder-primaryColor'}
        />

        <InputElement
          label={'kategorija'}
          placeholder={'kategorija'}
          labelClasses={'text-primaryColor'}
          inputClasses={'placeholder-primaryColor'}
        />

        <InputElement
          label={'broj osoba'}
          placeholder={'broj osoba'}
          labelClasses={'text-primaryColor'}
          inputClasses={'placeholder-primaryColor'}
        />

        <TextElement
          label={'opis'}
          placeholder={'opis'}
          labelClasses={'text-primaryColor'}
          textClasses={'placeholder-primaryColor'}
        />

        <InputElement
          label={'cijena usluge'}
          placeholder={'cijena usluge'}
          labelClasses={'text-primaryColor'}
          inputClasses={'placeholder-primaryColor'}
        />
      </div>

      <div className='flex justify-center items-center pt-4'>
        <button className='button bg-primaryColor text-lightColor h-[60px]'>
          objavi
        </button>
      </div>
    </div>
  );
};

export default LookingForServiceForm;
