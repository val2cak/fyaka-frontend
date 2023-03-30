import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePickerElement from '../../../components/Form/DatePickerElement';

import InputElement from '../../../components/Form/InputElement';
import TextElement from '../../../components/Form/TextElement';
import { ServiceProps } from '../../../types/typeDefinitions';
import {
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} from '../../guest/ServicesList/servicesApiSlice';

const MySingleServiceForm: FC<ServiceProps> = ({ ...data }) => {
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState<ServiceProps>(data);

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

  const [updateService] = useUpdateServiceMutation();

  const [deleteService] = useDeleteServiceMutation();

  const handleSave = () => {
    try {
      updateService({
        ...formData,
        id: data.id,
        authorId: data.author.id,
      }).unwrap();

      navigateTo('/my-services');
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Sigurno želite izbrisati uslugu?'))
      try {
        deleteService(data.id).unwrap();

        navigateTo('/my-services');
      } catch (error: any) {
        console.log(error);
      }
  };

  return (
    <div className='bg-secondaryColor rounded-lg py-12 px-32 flex flex-col gap-8'>
      <div className='flex flex-row justify-evenly gap-10'>
        <div className='w-1/2 flex flex-col gap-6'>
          <InputElement
            label={'naslov'}
            placeholder={'naslov'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              'placeholder-primaryColor bg-lightColor text-darkColor'
            }
            inputProps={{
              onChange: handleFormInputChange('title'),
              defaultValue: data.title,
              type: 'text',
            }}
          />

          <InputElement
            label={'autor'}
            placeholder={'autor'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              'placeholder-primaryColor bg-lightColor text-darkColor'
            }
            inputProps={{ defaultValue: data.author.username, disabled: true }}
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
            placeholder={'opis'}
            labelClasses={'text-primaryColor'}
            textClasses={
              'placeholder-primaryColor h-[184px] bg-lightColor text-darkColor'
            }
            textProps={{
              onChange: handleFormInputChange('description'),
              defaultValue: data.description,
              type: 'text',
            }}
          />
        </div>

        <div className='w-1/2 flex flex-col gap-6'>
          <InputElement
            label={'lokacija'}
            placeholder={'lokacija'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              'placeholder-primaryColor bg-lightColor text-darkColor'
            }
            inputProps={{
              onChange: handleFormInputChange('location'),
              defaultValue: data.location,
              type: 'text',
            }}
          />

          <DatePickerElement
            label={'vrijeme obavljanja'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              'placeholder-primaryColor bg-lightColor text-darkColor'
            }
            inputProps={{
              onChange: handleDateChange,
              defaultValue: new Date(data.date),
            }}
          />

          <InputElement
            label={'broj osoba'}
            placeholder={'naslov'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              'placeholder-primaryColor bg-lightColor text-darkColor'
            }
            inputProps={{
              onChange: handleFormInputChange('people'),
              defaultValue: data.people,
              type: 'number',
            }}
          />

          <InputElement
            label={'cijena usluge'}
            placeholder={'naslov'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              'placeholder-primaryColor bg-lightColor text-darkColor'
            }
            inputProps={{
              onChange: handleFormInputChange('price'),
              defaultValue: data.price,
              type: 'number',
            }}
          />
        </div>
      </div>
      <div className='flex justify-center items-center gap-4 pt-4'>
        <button
          onClick={handleSave}
          className='button bg-primaryColor text-lightColor h-[60px] !w-auto'
        >
          spremi
        </button>
        <button
          onClick={handleDelete}
          className='button bg-redColor text-lightColor h-[60px] !w-auto'
        >
          izbriši
        </button>
      </div>
    </div>
  );
};

export default MySingleServiceForm;
