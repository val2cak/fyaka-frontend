import { Slider } from '@mui/material';
import { FC, useEffect, useState } from 'react';

import { useGetServicesListQuery } from '../../features/guest/ServicesList/servicesApiSlice';

interface Props {
  filter: string;
}

const FilterContent: FC<Props> = ({ filter }) => {
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

  return (
    <>
      {!isServicesListDataLoading && (
        <>
          {filter === 'cijena' && (
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

          {filter === 'vrijeme obavljanja' && <></>}

          {filter === 'ocjena korisnika' && <></>}

          {filter === 'kategorija' && <></>}

          {filter === 'lokacija' && <></>}

          {filter === 'broj osoba' && (
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
