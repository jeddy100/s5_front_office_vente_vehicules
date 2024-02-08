import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// dashboard routing
const Login = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Login3')));

const AuthRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <Login />
    }
  ]
};

export default AuthRoutes;
