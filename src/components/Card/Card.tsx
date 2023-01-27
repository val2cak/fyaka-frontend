import { RiArrowRightSLine } from 'react-icons/ri';

const Card = (props: {
  author: string;
  title: string;
  date: string;
  price: string;
  location: string;
}) => {
  return (
    <div className='w-[250px] h-[250px] bg-lightColor rounded-lg font-ubuntu flex flex-col items-center justify-center'>
      <div className='flex flex-col items-start'>
        <p className='text-sm text-grayColor font-bold'>{props.author}</p>
        <p className='text-base font-bold'>{props.title}</p>
        <p className='text-sm font-bold'>{props.date}</p>
        <p className='text-md text-primaryColor font-bold'>{props.price}</p>
        <p className='text-sm'>{props.location}</p>
        <button className='uppercase text-base text-primaryColor flex items-center justify-center gap-1'>
          saznaj više <RiArrowRightSLine className='text-lg' />
        </button>
      </div>
    </div>
  );
};

export default Card;
