import { IconType } from 'react-icons';
import { NonIndexRouteObject } from 'react-router-dom';

export interface CustomRouteObject extends NonIndexRouteObject {
  name: string;
  children?: CustomRouteObject[];
  icon?: IconType;
  invisible?: boolean;
}

export interface User {
  id?: number;
  username?: string;
  email?: string;
  token?: string;
  tokenExpiry?: Date;
  rating?: number | null;
  biography?: string | null;
  phoneNumber?: string | null;
  fullName?: string | null;
  gender?: string | null;
  dateOfBirth?: Date | null;
  imageUrl?: string | null;
}

export interface ServiceProps {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  date: Date;
  people: number;
  author: {
    id: number;
    username: string;
    email: string;
  };
  categoryId: number;
}

export interface FavoriteProps {
  id: number;
  userId: number;
  serviceId: number;
  service: ServiceProps;
}

export interface NewService {
  title: string;
  description: string;
  location: string;
  price: number;
  date: Date;
  people: number;
  authorId: number;
  categoryId: number;
}

export interface UpdateService {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  date: Date;
  people: number;
  authorId: number;
  categoryId: number;
}

export interface WriteReview {
  userId: number;
  authorId: number;
  rating: number;
  text: string;
}

export interface ReadReview {
  id: number;
  userId: number;
  author: {
    id: number;
    username: string;
  };
  rating: number;
  text: string;
}

export interface Favorite {
  id: number;
  userId: number;
  serviceId: number;
}

export interface NewFavorite {
  userId: number;
  serviceId: number;
}

export interface Lookup {
  id: number;
  name: string;
}

export interface Filters {
  minPrice?: number;
  maxPrice?: number;
  minDate?: Date;
  maxDate?: Date;
  categoryId?: number[] | number;
  location?: string;
  people?: number;
  userRating?: number;
}

export interface Location {
  name: string;
  adminName1: string;
  adminName2?: string;
  countryName?: string;
}

export interface Locations {
  geonames: Location[];
}

export interface ToastContentInterface {
  typeOfToast: string;
  toastBody: string | any;
}
