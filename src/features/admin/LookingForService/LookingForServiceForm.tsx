import InputElement from '../../../components/Form/InputElement';

const LookingForServiceForm = () => {
  return (
    <div className='bg-secondaryColor rounded-lg py-16 px-32 flex flex-col gap-8'>
      <div className='grid grid-cols-2 gap-10'>
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
          placeholder={'naslov'}
          labelClasses={'text-primaryColor'}
          inputClasses={'placeholder-primaryColor'}
        />

        <InputElement
          label={'opis'}
          placeholder={'naslov'}
          labelClasses={'text-primaryColor'}
          inputClasses={'placeholder-primaryColor'}
        />

        <InputElement
          label={'cijena usluge'}
          placeholder={'naslov'}
          labelClasses={'text-primaryColor'}
          inputClasses={'placeholder-primaryColor'}
        />
      </div>

      <div className='flex justify-center items-center'>
        <button className='font-ubuntu bg-primaryColor text-lightColor font-bold rounded-lg px-8 py-3 text-md'>
          objavi
        </button>
      </div>
    </div>
  );
};

export default LookingForServiceForm;
