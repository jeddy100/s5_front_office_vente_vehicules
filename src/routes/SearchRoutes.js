import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
const SearchRouting = Loadable(lazy(() => import('views/recherche/Recherche')));
const SearchRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/recherche',
      element: <SearchRouting />
    }
  ]
};
export default SearchRoutes;
