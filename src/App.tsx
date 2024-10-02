import { JSX } from 'react';
import './App.css';
import { router } from './router/router.tsx';
import { RouterProvider } from 'react-router-dom';

const App = (): JSX.Element => {
    return <RouterProvider router={router} />;
};

export default App;
