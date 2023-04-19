import { Outlet } from 'react-router-dom';
import {
  ImUser as ProfileIcon,
  ImStarFull as RatingsIcon,
  ImCog as SettingsIcon,
  ImBubbles2 as MessagesIcon,
  ImHeart as FavoritesIcon,
  ImBriefcase as MyServicesIcon,
} from 'react-icons/im';

import ProtectedRoute from './ProtectedRoute';
import AdminLayout from '../features/admin/AdminLayout';
import GuestLayout from '../features/guest/GuestLayout';
import HomeContainer from '../features/guest/Home/HomeContainer';
import ServicesListContainer from '../features/guest/ServicesList/ServicesListContainer';
import LookingForServiceContainer from '../features/admin/LookingForService/LookingForServiceContainer';
import GetStartedContainer from '../features/auth/GetStarted/GetStartedContainer';
import LoginRegisterContainer from '../features/auth/LoginRegister/LoginRegisterContainer';
import SingleServiceContainer from '../features/guest/SingleService/SingleServiceContainer';
import ProfileContainer from '../features/admin/Profile/ProfileContainer';
import ReviewsContainer from '../features/admin/Reviews/ReviewsContainer';
import MyServicesContainer from '../features/admin/MyServices/MyServicesContainer';
import FavoritesContainer from '../features/admin/Favorites/FavoritesContainer';
import MessagesContainer from '../features/admin/Messages/MessagesContainer';
import SettingsContainer from '../features/admin/Settings/SettingsContainer';
import MySingleServiceContainer from '../features/admin/MySingleService/MySingleServiceContainer';
import { CustomRouteObject } from '../types/typeDefinitions';

export let Routes: CustomRouteObject[] = [
  {
    path: '/auth/',
    name: 'Authentication',
    element: <Outlet />,
    children: [
      {
        path: 'get-started',
        name: 'Get Started',
        element: <GetStartedContainer />,
      },
      {
        path: 'login',
        name: 'Login',
        element: <LoginRegisterContainer />,
      },
      {
        path: 'register',
        name: 'Register',
        element: <LoginRegisterContainer />,
      },
    ],
  },
  {
    path: '/',
    name: 'Dashboard',
    element: <Outlet />,
    children: [
      {
        path: '',
        name: 'Guest',
        element: <GuestLayout />,
        children: [
          {
            path: '',
            name: 'Naslovna',
            element: <HomeContainer />,
          },
          {
            path: 'services-list',
            name: 'Popis Usluga',
            element: <ServicesListContainer />,
          },
          {
            path: 'services-list/:id',
            name: 'Usluga',
            invisible: true,
            element: <SingleServiceContainer />,
          },
          {
            path: 'user-profile/:id',
            name: 'Profil korisnika',
            invisible: true,
            element: (
              <ProtectedRoute>
                <ProfileContainer />
              </ProtectedRoute>
            ),
          },
          {
            path: 'user-reviews/:id',
            name: 'Recenzije korisnika',
            invisible: true,
            element: (
              <ProtectedRoute>
                <ReviewsContainer />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: '',
        name: 'Admin',
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'looking-for-service',
            name: 'Trebam Uslugu',
            element: <LookingForServiceContainer />,
          },
          {
            path: '',
            name: 'Profil',
            element: <Outlet />,
            children: [
              {
                path: 'profile',
                name: 'profil',
                icon: ProfileIcon,
                element: <ProfileContainer />,
              },
              {
                path: 'reviews',
                name: 'recenzije',
                icon: RatingsIcon,
                element: <ReviewsContainer />,
              },
              {
                path: 'my-services',
                name: 'Moje usluge',
                icon: MyServicesIcon,
                element: <MyServicesContainer />,
              },
              {
                path: 'my-services/:id',
                name: 'Moja usluga',
                invisible: true,
                element: <MySingleServiceContainer />,
              },
              {
                path: 'favorites',
                name: 'Favoriti',
                icon: FavoritesIcon,
                element: <FavoritesContainer />,
              },
              {
                path: 'favorites/:id',
                name: 'Favorit',
                invisible: true,
                element: <SingleServiceContainer />,
              },
              {
                path: 'messages',
                name: 'Poruke',
                icon: MessagesIcon,
                element: <MessagesContainer />,
              },
              {
                path: 'settings',
                name: 'Postavke',
                icon: SettingsIcon,
                element: <SettingsContainer />,
              },
            ],
          },
        ],
      },
    ],
  },
];
