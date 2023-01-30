import { RiArrowRightSLine } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';
import { ServiceCard } from '../../types/typeDefinitions';

const Card = (props: ServiceCard) => {
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
      } rounded-lg font-ubuntu flex flex-col items-center justify-center`}
    >
      <div className='flex flex-col items-start'>
        {flag !== 1 && (
          <p
            className={`text-sm ${
              flag === 2 ? 'text-lightColor opacity-50' : 'text-grayColor'
            } font-bold`}
          >
            {props.author}
          </p>
        )}
        <p className='text-base font-bold'>{props.title}</p>
        <p className='text-sm font-bold'>{props.date}</p>
        <p className='text-md text-primaryColor font-bold'>{props.price}</p>
        <p className='text-sm'>{props.location}</p>
        <p className='uppercase text-base text-primaryColor flex items-center justify-center gap-1'>
          {flag === 1 ? <span>uredi</span> : <span>saznaj više</span>}
          <RiArrowRightSLine className='text-lg' />
        </p>
      </div>
    </button>
  );
};

export default Card;
