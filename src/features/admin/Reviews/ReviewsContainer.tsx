import { Rating } from '@mui/material';

import ReviewCard from '../../../components/Card/ReviewCard';
import TitleBar from '../../../components/TitleBar/TitleBar';
import placeholder from '../../../assets/vectors/profile-placeholder.png';
import arrow from '../../../assets/shapes/arrow-right-orange.png';
import { useGetReviewsQuery } from './reviewsApiSlice';
import { getUserFromStorage } from '../../../services/storage';
import { User, ReadReview } from '../../../types/typeDefinitions';
import { useEffect, useState } from 'react';

const ReviewsContainer = () => {
  const userJson: string | null = getUserFromStorage();
  const user: User | null = userJson ? JSON.parse(userJson).user : null;

  const [average, setAverage] = useState<number | null>(null);

  const { data: reviewsData, isFetching: isReviewsDataLoading } =
    useGetReviewsQuery(user.id);

  const calculateAverageRating = (reviews: ReadReview[]): number | null => {
    if (reviews.length === 0) {
      return null;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  useEffect(() => {
    !isReviewsDataLoading && setAverage(calculateAverageRating(reviewsData));
  }, [isReviewsDataLoading, reviewsData]);

  return (
    <main>
      <TitleBar title={'ocjene'} />

      <div className='flex flex-col px-32 py-8 gap-4 w-full'>
        <div className='flex justify-between'>
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

            {!isReviewsDataLoading && (
              <>
                <div className='text-sm font-bold flex justify-center items-center gap-2'>
                  <div className='font-bold'>{average}</div>
                  <Rating
                    name='read-only'
                    value={average}
                    readOnly
                    size='medium'
                    precision={0.1}
                  />
                </div>

                <div className='uppercase font-medium text-sm'>
                  broj ocjena korisnika: {reviewsData.length}
                </div>
              </>
            )}
          </div>

          <button className='button !text-sm bg-secondaryColor text-lightColor !w-auto uppercase'>
            ostavi ocjenu
          </button>
        </div>

        {!isReviewsDataLoading && (
          <div className='flex flex-wrap justify-start items-center flex-row gap-4 w-full'>
            {reviewsData.map((item, index) => (
              <ReviewCard key={index} {...item} />
            ))}
          </div>
        )}

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

export default ReviewsContainer;
