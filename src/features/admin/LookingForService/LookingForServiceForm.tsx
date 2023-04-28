import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AutocompleteElement from '../../../components/Form/AutocompleteElement';
import DateTimePickerElement from '../../../components/Form/DateTimePickerElement';
import DropdownElement from '../../../components/Form/DropdownElement';

import InputElement from '../../../components/Form/InputElement';
import TextElement from '../../../components/Form/TextElement';
import useNotifications from '../../../hooks/useNotifications';
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

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const { handleUserActionNotification, handlePromiseNotification } =
    useNotifications();

  const handlePublish = () => {
    try {
      handlePromiseNotification(
        createService({
          ...formData,
          authorId: user.id,
        })
          .unwrap()
          .then(() => navigateTo('/services-list')),
        {
          success: {
            message: 'Usluga dodana!',
            type: 'success',
          },
          pending: {
            message: 'Učitavanje...',
            type: 'info',
          },
          error: {
            message: 'Nešto je pošlo po zlu!',
            type: 'error',
          },
        }
      );

      setHasUnsavedChanges(false);
    } catch (error: any) {
      handleUserActionNotification({
        message: error.data.message,
        autoClose: 2500,
        type: 'error',
      });
    }
  };

  const handleDateChange = (newValue: Date) => {
    setFormData({ ...formData, date: newValue });
    setHasUnsavedChanges(true);
  };

  const handleLocationChange = (value) => {
    setFormData({ ...formData, location: value });
    setHasUnsavedChanges(true);
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

      setHasUnsavedChanges(true);
    };

  const handleCategoryChange = (item: Lookup) => {
    setFormData({ ...formData, categoryId: item.id });
    setHasUnsavedChanges(true);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue =
          'Niste spremili promjene. Sigurno želite napustiti stranicu?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  return (
    <div className='bg-secondaryColor rounded-lg py-12 px-32 flex flex-col gap-8'>
      <div className='flex flex-row justify-evenly gap-10'>
        <div className='w-1/2 flex flex-col gap-6'>
          <InputElement
            label={'naslov'}
            placeholder={'naslov'}
            labelClasses={'text-primaryColor'}
            inputClasses={'placeholder-primaryColor'}
            inputProps={{
              onChange: handleFormInputChange('title'),
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

          {!isCategoriesDataLoading && (
            <DropdownElement
              label={'kategorija'}
              placeholder={'kategorija'}
              labelClasses={'text-primaryColor'}
              handleSelect={handleCategoryChange}
              data={categoriesData}
              selectedId={formData?.categoryId}
            />
          )}

          <DateTimePickerElement
            label={'vrijeme obavljanja'}
            labelClasses={'text-primaryColor'}
            inputClasses={
              '!placeholder-primaryColor bg-lightColor !color-primaryColor'
            }
            inputProps={{
              onChange: handleDateChange,
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
