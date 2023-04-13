import { FC } from 'react';
import { Rating } from '@mui/material';

import { ReadReview } from '../../types/typeDefinitions';

const ReviewCard: FC<ReadReview> = ({ rating, author, text }) => {
  return (
    <div className='bg-lightGrayColor rounded-lg font-ubuntu flex flex-col items-start justify-start w-[400px] h-[250px] p-8'>
      <p className='text-base font-bold text-primaryColor'>{author.username}</p>
      <div className='text-base font-bold flex justify-center items-center gap-2'>
        <div className='font-bold'>{rating.toFixed(1)}</div>
        <Rating
          name='read-only'
          value={rating}
          readOnly
          size='medium'
          precision={0.5}
        />
      </div>
      <p className='text-sm flex flex-wrap'>{text}</p>
    </div>
  );
};

export default ReviewCard;
