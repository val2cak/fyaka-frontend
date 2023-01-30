import { IconType } from 'react-icons';
import { NonIndexRouteObject } from 'react-router-dom';

export interface CustomRouteObject extends NonIndexRouteObject {
  name: string;
  children?: CustomRouteObject[];
  icon?: IconType;
  invisible?: boolean;
}

export interface ServiceCard {
  author: string;
  title: string;
  date: string;
  price: string;
  location: string;
}

export interface ServiceInfo extends ServiceCard {
  category: string;
  description: string;
  people: number;
}
