import { Rating } from '@mui/material';
import RatingCard from '../../../components/Card/RatingCard';
import TitleBar from '../../../components/TitleBar/TitleBar';
import placeholder from '../../../assets/vectors/profile-placeholder.png';
import arrow from '../../../assets/shapes/arrow-right-orange.png';

const Cards = [
  {
    author: 'marko5ovic',
    rating: 5.0,
    text: 'Simpaticna, radisna i pristupacna! Za svaku preporuku!',
  },
  {
    author: 'ivanaa',
    rating: 4.0,
    text: 'Sve skupa mogu reci da je cura stvarno okej s tim da nema iskustva s cuvanjem djece tako da mislim da je moglo ici malo i bolje al sve skupa okej',
  },
  {
    author: 'mary6',
    rating: 4.0,
    text: 'Solidno',
  },
  {
    author: 'tosamjaante',
    rating: 4.5,
    text: 'Osim sto je malo kasnila drugo sve je za svaku pohvalu. Samo malo vise odgovornosti ali to ce valjuda doci s godinama',
  },
  {
    author: 'zdravko123',
    rating: 3.0,
    text: 'Srednja zalost! Cura nije znala ni upaliti aparat za kavu. ',
  },
  {
    author: 'inainaa',
    rating: 5.0,
    text: 'Predivna, sposobna i simpaticna. Necete pozaliti ako s njom poslujete. Nemam rijeci.',
  },
];

const RatingsContainer = () => {
  return (
    <main>
      <TitleBar title={'ocjene'} />

      <div className='flex flex-col px-32 py-8 gap-4 w-full'>
        <div className='flex gap-8 justify-start items-center'>
          <div className='w-[50px] h-[50px]'>
            <img
              src={placeholder}
              onError={(event: any) => {
                event.target.src = placeholder;
              }}
              alt='profile'
            />
          </div>

          <div className='text-sm font-bold flex justify-center items-center gap-2'>
            <div className='font-bold'>4.0</div>
            <Rating
              name='read-only'
              value={4.0}
              readOnly
              size='medium'
              precision={0.5}
            />
          </div>

          <div className='uppercase font-medium text-sm'>
            broj ocjena korisnika: {Cards.length}
          </div>
        </div>

        <div className='flex flex-wrap justify-between items-center flex-row gap-4 w-full'>
          {Cards.map((item, index) => (
            <RatingCard
              key={index}
              author={item.author}
              rating={item.rating}
              text={item.text}
            />
          ))}
        </div>

        <div className='w-full flex justify-center gap-16 pt-4'>
          <button className='transition ease-in-out delay-150 hover:-translate-x-4 duration-300'>
            <img
              src={arrow}
              alt='arrow left'
              className='object-fill h-18 w-36 -rotate-180'
            />
          </button>
          <button className='transition ease-in-out delay-150 hover:translate-x-4 duration-300'>
            <img
              src={arrow}
              alt='arrow right'
              className='object-fill h-18 w-36'
            />
          </button>
        </div>
      </div>
    </main>
  );
};

export default RatingsContainer;
