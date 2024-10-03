import { Container, MantineProvider, NavLink } from '@mantine/core';
import { IconChevronRight, IconLogin, IconLogout, IconUsers, IconVideo } from '@tabler/icons-react';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './App.scss';
import Footer from './components/footer/Footer';
import { useAuth } from './contexts/AuthContext/AuthContext';
import { doSignOut } from './firebase/Authentication';
import './style.scss';
import { theme } from './theme';

export default function App() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const navigateToRoute = (routePath: string) => {
        navigate(routePath);
    };

    const logout = () => {
        doSignOut();
    };

    return (
        <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
            <Container className="blue-div header-container">
                <div className="header-title" onClick={() => navigateToRoute('/')}>
                    Star Wars Encyclopedia
                </div>
                <div className="navigation-links">
                    {userLoggedIn ? (
                        <>
                            <NavLink
                                label="Characters List Page"
                                onClick={() => navigateToRoute('/characters')}
                                icon={<IconUsers size="1rem" stroke={1.5} />}
                                rightSection={
                                    <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
                                }
                                active
                            />
                            <NavLink
                                label="Movies List Page"
                                icon={<IconVideo size="1rem" stroke={1.5} />}
                                rightSection={
                                    <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
                                }
                                onClick={() => navigateToRoute('/characters')}
                                variant="filled"
                                active
                            />
                            <NavLink
                                label="Logout"
                                icon={<IconLogout size="1rem" stroke={1.5} />}
                                rightSection={
                                    <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
                                }
                                onClick={() => logout()}
                                active
                            />
                        </>
                    ) : (
                        <NavLink
                            label="Login"
                            icon={<IconLogin size="1rem" stroke={1.5} />}
                            rightSection={
                                <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
                            }
                            onClick={() => navigateToRoute('/login')}
                            active
                        />
                    )}
                </div>
            </Container>
            <Outlet />
            <Footer />
        </MantineProvider>
    );
}
