import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AiFillHeart as FavoriteFilledIcon,
  AiOutlineHeart as FavoriteOutlinedIcon,
} from 'react-icons/ai';
import { format } from 'date-fns';

import { ServiceProps, User } from '../../../types/typeDefinitions';
import { getUserFromStorage } from '../../../services/storage';
import {
  useAddFavoriteMutation,
  useGetSingleFavoriteQuery,
  useRemoveFavoriteMutation,
} from '../../admin/Favorites/favoritesApiSlice';
import { useGetCategoriesQuery } from '../ServicesList/servicesApiSlice';
import useNotifications from '../../../hooks/useNotifications';

const SingleServiceCard: FC<ServiceProps> = ({
  id,
  author,
  title,
  description,
  location,
  price,
  date,
  people,
  categoryId,
}) => {
  const navigateTo = useNavigate();

  const { data: categoriesData, isFetching: isCategoriesDataLoading } =
    useGetCategoriesQuery();

  const [favorite, setFavorite] = useState(false);

  const userJson: string | null = getUserFromStorage();
  const user: User | null = userJson ? JSON.parse(userJson).user : null;

  const { data: favoriteItem, isFetching: isFavoriteItemLoading } =
    useGetSingleFavoriteQuery({ userId: user?.id, serviceId: id });

  useEffect(() => {
    if (!isFavoriteItemLoading) {
      setFavorite(favoriteItem !== null);
    }
  }, [isFavoriteItemLoading, favoriteItem]);

  const [addFavorite] = useAddFavoriteMutation();

  const [removeFavorite] = useRemoveFavoriteMutation();

  const { handleUserActionNotification, handlePromiseNotification } =
    useNotifications();

  const handleClickFavorite = () => {
    if (favorite === false) {
      try {
        handlePromiseNotification(
          addFavorite({ serviceId: id, userId: user.id }).unwrap(),
          {
            success: {
              message: 'Dodano u favorite!',
              type: 'success',
            },
            pending: {
              message: 'Učitavanje...',
              type: 'info',
            },
            error: {
              message: 'Nešto je pošlo po zlu!',
              type: 'error',
            },
          }
        );
      } catch (error: any) {
        handleUserActionNotification({
          message: error.data.message,
          autoClose: 2500,
          type: 'error',
        });
      }
    } else {
      try {
        handlePromiseNotification(
          removeFavorite({ serviceId: id, userId: user.id }).unwrap(),
          {
            success: {
              message: 'Uklonjeno iz favorita!',
              type: 'success',
            },
            pending: {
              message: 'Učitavanje...',
              type: 'info',
            },
            error: {
              message: 'Nešto je pošlo po zlu!',
              type: 'error',
            },
          }
        );
      } catch (error: any) {
        handleUserActionNotification({
          message: error.data.message,
          autoClose: 2500,
          type: 'error',
        });
      }
    }

    setFavorite(!favorite);
  };

  return (
    <div
      className={`bg-lightColor rounded-lg p-8 flex flex-col gap-8 ${
        user?.id === author.id || !user ? 'py-16' : ''
      }`}
    >
      {user && user?.id !== author.id && (
        <button
          onClick={handleClickFavorite}
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
      )}

      <div className='flex flex-row gap-5 pb-8 px-32'>
        <ul className='font-ubuntu font-bold text-primaryColor text-base flex flex-col gap-8 w-2/5'>
          <li>autor</li>
          <li>naslov</li>
          <li>kategorija</li>
          <li>opis</li>
          <li>lokacija</li>
          <li>cijena usluge</li>
          <li>vrijeme obavljanja</li>
          <li>broj osoba</li>
        </ul>

        <ul className='font-raleway text-base flex flex-col gap-8'>
          <li>{author.username}</li>
          <li>{title}</li>
          {!isCategoriesDataLoading && (
            <li>
              {categoriesData.find((item) => item.id === categoryId).name}
            </li>
          )}
          <li>{description}</li>

          <li>{location}</li>
          <li>{price} €</li>
          <li>{format(new Date(date), 'dd.MM.yyyy. H:mm')} h</li>
          <li>{people}</li>
        </ul>
      </div>

      <div className='flex justify-center items-center'>
        {user && user.id === author.id ? (
          <button
            className='button bg-primaryColor text-lightColor'
            onClick={() => navigateTo(`/my-services/${id}`)}
          >
            uredi
          </button>
        ) : (
          <button className='button bg-primaryColor text-lightColor'>
            pošalji poruku
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleServiceCard;
