import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// chat routing
const ProfileRouting = Loadable(lazy(() => import('views/profile/ProfileContent')));


// ==============================|| MAIN ROUTING ||============================== //

const ProfileRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/profile',
            element: <ProfileRouting />
        }
    ]
};

export default ProfileRoutes;
