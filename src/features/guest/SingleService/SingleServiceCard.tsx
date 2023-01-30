import { ServiceFormProps } from '../../../types/typeDefinitions';
import {
  AiFillHeart as FavoriteFilledIcon,
  AiOutlineHeart as FavoriteOutlinedIcon,
} from 'react-icons/ai';
import { useState } from 'react';

const SingleServiceCard = (props: { service: ServiceFormProps }) => {
  const [favorite, setFavorite] = useState(false);

  return (
    <div className='bg-lightColor rounded-lg p-8 flex flex-col gap-8'>
      <button
        onClick={() => setFavorite(!favorite)}
        className='uppercase w-full flex justify-end text-primaryColor'
      >
        {favorite ? (
          <div className='flex justify-center items-center gap-2'>
            ukloni iz favorita <FavoriteFilledIcon className='text-md' />
          </div>
        ) : (
          <div className='flex justify-center items-center gap-2'>
            dodaj u favorite <FavoriteOutlinedIcon className='text-md' />
          </div>
        )}
      </button>

      <div className='flex flex-row gap-5 pb-8 px-32'>
        <ul className='font-ubuntu font-bold text-primaryColor text-base flex flex-col gap-8 w-2/5'>
          <li>autor</li>
          <li>naslov</li>
          <li>kategorija</li>
          <li>opis</li>
          <li></li>
          <li></li>
          <li>lokacija</li>
          <li>cijena usluge</li>
          <li>vrijeme obavljanja</li>
          <li>broj osoba</li>
        </ul>

        <ul className='font-raleway text-base flex flex-col gap-8'>
          <li>{props.service.author}</li>
          <li>{props.service.title}</li>
          <li>{props.service.category}</li>
          <li>{props.service.description}</li>

          <li>{props.service.location}</li>
          <li>{props.service.price}</li>
          <li>{props.service.date}</li>
          <li>{props.service.people}</li>
        </ul>
      </div>

      <div className='flex justify-center items-center'>
        <button className='button bg-primaryColor text-lightColor'>
          pošalji poruku
        </button>
      </div>
    </div>
  );
};

export default SingleServiceCard;
