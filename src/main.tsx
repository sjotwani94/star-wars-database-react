import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext/AuthContext';
import Login from './pages/authentication/Login';
import Registration from './pages/authentication/Registration';
import CharactersList from './pages/characters-list/CharactersList';
import Landing from './pages/landing/Landing';
import PlanetDetails from './pages/planet-details/PlanetDetails';

export const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Landing />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Registration />,
            },
            {
                path: '/characters',
                element: <CharactersList />,
            },
            {
                path: '/planet-details/:planetNumber',
                element: <PlanetDetails />,
            },
        ],
    },
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            cacheTime: 1000 * 60 * 15,
        },
    },
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>,
);
