import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// chat routing
const AnnonceRouting = Loadable(lazy(() => import('views/annonce/Annonce')));
const DetailRouting = Loadable(lazy(() => import('views/annonce/DetailAnnonce')));


// ==============================|| MAIN ROUTING ||============================== //

const AnnonceRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/annonce',
            element: <AnnonceRouting />
        } ,{
            path: '/detailAnnonce',
            element: <DetailRouting />
        }
    ]
};

export default AnnonceRoutes;
