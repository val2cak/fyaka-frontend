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
  id: number;
  title: string;
  description: string;
  location: string;
  price: string;
  date: Date;
  people: number;
  author: {
    id: number;
    username: string;
    email: string;
  };
}

export interface ReviewProps {
  author: string;
  rating: number;
  text: string;
}
