// REACT ROUTER
import { RouteObject } from 'react-router-dom';
//

// ICONS
//

// ROUTES
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from '../features/admin/AdminLayout';
import AuthLayout from '../features/auth/AuthLayout';
import GuestLayout from '../features/guest/GuestLayout';
//

// TYPES
//

export type CustomRouteObject = RouteObject & {
  name: string;
  children?: CustomRouteObject[];
  invisible?: boolean;
};

export let Routes: CustomRouteObject[] = [
  {
    path: '/get-started',
    name: 'Get Started',
    element: <AuthLayout />,
  },
  {
    path: '/',
    name: 'Guest',
    element: <GuestLayout />,
    children: [
      {
        path: 'home',
        name: 'Home',
        element: <div>Home</div>,
      },
      {
        path: 'services-list',
        name: 'Services List',
        element: <div>Services List</div>,
      },
      {
        path: 'services-list/:id',
        name: 'Single Service',
        element: <div>Single Service</div>,
      },
    ],
  },
  {
    path: '/',
    name: 'Admin',
    element: (
      // <ProtectedRoute>
      <AdminLayout />
      // </ProtectedRoute>
    ),
    children: [
      {
        path: 'looking-for-service',
        name: 'Looking for service',
        element: <div>Looking For Service</div>,
      },
      {
        path: 'profile',
        name: 'Profile',
        element: <div>Profile</div>,
      },
      {
        path: 'ratings',
        name: 'Ratings',
        element: <div>Ratings</div>,
      },
      {
        path: 'my-services',
        name: 'My Services',
        element: <div>My Services</div>,
      },
      {
        path: 'favorites',
        name: 'Favorites',
        element: <div>Favorites</div>,
      },
      {
        path: 'messages',
        name: 'Messages',
        element: <div>Messages</div>,
      },
      {
        path: 'settings',
        name: 'Settings',
        element: <div>Settings</div>,
      },
    ],
  },
];
