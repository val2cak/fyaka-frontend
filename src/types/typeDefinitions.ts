import { IconType } from 'react-icons';
import { NonIndexRouteObject } from 'react-router-dom';

export interface CustomRouteObject extends NonIndexRouteObject {
  name: string;
  children?: CustomRouteObject[];
  icon?: IconType;
  invisible?: boolean;
}

export interface User {
  username: string;
  token: string;
  tokenExpiry: Date;
}

export interface ServiceProps {
  author: string;
  title: string;
  date: string;
  price: string;
  location: string;
}

export interface ServiceFormProps extends ServiceProps {
  category: string;
  description: string;
  people: number;
}

export interface ReviewProps {
  author: string;
  rating: number;
  text: string;
}
