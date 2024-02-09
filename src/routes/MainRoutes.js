import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import {Navigate} from "react-router-dom";

// sample page routing
const SamplePage = Loadable(lazy(() => import('../views/sample-page')));
// ==============================|| MAIN ROUTING ||============================== //
const isAuthenticated = localStorage.getItem("simpleUserCarSell")!==null;

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element:<Navigate to="/annonce" replace={true}/>
    },
    {
      path: 'free',
      element: <Navigate to="/annonce" replace={true}/>
    }
  ]
};

export default MainRoutes;
