import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsChevronRight as ArrowRightIcon } from 'react-icons/bs';
import { AiFillHeart as FavoriteFilledIcon } from 'react-icons/ai';
import { format } from 'date-fns';

import { ServiceProps } from '../../types/typeDefinitions';

const ServiceCard: FC<ServiceProps> = ({
  id,
  title,
  date,
  price,
  location,
}) => {
  const navigateTo = useNavigate();

  const locationHook = useLocation();

  const flag =
    locationHook.pathname === '/my-services'
      ? 1
      : locationHook.pathname === '/favorites'
      ? 2
      : 0;

  return (
    <button
      onClick={() =>
        flag === 1
          ? navigateTo(`/my-services/${id}`)
          : flag === 2
          ? navigateTo(`/favorites/${id}`)
          : navigateTo(`/services-list/${id}`)
      }
      className={`w-[250px] h-[250px] ${
        flag === 2 ? 'bg-secondaryColor text-lightColor' : 'bg-lightColor'
      } rounded-lg font-ubuntu flex flex-col items-center justify-center relative transition ease-in-out delay-50 hover:scale-105 duration-300`}
    >
      {flag === 2 && (
        <div className='absolute right-2 top-2 text-primaryColor text-md'>
          <FavoriteFilledIcon />
        </div>
      )}
      <div className='flex flex-col items-start'>
        <p className='text-base font-bold'>{title.slice(0, 20)}</p>
        <p className='text-sm font-bold'>
          {format(new Date(date), 'dd.MM.yyyy. H:mm')} h
        </p>
        <p className='text-md text-primaryColor font-medium'>{price} €</p>
        <p className='text-sm'>{location.split(',')[0]}</p>
        <p className='uppercase text-base text-primaryColor flex items-center justify-center gap-2 font-ubuntu font-light'>
          {flag === 1 ? <span>uredi</span> : <span>saznaj više</span>}
          <ArrowRightIcon />
        </p>
      </div>
    </button>
  );
};

export default ServiceCard;
