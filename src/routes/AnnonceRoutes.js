import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import LandingLayout from "../layout/landingLayout";

// chat routing
const AnnonceRouting = Loadable(lazy(() => import('views/annonce/Annonce')));
const DetailRouting = Loadable(lazy(() => import('views/annonce/DetailAnnonce')));
const FAvori = Loadable(lazy(() => import('views/annonce/Favoris')));


// ==============================|| MAIN ROUTING ||============================== //
const isAuthenticated = localStorage.getItem("simpleUserCarSell")!==null;

const AnnonceRoutes = {
    path: '/',
    element: isAuthenticated?<MainLayout />:<LandingLayout/>,
    // element: <MainLayout />,
    children: [
        {
            path: '/annonce',
            element: <AnnonceRouting />
        } ,{
            path: '/detailAnnonce',
            element: <DetailRouting />
        },{
            path: '/favorisAnnonce',
            element: <FAvori />
        }
    ]
};

export default AnnonceRoutes;
