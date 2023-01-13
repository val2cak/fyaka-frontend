// ROUTES
import ProtectedRoute from './ProtectedRoute';
import AuthLayout from '../features/auth/AuthLayout';
import DashboardLayout from '../features/dashboard/DashboardLayout';
import AdminLayout from '../features/dashboard/admin/AdminLayout';
import GuestLayout from '../features/dashboard/guest/GuestLayout';
//

// TYPES
import { CustomRouteObject } from '../types/enums/typeDefinitions';
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
            name: 'Looking for service',
            element: <div>Looking For Service</div>,
          },
          {
            path: '',
            name: 'Profile Menu',
            children: [
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
        ],
      },
    ],
  },
];
