import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
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

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<NewService>({
    mode: 'onChange',
    defaultValues: {
      authorId: user?.id,
    },
  });

  const { handleUserActionNotification, handlePromiseNotification } =
    useNotifications();

  const handlePublish = (formData: NewService) => {
    try {
      handlePromiseNotification(
        createService(formData)
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

      reset();
    } catch (error: any) {
      handleUserActionNotification({
        message: error.data.message,
        autoClose: 2500,
        type: 'error',
      });
    }
  };

  const onSubmit = (data: NewService) => {
    handlePublish(data);
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
      className='bg-secondaryColor rounded-lg py-12 px-32 flex flex-col gap-8'
    >
      <div className='flex flex-row justify-evenly gap-10'>
        <div className='w-1/2 flex flex-col gap-6'>
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

        <div className='w-1/2 flex flex-col gap-6'>
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

      <div className='flex justify-center items-center pt-4'>
        <button
          className='button bg-primaryColor text-lightColor h-[60px]'
          type='submit'
        >
          objavi
        </button>
      </div>
    </form>
  );
};

export default LookingForServiceForm;
