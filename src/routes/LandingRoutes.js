import Loadable from "../ui-component/Loadable";
import {lazy} from "react";
import MinimalLayout from "../layout/MinimalLayout";
import LandingLayout from "../layout/landingLayout";

const SamplePage = Loadable(lazy(() => import('../views/sample-page')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const LandingRoutes = {
    path: '/',
    element: <LandingLayout />,
    children: [
        {
            path: 'sample-page',
            element: <SamplePage />
        }
    ]
};
export default LandingRoutes