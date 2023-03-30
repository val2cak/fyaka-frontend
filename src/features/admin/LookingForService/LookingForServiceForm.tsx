import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DatePickerElement from '../../../components/Form/DatePickerElement';

import InputElement from '../../../components/Form/InputElement';
import TextElement from '../../../components/Form/TextElement';
import { getUserFromStorage } from '../../../services/storage';
import { NewService, ServiceProps, User } from '../../../types/typeDefinitions';
import { useCreateServiceMutation } from '../../guest/ServicesList/servicesApiSlice';

const LookingForServiceForm = () => {
  const navigateTo = useNavigate();

  const [createService] = useCreateServiceMutation();

  const userJson: string | null = getUserFromStorage();
  const user: User | null = userJson ? JSON.parse(userJson).user : null;

  const [formData, setFormData] = useState<NewService>();

  const handlePublish = () => {
    try {
      createService({
        ...formData,
        authorId: user.id,
      })
        .unwrap()
        .then(() => navigateTo('/services-list'));
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDateChange = (newValue: Date) => {
    setFormData({ ...formData, date: newValue });
  };

  const handleFormInputChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      switch (name) {
        case 'title':
          setFormData({ ...formData, title: event.target.value });
          break;
        case 'description':
          setFormData({ ...formData, description: event.target.value });
          break;
        case 'location':
          setFormData({ ...formData, location: event.target.value });
          break;
        case 'date':
          setFormData({ ...formData, date: new Date(event.target.value) });
          break;
        case 'people':
          setFormData({ ...formData, people: Number(event.target.value) });
          break;
        case 'price':
          setFormData({ ...formData, price: Number(event.target.value) });
          break;
        default:
          return '';
      }
    };

  return (
    <div className='bg-secondaryColor rounded-lg py-12 px-32 flex flex-col gap-8'>
      <div className='grid grid-cols-2 gap-8'>
        <InputElement
          label={'autor'}
          placeholder={'autor'}
          labelClasses={'text-primaryColor'}
          inputClasses={'placeholder-primaryColor bg-lightColor'}
          inputProps={{ disabled: true, value: user.username }}
        />

        <InputElement
          label={'lokacija'}
          placeholder={'lokacija'}
          labelClasses={'text-primaryColor'}
          inputClasses={'placeholder-primaryColor'}
          inputProps={{
            onChange: handleFormInputChange('location'),
          }}
        />

        <InputElement
          label={'naslov'}
          placeholder={'naslov'}
          labelClasses={'text-primaryColor'}
          inputClasses={'placeholder-primaryColor'}
          inputProps={{
            onChange: handleFormInputChange('title'),
          }}
        />

        <DatePickerElement
          label={'vrijeme obavljanja'}
          labelClasses={'text-primaryColor'}
          inputClasses={
            '!placeholder-primaryColor bg-lightColor !color-primaryColor'
          }
          inputProps={{
            onChange: handleDateChange,
          }}
        />

        {/* <InputElement
          label={'kategorija'}
          placeholder={'kategorija'}
          labelClasses={'text-primaryColor'}
          inputClasses={'placeholder-primaryColor'}
        /> */}

        <InputElement
          label={'broj osoba'}
          placeholder={'broj osoba'}
          labelClasses={'text-primaryColor'}
          inputClasses={'placeholder-primaryColor'}
          inputProps={{
            onChange: handleFormInputChange('people'),
            type: 'number',
          }}
        />

        <TextElement
          label={'opis'}
          placeholder={'opis'}
          labelClasses={'text-primaryColor'}
          textClasses={'placeholder-primaryColor'}
          textProps={{
            onChange: handleFormInputChange('description'),
          }}
        />

        <InputElement
          label={'cijena usluge (€)'}
          placeholder={'cijena usluge'}
          labelClasses={'text-primaryColor'}
          inputClasses={`placeholder-primaryColor`}
          inputProps={{
            onChange: handleFormInputChange('price'),
            type: 'number',
          }}
        />
      </div>

      <div className='flex justify-center items-center pt-4'>
        <button
          className='button bg-primaryColor text-lightColor h-[60px]'
          onClick={handlePublish}
        >
          objavi
        </button>
      </div>
    </div>
  );
};

export default LookingForServiceForm;
