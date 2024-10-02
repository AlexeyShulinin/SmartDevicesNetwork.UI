import { createBrowserRouter } from 'react-router-dom';
import { Network } from '../views/Network/Network.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <svg height={500} width={500}></svg>
            </>
        ),
    },
    {
        path: '/network',
        element: <Network />,
    },
]);
