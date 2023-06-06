import { Checkbox, FormControlLabel, FormGroup, Slider } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';

import {
  useGetCategoriesQuery,
  useGetServicesListQuery,
} from '../../features/guest/ServicesList/servicesApiSlice';
import { Filters, Location, Lookup } from '../../types/typeDefinitions';
import DateTimePickerElement from '../Form/DateTimePickerElement';
import LocationsAutocomplete from '../Locations/LocationsAutocomplete';

interface Props {
  name: string;
  filters: Filters;
  setFilters: (item: Filters) => void;
}

const userRatingsList = [5.0, 4.0, 3.0, 2.0, 1.0];

const FilterContent: FC<Props> = ({ name, filters, setFilters }) => {
  const { data: servicesListData, isFetching: isServicesListDataLoading } =
    useGetServicesListQuery({});

  const { data: categoriesData, isFetching: isCategoriesDataLoading } =
    useGetCategoriesQuery();

  const servicesData = useMemo(() => {
    return servicesListData?.services ?? [];
  }, [servicesListData]);

  const [isChanged, setIsChanged] = useState(false);

  const minDataPrice =
    Math.min(...servicesData?.map((item) => item.price)) ?? 0;
  const maxDataPrice =
    Math.max(...servicesData?.map((item) => item.price)) ?? 0;

  const [minPrice, setMinPrice] = useState(minDataPrice);
  const [maxPrice, setMaxPrice] = useState(maxDataPrice);

  const handleMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (isNaN(value)) {
      setMinPrice(0);
    } else {
      setMinPrice(value);
    }

    setIsChanged(true);
  };

  const handleMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (isNaN(value)) {
      setMaxPrice(undefined);
    } else {
      setMaxPrice(value);
    }

    setIsChanged(true);
  };

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setMinPrice(newValue[0] as number);
    setMaxPrice(newValue[1] as number);

    setIsChanged(true);
  };

  useEffect(() => {
    setMinPrice(minDataPrice);
    setMaxPrice(maxDataPrice);
  }, [minDataPrice, maxDataPrice]);

  const [people, setPeople] = useState<number>();

  const handlePeopleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    if (isNaN(value)) {
      setPeople(undefined);
    } else {
      setPeople(value);
    }

    setIsChanged(true);
  };

  const [minDate, setMinDate] = useState<Date | null>(null);
  const [maxDate, setMaxDate] = useState<Date | null>(null);

  useEffect(() => {
    const earliestDate = servicesData.reduce(
      (earliest: Date, service: any) =>
        earliest > new Date(service.date) ? new Date(service.date) : earliest,
      undefined
    );

    const latestDate = servicesData.reduce(
      (latest: Date, service: any) =>
        latest < new Date(service.date) ? new Date(service.date) : latest,
      undefined
    );

    earliestDate && setMinDate(earliestDate);
    latestDate && setMaxDate(latestDate);
  }, [servicesData]);

  const handleMinDateChange = (date: Date | null) => {
    if (date) {
      setMinDate(date);
    }

    setIsChanged(true);
  };

  const handleMaxDateChange = (date: Date | null) => {
    if (date) {
      setMaxDate(date);
    }

    setIsChanged(true);
  };

  const [category, setCategory] = useState<Lookup[]>([]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = parseInt(event.target.value, 10);
    const checked = event.target.checked;
    if (checked) {
      setCategory([
        ...category,
        categoriesData?.find((item) => item.id === categoryId),
      ]);
    } else {
      setCategory(category.filter((item) => item.id !== categoryId));
    }

    setIsChanged(true);
  };

  const [location, setLocation] = useState('');
  const [defaultLocation, setDefaultLocation] = useState<Location>();

  const handleLocationChange = (value) => {
    setLocation(value);

    setIsChanged(true);
  };

  useEffect(() => {
    location !== '' &&
      setDefaultLocation({
        name: location.split(',')[0],
        adminName1: location.split(', ')[1],
      });
  }, [location]);

  const [defaultMinDate, setDefaultMinDate] = useState<Date>();
  const [defaultMaxDate, setDefaultMaxDate] = useState<Date>();

  useEffect(() => {
    minDate !== null && setDefaultMinDate(minDate);
    maxDate !== null && setDefaultMaxDate(maxDate);
  }, [minDate, maxDate]);

  const [userRating, setUserRating] = useState<number>();

  const handleUserRatingChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    if (checked) {
      setUserRating(parseInt(event.target.value));
    } else {
      setUserRating(undefined);
    }

    setIsChanged(true);
  };

  useEffect(() => {
    if (name === 'cijena' && isChanged)
      setFilters({ ...filters, minPrice: minPrice, maxPrice: maxPrice });
    else if (name === 'vrijeme obavljanja' && isChanged)
      setFilters({
        ...filters,
        minDate: minDate,
        maxDate: maxDate,
      });
    else if (name === 'kategorija' && isChanged)
      setFilters({
        ...filters,
        categoryId: category?.map((item) => item.id),
      });
    else if (name === 'lokacija' && isChanged)
      setFilters({
        ...filters,
        location: location,
      });
    else if (name === 'broj osoba' && isChanged)
      setFilters({
        ...filters,
        people: people,
      });
    else if (name === 'ocjena korisnika' && isChanged)
      setFilters({
        ...filters,
        userRating: userRating,
      });
  }, [
    setFilters,
    minPrice,
    maxPrice,
    people,
    minDate,
    maxDate,
    category,
    location,
    userRating,
  ]);

  return (
    <>
      {!isServicesListDataLoading && (
        <>
          {name === 'cijena' && (
            <div className='flex flex-col w-full gap-4'>
              <div className='flex flex-row justify-between w-full'>
                <div className='relative'>
                  <span className='absolute inset-y-0 right-0 flex items-center pr-3 text-lightColor'>
                    €
                  </span>
                  <input
                    value={minPrice}
                    onChange={handleMinInputChange}
                    className={`border rounded-lg p-2 px-5 flex flex-nowrap bg-transparent text-lightColor w-20 pr-7`}
                  />
                </div>

                <div className='relative'>
                  <span className='absolute inset-y-0 right-0 flex items-center pr-3 text-lightColor'>
                    €
                  </span>
                  <input
                    value={maxPrice}
                    onChange={handleMaxInputChange}
                    className='border rounded-lg px-5 p-2 flex flex-nowrap bg-transparent text-lightColor w-20 pr-7'
                  />
                </div>
              </div>

              <Slider
                getAriaLabel={() => 'Price range'}
                valueLabelDisplay='auto'
                step={10}
                value={[minPrice, maxPrice]}
                min={minDataPrice}
                max={maxDataPrice}
                onChange={handleSliderChange}
                sx={{ color: '#FAFAFA' }}
              />
            </div>
          )}

          {name === 'vrijeme obavljanja' && !isServicesListDataLoading && (
            <div className='flex flex-col gap-4'>
              <DateTimePickerElement
                label={'OD'}
                labelClasses={'text-primaryColor text-sm'}
                inputClasses={
                  '!placeholder-primaryColor bg-transparent !fill-lightColor date-filter'
                }
                inputProps={{
                  onChange: handleMinDateChange,
                  defaultValue: new Date(defaultMinDate),
                }}
              />

              <DateTimePickerElement
                label={'DO'}
                labelClasses={'text-primaryColor text-sm'}
                inputClasses={
                  '!placeholder-primaryColor bg-transparent !fill-lightColor date-filter'
                }
                inputProps={{
                  onChange: handleMaxDateChange,
                  defaultValue: new Date(defaultMaxDate),
                }}
              />
            </div>
          )}

          {name === 'ocjena korisnika' && (
            <FormGroup className='w-[225px]'>
              {userRatingsList?.map((item) => {
                const checked = filters?.userRating === item;
                return (
                  <FormControlLabel
                    key={item}
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={handleUserRatingChange}
                        value={item}
                      />
                    }
                    label={
                      item === 5.0 ? item?.toFixed(1) : `> ${item?.toFixed(1)}`
                    }
                    className='filter-checkbox'
                  />
                );
              })}
            </FormGroup>
          )}

          {name === 'kategorija' && !isCategoriesDataLoading && (
            <FormGroup className='w-[225px]'>
              {categoriesData?.map((item) => {
                const checked = category?.some((cat) => cat.id === item.id);
                return (
                  <FormControlLabel
                    key={item.id}
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={handleCategoryChange}
                        value={item.id}
                      />
                    }
                    label={item.name}
                    className='filter-checkbox'
                  />
                );
              })}
            </FormGroup>
          )}

          {name === 'lokacija' && (
            <LocationsAutocomplete
              inputProps={{
                onChange: handleLocationChange,
                defaultValue: defaultLocation,
              }}
              className={
                'bg-transparent !text-lightColor border border-lightColor autocomplete-filter'
              }
            />
          )}

          {name === 'broj osoba' && (
            <>
              <input
                value={people}
                onChange={handlePeopleInputChange}
                className={`border rounded-lg p-2 px-5 flex flex-nowrap bg-transparent text-lightColor w-[130px]`}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default FilterContent;
