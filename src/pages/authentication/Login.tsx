import { Alert, BackgroundImage, Button, NavLink, Paper, PasswordInput, TextInput } from '@mantine/core';
import { IconAlertCircle, IconAt, IconHome2, IconLock } from '@tabler/icons-react';
import { FC, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { doSignInWithEmailAndPassword } from '../../firebase/Authentication';
import './Authentication.scss';

const Login: FC = () => {
    const { userLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const submitLoginCredentials = async () => {
        if (!isSigningIn) {
            if (email === '' || password === '') {
                setErrorMessage('Please fill out the required details!');
            } else {
                setIsSigningIn(true);
                await doSignInWithEmailAndPassword(email, password);
            }
        }
    };

    const navigateToRoute = (routePath: string) => {
        navigate(routePath);
    };

    return (
        <div className="login-form">
            {userLoggedIn && <Navigate to={'/'} replace={true} />}
            <BackgroundImage
                className="login-form-background"
                src="https://i.pinimg.com/originals/d7/a6/11/d7a61190a836bdcfc62bf97af4f4c74b.png"
            >
                <Paper className="login-form-container" shadow="xs" p="xl">
                    <div className="title">Login</div>
                    {!!errorMessage && (
                        <Alert icon={<IconAlertCircle size="1rem" />} title="Error!" color="red">
                            {errorMessage}
                        </Alert>
                    )}
                    <TextInput
                        className="email-text-input"
                        label="Email"
                        placeholder="Email"
                        icon={<IconAt size="0.8rem" />}
                        value={email}
                        onChange={(e) => {
                            setErrorMessage('');
                            setEmail(e.target.value);
                        }}
                        withAsterisk
                    />
                    <PasswordInput
                        icon={<IconLock size="1rem" />}
                        placeholder="Password"
                        label="Password"
                        description="Password must include at least one letter, number and special character"
                        value={password}
                        onChange={(e) => {
                            setErrorMessage('');
                            setPassword(e.target.value);
                        }}
                        withAsterisk
                    />
                    <Button onClick={() => submitLoginCredentials()}>Submit</Button>
                    <NavLink
                        onClick={() => navigateToRoute('/register')}
                        label="New User? Sign Up Here!"
                        icon={<IconHome2 size="1rem" stroke={1.5} />}
                    />
                </Paper>
            </BackgroundImage>
        </div>
    );
};

export default Login;
