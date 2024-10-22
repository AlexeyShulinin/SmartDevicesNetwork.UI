import { JSX } from 'react';
import { router } from './router/router.tsx';
import { RouterProvider } from 'react-router-dom';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';

const App = (): JSX.Element => {
    return (
        <FluentProvider theme={teamsLightTheme}>
            <RouterProvider router={router} />
        </FluentProvider>
    );
};

export default App;
