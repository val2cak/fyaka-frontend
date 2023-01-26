import InputElement from '../../../components/Form/InputElement';

const LookingForServiceForm = () => {
  return (
    <div className='bg-secondaryColor rounded-lg py-16 px-32 flex flex-col gap-8'>
      <div className='grid grid-cols-2 gap-10'>
        <InputElement label={'autor'} placeholder={'autor'} />

        <InputElement label={'lokacija'} placeholder={'lokacija'} />

        <InputElement label={'naslov'} placeholder={'naslov'} />

        <InputElement
          label={'vrijeme obavljanja'}
          placeholder={'vrijeme obavljanja'}
        />

        <InputElement label={'kategorija'} placeholder={'kategorija'} />

        <InputElement label={'broj osoba'} placeholder={'naslov'} />

        <InputElement label={'opis'} placeholder={'naslov'} />

        <InputElement label={'cijena usluge'} placeholder={'naslov'} />
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
