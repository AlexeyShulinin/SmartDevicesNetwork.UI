import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Network } from '../views/Network/Network.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/network" />,
    },
    {
        path: '/network',
        element: <Network />,
    },
]);
