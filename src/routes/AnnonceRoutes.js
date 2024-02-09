import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import LandingLayout from '../layout/landingLayout';

// chat routing
const AnnonceRouting = Loadable(lazy(() => import('views/annonce/Annonce')));
const DetailRouting = Loadable(lazy(() => import('views/annonce/DetailAnnonce')));
const FAvori = Loadable(lazy(() => import('views/annonce/Favoris')));
const Achat = Loadable(lazy(() => import('views/annonce/VenteAnnonce')));

// ==============================|| MAIN ROUTING ||============================== //
const isAuthenticated = localStorage.getItem('simpleUserCarSell') !== null;

const AnnonceRoutes = {
  path: '/',
  element: isAuthenticated ? <MainLayout /> : <LandingLayout />,
  // element: <MainLayout />,
  children: [
    {
      path: '/annonce',
      element: <AnnonceRouting />
    },
    {
      path: '/detailAnnonce',
      element: <DetailRouting />
    },
    {
      path: '/favorisAnnonce',
      element: <FAvori />
    },
    {
      path: '/achatVehicule',
      element: <Achat />
    }
  ]
};

export default AnnonceRoutes;
