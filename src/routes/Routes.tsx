// ROUTES
import ProtectedRoute from './ProtectedRoute';
import AuthLayout from '../features/auth/AuthLayout';
import DashboardLayout from '../features/dashboard/DashboardLayout';
import AdminLayout from '../features/dashboard/admin/AdminLayout';
import GuestLayout from '../features/dashboard/guest/GuestLayout';
//

// TYPES
import { CustomRouteObject } from '../types/typeDefinitions';
//

export let Routes: CustomRouteObject[] = [
  {
    path: '/get-started',
    name: 'Get Started',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        name: 'Login',
        element: <div>Login</div>,
      },
    ],
  },
  {
    path: '/',
    name: 'Dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        name: 'Guest',
        element: <GuestLayout />,
        children: [
          {
            path: 'home',
            name: 'Naslovna',
            element: <div>Home</div>,
          },
          {
            path: 'services-list',
            name: 'Popis Usluga',
            element: <div>Services List</div>,
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
            element: <div>Looking For Service</div>,
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
