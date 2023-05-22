import { FC, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
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

  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isDirty },
  } = useForm<ServiceProps>({
    mode: 'onChange',
    defaultValues: {
      ...data,
      date: new Date(data?.date),
    },
  });

  const onSubmit = (data: ServiceProps) => {
    handleSave(data);
  };

  const [updateService] = useUpdateServiceMutation();

  const [deleteService] = useDeleteServiceMutation();

  const { handleUserActionNotification, handlePromiseNotification } =
    useNotifications();

  const handleSave = (formData: ServiceProps) => {
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

      reset();
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

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue =
          'Niste spremili promjene. Sigurno želite napustiti stranicu?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-secondaryColor rounded-lg sm:py-6 py-12 2xl:py-24 sm:px-6 px-32 flex flex-col sm:gap-4 gap-8'
    >
      <div className='flex sm:flex-col flex-row justify-evenly sm:gap-4 gap-10'>
        <div className='sm:w-full w-1/2 flex flex-col sm:gap-4 gap-6'>
          <InputElement
            label='naslov'
            placeholder='naslov'
            labelClasses='text-primaryColor'
            inputClasses={`placeholder-primaryColor ${
              errors?.title?.message ? 'border-2 border-redColor' : ''
            }`}
            inputProps={register('title', {
              required: 'Ovo polje je obavezno',
              maxLength: {
                value: 20,
                message: 'Naslov može sadržavati najviše 20 znakova',
              },
            })}
            errors={errors?.title?.message}
          />

          <InputElement
            label='cijena usluge (€)'
            placeholder='cijena usluge'
            labelClasses='text-primaryColor'
            inputClasses={`placeholder-primaryColor ${
              errors?.price?.message ? 'border-2 border-redColor' : ''
            }`}
            inputProps={register('price', {
              required: 'Ovo polje je obavezno',
              valueAsNumber: true,
              min: {
                value: 1,
                message: 'Cijena mora biti veća od 0',
              },
            })}
            errors={errors?.price?.message}
          />

          {!isCategoriesDataLoading && (
            <Controller
              name='categoryId'
              control={control}
              rules={{
                required: 'Ovo polje je obavezno',
              }}
              render={({ field }) => (
                <DropdownElement
                  label='kategorija'
                  placeholder='kategorija'
                  labelClasses='text-primaryColor'
                  inputClasses={`${
                    errors?.categoryId?.message
                      ? 'border-2 border-redColor'
                      : ''
                  }`}
                  handleSelect={(item: Lookup) => {
                    field.onChange(item.id);
                  }}
                  data={categoriesData}
                  selectedId={getValues('categoryId')}
                  errors={errors?.categoryId?.message}
                />
              )}
            />
          )}

          <Controller
            name='date'
            control={control}
            rules={{
              required: 'Ovo polje je obavezno',
            }}
            render={({ field }) => (
              <DateTimePickerElement
                label='vrijeme obavljanja'
                labelClasses='text-primaryColor'
                inputClasses={`!placeholder-primaryColor bg-lightColor !color-primaryColor ${
                  errors?.date?.message ? '!border-2 !border-redColor' : ''
                }`}
                inputProps={{
                  ...field,
                }}
                errors={errors?.date?.message}
              />
            )}
          />
        </div>

        <div className='sm:w-full w-1/2 flex flex-col sm:gap-4 gap-6'>
          <Controller
            name='location'
            control={control}
            rules={{
              required: 'Ovo polje je obavezno',
            }}
            render={({ field }) => (
              <AutocompleteElement
                label='lokacija'
                inputProps={{
                  ...field,
                  defaultValue: {
                    name: data.location.split(',')[0],
                    adminName1: data.location.split(', ')[1],
                  },
                }}
                inputClasses={`placeholder-primaryColor ${
                  errors?.location?.message ? 'border-2 border-redColor' : ''
                }`}
                errors={errors?.location?.message}
              />
            )}
          />

          <InputElement
            label='broj osoba'
            placeholder='broj osoba'
            labelClasses='text-primaryColor'
            inputClasses={`placeholder-primaryColor ${
              errors?.people?.message ? 'border-2 border-redColor' : ''
            }`}
            inputProps={register('people', {
              required: 'Ovo polje je obavezno',
              valueAsNumber: true,
              min: {
                value: 1,
                message: 'Broj osoba mora biti barem 1',
              },
            })}
            errors={errors?.people?.message}
          />

          <TextElement
            label={'opis'}
            placeholder={'opis'}
            labelClasses={'text-primaryColor'}
            textClasses={`placeholder-primaryColor ${
              errors?.description?.message ? 'border-2 border-redColor' : ''
            }`}
            textProps={register('description', {
              required: 'Ovo polje je obavezno',
              maxLength: {
                value: 100,
                message: 'Opis može sadržavati najviše 100 znakova',
              },
            })}
            errors={errors?.description?.message}
          />
        </div>
      </div>
      <div className='flex justify-center items-center gap-4 pt-4'>
        <button
          type='submit'
          className='button bg-primaryColor text-lightColor h-[60px] !w-auto'
        >
          spremi
        </button>
        <button
          type='button'
          onClick={handleDelete}
          className='button bg-redColor text-lightColor h-[60px] !w-auto'
        >
          izbriši
        </button>
      </div>
    </form>
  );
};

export default MySingleServiceForm;
