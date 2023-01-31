import { BsChevronRight as ArrowRightIcon } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import { ServiceProps } from '../../types/typeDefinitions';
import { AiFillHeart as FavoriteFilledIcon } from 'react-icons/ai';

const ServiceCard = (props: ServiceProps) => {
  const navigateTo = useNavigate();

  const location = useLocation();

  const flag =
    location.pathname === '/my-services'
      ? 1
      : location.pathname === '/favorites'
      ? 2
      : 0;

  return (
    <button
      onClick={() =>
        flag === 1
          ? navigateTo(`/my-services/:id`)
          : flag === 2
          ? navigateTo(`/favorites/:id`)
          : navigateTo(`/services-list/:id`)
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
        {flag !== 1 && (
          <p
            className={`text-sm ${
              flag === 2 ? 'text-lightColor opacity-50' : 'text-grayColor'
            } font-ubuntu font-medium`}
          >
            {props.author}
          </p>
        )}
        <p className='text-base font-bold'>{props.title}</p>
        <p className='text-sm font-bold'>{props.date}</p>
        <p className='text-md text-primaryColor font-medium'>{props.price}</p>
        <p className='text-sm'>{props.location}</p>
        <p className='uppercase text-base text-primaryColor flex items-center justify-center gap-2 font-ubuntu font-light'>
          {flag === 1 ? <span>uredi</span> : <span>saznaj više</span>}
          <ArrowRightIcon />
        </p>
      </div>
    </button>
  );
};

export default ServiceCard;
