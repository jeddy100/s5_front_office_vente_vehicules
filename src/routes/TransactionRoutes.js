import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// chat routing
const TransactionRouting = Loadable(lazy(() => import('views/profile/Transaction')));


// ==============================|| MAIN ROUTING ||============================== //

const TransactionRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/transaction',
            element: <TransactionRouting />
        }
    ]
};

export default TransactionRoutes;
