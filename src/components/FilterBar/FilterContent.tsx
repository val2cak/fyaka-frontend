import { Slider, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FC, useEffect, useState } from 'react';
import { useGetServicesListQuery } from '../../features/guest/ServicesList/servicesApiSlice';
import { Filters } from '../../types/typeDefinitions';
import DatePickerElement from '../Form/DatePickerElement';

interface Props {
  name: string;
  filters: Filters;
  setFilters: (item: Filters) => void;
}

const FilterContent: FC<Props> = ({ name, filters, setFilters }) => {
  const { data: servicesListData, isFetching: isServicesListDataLoading } =
    useGetServicesListQuery({});

  const servicesData = servicesListData?.services ?? [];

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
  };

  const handleMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (isNaN(value)) {
      setMaxPrice(0);
    } else {
      setMaxPrice(value);
    }
  };

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setMinPrice(newValue[0] as number);
    setMaxPrice(newValue[1] as number);
  };

  useEffect(() => {
    setMinPrice(minDataPrice);
    setMaxPrice(maxDataPrice);
  }, [minDataPrice, maxDataPrice]);

  const [people, setPeople] = useState(0);

  const handlePeopleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    if (isNaN(value)) {
      setPeople(0);
    } else {
      setPeople(value);
    }
  };

  const [minDate, setMinDate] = useState<Date | null>(null);
  const [maxDate, setMaxDate] = useState<Date | null>(null);

  useEffect(() => {
    const earliestDate = servicesData.reduce(
      (earliest: Date, service: any) =>
        earliest > new Date(service.date) ? new Date(service.date) : earliest,
      new Date()
    );

    const latestDate = servicesData.reduce(
      (latest: Date, service: any) =>
        latest < new Date(service.date) ? new Date(service.date) : latest,
      new Date(0)
    );

    setMinDate(earliestDate);
    setMaxDate(latestDate);
  }, [servicesData]);

  const handleMinDateChange = (date: Date | null) => {
    if (date) {
      setMinDate(date);
    }
  };

  const handleMaxDateChange = (date: Date | null) => {
    if (date) {
      setMaxDate(date);
    }
  };

  useEffect(() => {
    setFilters({
      ...filters,
      minPrice: minPrice,
      maxPrice: maxPrice,
      people: people,
      minDate: minDate,
      maxDate: maxDate,
    });
  }, [setFilters, minPrice, maxPrice, people, minDate, maxDate]);

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

          {name === 'vrijeme obavljanja' && (
            <div className='flex flex-col gap-4'>
              <DatePickerElement
                label={'OD'}
                labelClasses={'text-primaryColor'}
                inputClasses={
                  '!placeholder-primaryColor bg-transparent !fill-lightColor date-filter'
                }
                inputProps={{
                  onChange: handleMinDateChange,
                }}
              />

              <DatePickerElement
                label={'DO'}
                labelClasses={'text-primaryColor'}
                inputClasses={
                  '!placeholder-primaryColor bg-transparent !fill-lightColor date-filter'
                }
                inputProps={{
                  onChange: handleMaxDateChange,
                }}
              />
            </div>
          )}

          {name === 'ocjena korisnika' && <></>}

          {name === 'kategorija' && <></>}

          {name === 'lokacija' && <></>}

          {name === 'broj osoba' && (
            <>
              <input
                value={people}
                onChange={handlePeopleInputChange}
                className={`border rounded-lg p-2 px-5 flex flex-nowrap bg-transparent text-lightColor w-20`}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default FilterContent;
