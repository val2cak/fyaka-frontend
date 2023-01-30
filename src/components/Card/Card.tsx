import { RiArrowRightSLine } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';
import { ServiceCard } from '../../types/typeDefinitions';

const Card = (props: ServiceCard) => {
  const navigateTo = useNavigate();

  const location = useLocation();

  const flag = location.pathname === '/my-services' ? 1 : 0;

  return (
    <button
      onClick={() =>
        flag ? navigateTo(`/my-services/:id`) : navigateTo(`/services-list/:id`)
      }
      className='w-[250px] h-[250px] bg-lightColor rounded-lg font-ubuntu flex flex-col items-center justify-center'
    >
      <div className='flex flex-col items-start'>
        {!flag && (
          <p className='text-sm text-grayColor font-bold'>{props.author}</p>
        )}
        <p className='text-base font-bold'>{props.title}</p>
        <p className='text-sm font-bold'>{props.date}</p>
        <p className='text-md text-primaryColor font-bold'>{props.price}</p>
        <p className='text-sm'>{props.location}</p>
        <p className='uppercase text-base text-primaryColor flex items-center justify-center gap-1'>
          {flag ? <span>uredi</span> : <span>saznaj više</span>}
          <RiArrowRightSLine className='text-lg' />
        </p>
      </div>
    </button>
  );
};

export default Card;
