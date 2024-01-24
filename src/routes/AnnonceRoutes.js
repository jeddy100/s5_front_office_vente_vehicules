import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// chat routing
const AnnonceRouting = Loadable(lazy(() => import('views/annonce/Annonce')));


// ==============================|| MAIN ROUTING ||============================== //

const AnnonceRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/annonce',
            element: <AnnonceRouting />
        }
    ]
};

export default AnnonceRoutes;
