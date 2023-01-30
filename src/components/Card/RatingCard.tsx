import { Rating } from '@mui/material';
import { ReviewProps } from '../../types/typeDefinitions';

const RatingCard = (props: ReviewProps) => {
  return (
    <div className='bg-lightGrayColor rounded-lg font-ubuntu flex flex-col items-start justify-start w-[400px] h-[250px] p-8'>
      <p className='text-base font-bold text-primaryColor'>{props.author}</p>
      <p className='text-base font-bold flex justify-center items-center gap-2'>
        <div className='font-bold'>{props.rating}</div>
        <Rating
          name='read-only'
          value={props.rating}
          readOnly
          size='medium'
          precision={0.5}
        />
      </p>
      <p className='text-sm flex flex-wrap'>{props.text}</p>
    </div>
  );
};

export default RatingCard;
