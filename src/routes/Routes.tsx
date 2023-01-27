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
            children: [
              {
                path: 'profile',
                name: 'Profil',
                element: <div>Profile</div>,
              },
              {
                path: 'ratings',
                name: 'Ocjene',
                element: <div>Ratings</div>,
              },
              {
                path: 'my-services',
                name: 'Moje usluge',
                element: <div>My Services</div>,
              },
              {
                path: 'favorites',
                name: 'Favoriti',
                element: <div>Favorites</div>,
              },
              {
                path: 'messages',
                name: 'Poruke',
                element: <div>Messages</div>,
              },
              {
                path: 'settings',
                name: 'Postavke',
                element: <div>Settings</div>,
              },
            ],
          },
        ],
      },
    ],
  },
];
