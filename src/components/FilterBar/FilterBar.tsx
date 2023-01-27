import { Checkbox, FormControlLabel, Slider } from '@mui/material';
import {
  ImPlus as MaximizeIcon,
  ImMinus as MinimizeIcon,
} from 'react-icons/im';

const FilterBar = () => {
  return (
    <div className='font-ubuntu uppercase text-lightColor font-bold text-sm flex flex-col border border-darkColor border-opacity-40 rounded-lg'>
      <div className='flex flex-col items-start justify-start w-full border-b border-darkColor border-opacity-40 p-4 px-12'>
        <div className='flex flex-row justify-between w-full font-bold text-base py-2 gap-3'>
          <h3>cijena</h3>
          <button className='font-bold text-sm'>
            <MinimizeIcon />
          </button>
        </div>

        <div className='flex flex-row gap-10'>
          <p className='border rounded-lg px-5 p-2'>0 €</p>
          <p className='border rounded-lg px-5 p-2'>2000+ €</p>
        </div>
        <Slider
          getAriaLabel={() => 'Price range'}
          value={[0, 2000]}
          valueLabelDisplay='auto'
          step={100}
          min={0}
          max={2000}
          sx={{ color: '#FAFAFA' }}
        />
      </div>

      <div className='flex flex-col items-start justify-start w-full border-b border-darkColor border-opacity-40 p-4 px-12'>
        <div className='flex flex-row justify-between w-full font-bold text-base py-2 gap-3'>
          <h3>trajanje</h3>
          <button className='font-bold text-sm'>
            <MinimizeIcon />
          </button>
        </div>
        <div className='flex flex-col'>
          <FormControlLabel
            label='1 sat'
            control={<Checkbox sx={{ color: '#FAFAFA' }} />}
          />
          <FormControlLabel
            label='2 sata'
            control={<Checkbox sx={{ color: '#FAFAFA' }} />}
          />
          <FormControlLabel
            label='3 sata'
            control={<Checkbox sx={{ color: '#FAFAFA' }} />}
          />
          <FormControlLabel
            label='> tjedan dana'
            control={<Checkbox sx={{ color: '#FAFAFA' }} />}
          />
        </div>
      </div>

      <div className='flex flex-col items-start justify-start w-full border-b border-darkColor border-opacity-40 p-4 px-12'>
        <div className='flex flex-row justify-between w-full font-bold text-base py-2 gap-3'>
          <h3>ocjena korisnika</h3>
          <button className='font-bold text-sm'>
            <MaximizeIcon />
          </button>
        </div>
      </div>

      <div className='flex flex-col items-start justify-start w-full border-b border-darkColor border-opacity-40 p-4 px-12'>
        <div className='flex flex-row justify-between w-full font-bold text-base py-2 gap-3'>
          <h3>kategorija</h3>
          <button className='font-bold text-sm'>
            <MaximizeIcon />
          </button>
        </div>
      </div>

      <div className='flex flex-col items-start justify-start w-full p-4 px-12'>
        <div className='flex flex-row justify-between w-full font-bold text-base py-2 gap-3'>
          <h3>lokacija</h3>
          <button className='font-bold text-sm'>
            <MaximizeIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
