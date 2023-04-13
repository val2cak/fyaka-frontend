import { Rating } from '@mui/material';

import ReviewCard from '../../../components/Card/ReviewCard';
import TitleBar from '../../../components/TitleBar/TitleBar';
import placeholder from '../../../assets/vectors/profile-placeholder.png';
import arrow from '../../../assets/shapes/arrow-right-orange.png';
import { useGetReviewsQuery } from './reviewsApiSlice';
import { getUserFromStorage } from '../../../services/storage';
import { User, ReadReview } from '../../../types/typeDefinitions';
import { useEffect, useMemo, useState } from 'react';
import AddReviewModal from './AddReviewModal';

const ReviewsContainer = () => {
  const userJson: string | null = getUserFromStorage();
  const user: User | null = userJson ? JSON.parse(userJson).user : null;

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [average, setAverage] = useState<number | null>(null);

  const [showModal, setShowModal] = useState(false);

  const openModal = async () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const {
    data: reviewsListData,
    isFetching: isReviewsDataLoading,
    refetch,
  } = useGetReviewsQuery({ userId: user.id, page: currentPage, pageSize: 6 });

  const handlePageDown = () => {
    setCurrentPage(currentPage - 1);
    refetch();
  };

  const handlePageUp = () => {
    setCurrentPage(currentPage + 1);
    refetch();
  };

  const reviewsData = useMemo(() => {
    return reviewsListData ? reviewsListData.reviews : [];
  }, [reviewsListData]);

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
      <AddReviewModal isOpen={showModal} closeModal={closeModal} />

      <TitleBar title={'recenzije'} />

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
                  <div className='font-bold'>{average?.toFixed(1)}</div>
                  <Rating
                    name='read-only'
                    value={average}
                    readOnly
                    size='medium'
                    precision={0.1}
                  />
                </div>

                <div className='uppercase font-medium text-sm'>
                  broj recenzija korisnika: {reviewsData.length}
                </div>
              </>
            )}
          </div>

          <button
            onClick={openModal}
            className='button !text-sm bg-secondaryColor text-lightColor !w-auto uppercase'
          >
            ostavi recenziju
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
          <button
            className={`${
              currentPage === 1
                ? 'opacity-70'
                : 'transition ease-in-out delay-150 hover:-translate-x-4 duration-300'
            }`}
            onClick={handlePageDown}
            disabled={currentPage === 1}
          >
            <img
              src={arrow}
              alt='arrow left'
              className='object-fill h-16 w-28 -rotate-180'
            />
          </button>
          <button
            className={`${
              currentPage === reviewsListData?.totalPages
                ? 'opacity-70'
                : 'transition ease-in-out delay-150 hover:translate-x-4 duration-300'
            }`}
            onClick={handlePageUp}
            disabled={currentPage === reviewsListData?.totalPages}
          >
            <img
              src={arrow}
              alt='arrow right'
              className='object-fill h-16 w-28'
            />
          </button>
        </div>
      </div>
    </main>
  );
};

export default ReviewsContainer;
