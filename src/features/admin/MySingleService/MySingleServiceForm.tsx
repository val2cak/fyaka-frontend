import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AutocompleteElement from '../../../components/Form/AutocompleteElement';
import DateTimePickerElement from '../../../components/Form/DateTimePickerElement';
import DropdownElement from '../../../components/Form/DropdownElement';
import InputElement from '../../../components/Form/InputElement';
import TextElement from '../../../components/Form/TextElement';
import useNotifications from '../../../hooks/useNotifications';
import { Lookup, ServiceProps } from '../../../types/typeDefinitions';
import {
  useDeleteServiceMutation,
  useGetCategoriesQuery,
  useUpdateServiceMutation,
} from '../../guest/ServicesList/servicesApiSlice';

const MySingleServiceForm: FC<ServiceProps> = ({ ...data }) => {
  const { data: categoriesData, isFetching: isCategoriesDataLoading } =
    useGetCategoriesQuery();

  const navigateTo = useNavigate();

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [formData, setFormData] = useState<ServiceProps>(data);

  const handleDateChange = (newValue: Date) => {
    setFormData({ ...formData, date: newValue });
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

  const [updateService] = useUpdateServiceMutation();

  const [deleteService] = useDeleteServiceMutation();

  const { handleUserActionNotification, handlePromiseNotification } =
    useNotifications();

  const handleSave = () => {
    try {
      handlePromiseNotification(
        updateService({
          ...formData,
          id: data.id,
          authorId: data.author.id,
        }).unwrap(),
        {
          success: {
            message: 'Usluga ažurirana!',
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
      navigateTo(-1);
    } catch (error: any) {
      handleUserActionNotification({
        message: error.data.message,
        autoClose: 2500,
        type: 'error',
      });
    }
  };

  const handleDelete = () => {
    if (window.confirm('Sigurno želite izbrisati uslugu?'))
      try {
        handlePromiseNotification(deleteService(data.id).unwrap(), {
          success: {
            message: 'Usluga izbrisana!',
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
        });

        navigateTo(-2);
      } catch (error: any) {
        handleUserActionNotification({
          message: error.data.message,
          autoClose: 2500,
          type: 'error',
        });
      }
  };

  const handleCategoryChange = (item: Lookup) => {
    setFormData({ ...formData, categoryId: item.id });
    setHasUnsavedChanges(true);
  };

  const handleLocationChange = (value) => {
    setFormData({ ...formData, location: value });
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
            label={'cijena usluge (€)'}
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
              'placeholder-primaryColor bg-lightColor text-darkColor'
            }
            inputProps={{
              onChange: handleDateChange,
              defaultValue: new Date(data.date),
            }}
          />
        </div>

        <div className='w-1/2 flex flex-col gap-6'>
          <AutocompleteElement
            label={'lokacija'}
            inputProps={{
              onChange: handleLocationChange,
              defaultValue: {
                name: data.location.split(',')[0],
                adminName1: data.location.split(', ')[1],
              },
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

          <TextElement
            label={'opis'}
            placeholder={'opis'}
            labelClasses={'text-primaryColor'}
            textClasses={
              'placeholder-primaryColor bg-lightColor text-darkColor'
            }
            textProps={{
              onChange: handleFormInputChange('description'),
              defaultValue: data.description,
              type: 'text',
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
