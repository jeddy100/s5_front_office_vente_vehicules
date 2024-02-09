import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import {Navigate} from "react-router-dom";

// chat routing
const CharRouting = Loadable(lazy(() => import('views/Chat/ChatPrincipale')));


// ==============================|| MAIN ROUTING ||============================== //
const isAuthenticated = localStorage.getItem("simpleUserCarSell")!==null;
console.log("is auth "+isAuthenticated)

const ChatRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/chat',
            element: isAuthenticated?<CharRouting />:<Navigate to="/annonce" replace={true} />
        }
    ]
};

export default ChatRoutes;
