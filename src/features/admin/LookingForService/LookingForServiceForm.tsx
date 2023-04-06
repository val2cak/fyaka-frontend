import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AutocompleteElement from '../../../components/Form/AutocompleteElement';
import DatePickerElement from '../../../components/Form/DatePickerElement';
import DropdownElement from '../../../components/Form/DropdownElement';

import InputElement from '../../../components/Form/InputElement';
import TextElement from '../../../components/Form/TextElement';
import { getUserFromStorage } from '../../../services/storage';
import { Lookup, NewService, User } from '../../../types/typeDefinitions';
import {
  useCreateServiceMutation,
  useGetCategoriesQuery,
} from '../../guest/ServicesList/servicesApiSlice';

const LookingForServiceForm = () => {
  const navigateTo = useNavigate();

  const [createService] = useCreateServiceMutation();

  const { data: categoriesData, isFetching: isCategoriesDataLoading } =
    useGetCategoriesQuery();

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

  const handleLocationChange = (value) => {
    setFormData({ ...formData, location: value });
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

  const handleCategoryChange = (item: Lookup) => {
    setFormData({ ...formData, categoryId: item.id });
  };

  return (
    <div className='bg-secondaryColor rounded-lg py-12 px-32 flex flex-col gap-8'>
      <div className='flex flex-row justify-evenly gap-10'>
        <div className='w-1/2 flex flex-col gap-6'>
          <InputElement
            label={'autor'}
            placeholder={'autor'}
            labelClasses={'text-primaryColor'}
            inputClasses={'placeholder-primaryColor bg-lightColor'}
            inputProps={{ disabled: true, value: user.username }}
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

          {!isCategoriesDataLoading && (
            <DropdownElement
              label={'kategorija'}
              labelClasses={'text-primaryColor'}
              handleCategorySelect={handleCategoryChange}
              data={categoriesData}
              selectedId={formData?.categoryId}
            />
          )}

          <TextElement
            label={'opis'}
            placeholder={'opis'}
            labelClasses={'text-primaryColor'}
            textClasses={'placeholder-primaryColor'}
            textProps={{
              onChange: handleFormInputChange('description'),
            }}
          />
        </div>

        <div className='w-1/2 flex flex-col gap-6'>
          <AutocompleteElement
            label={'lokacija'}
            inputProps={{
              onChange: handleLocationChange,
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
