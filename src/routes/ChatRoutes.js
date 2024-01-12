import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// chat routing
const CharRouting = Loadable(lazy(() => import('views/Chat/ChatPrincipale')));


// ==============================|| MAIN ROUTING ||============================== //

const ChatRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/chat',
            element: <CharRouting />
        }
    ]
};

export default ChatRoutes;
