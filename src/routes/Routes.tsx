// REACT
import { Outlet } from 'react-router-dom';
//

// ROUTES
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from '../features/admin/AdminLayout';
import GuestLayout from '../features/guest/GuestLayout';
import HomeContainer from '../features/guest/Home/HomeContainer';
import ServicesListContainer from '../features/guest/ServicesList/ServicesListContainer';
import LookingForServiceContainer from '../features/admin/LookingForService/LookingForServiceContainer';
import GetStartedContainer from '../features/auth/GetStarted/GetStartedContainer';
import LoginRegisterContainer from '../features/auth/LoginRegister/LoginRegisterContainer';
//

// TYPES
import { CustomRouteObject } from '../types/typeDefinitions';
//

// ICONS
import {
  ImUser as ProfileIcon,
  ImStarFull as ReviewsIcon,
  ImCog as SettingsIcon,
  ImBubbles2 as MessagesIcon,
  ImHeart as FavoritesIcon,
  ImBriefcase as MyServicesIcon,
} from 'react-icons/im';
//

export let Routes: CustomRouteObject[] = [
  {
    path: '/',
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
            path: 'home',
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
            element: <div>Single Service</div>,
          },
        ],
      },
      {
        path: '',
        name: 'Admin',
        element: (
          // <ProtectedRoute>
          <AdminLayout />
          // </ProtectedRoute>
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
                name: 'Profil',
                icon: ProfileIcon,
                element: <div>Profile</div>,
              },
              {
                path: 'ratings',
                name: 'Ocjene',
                icon: ReviewsIcon,
                element: <div>Ratings</div>,
              },
              {
                path: 'my-services',
                name: 'Moje usluge',
                icon: MyServicesIcon,
                element: <div>My Services</div>,
              },
              {
                path: 'favorites',
                name: 'Favoriti',
                icon: FavoritesIcon,
                element: <div>Favorites</div>,
              },
              {
                path: 'messages',
                name: 'Poruke',
                icon: MessagesIcon,
                element: <div>Messages</div>,
              },
              {
                path: 'settings',
                name: 'Postavke',
                icon: SettingsIcon,
                element: <div>Settings</div>,
              },
            ],
          },
        ],
      },
    ],
  },
];
