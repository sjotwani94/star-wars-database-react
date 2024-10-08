import { Alert, BackgroundImage, Button, LoadingOverlay, Paper, PasswordInput, TextInput } from '@mantine/core';
import { IconAlertCircle, IconAt, IconLock } from '@tabler/icons-react';
import { FirebaseError } from 'firebase/app';
import { FC, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { doCreateUserWithEmailAndPassword } from '../../firebase/Authentication';
import './Authentication.scss';

const Registration: FC = () => {
    const { userLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const submitNewCredentials = async () => {
        if (!isRegistering) {
            if (email === '' || password === '' || confirmPassword === '') {
                setErrorMessage('Please fill out the required details!');
            } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
                setErrorMessage('Please enter a valid E-mail ID!');
            } else if (
                !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(password)
            ) {
                setErrorMessage('Please enter a valid Password!');
            } else if (password !== confirmPassword) {
                setErrorMessage('Passwords do not match!');
            } else {
                setIsRegistering(true);
                try {
                    await doCreateUserWithEmailAndPassword(email, password);
                } catch (error) {
                    setIsRegistering(false);
                    if (error instanceof FirebaseError) {
                        setErrorMessage(error.message);
                    }
                }
            }
        }
    };

    return (
        <div className="login-form">
            {userLoggedIn && <Navigate to={'/'} replace={true} />}
            <BackgroundImage
                className="login-form-background"
                src="https://i.pinimg.com/originals/d7/a6/11/d7a61190a836bdcfc62bf97af4f4c74b.png"
            >
                <Paper className="login-form-container" shadow="xs" p="xl">
                    <LoadingOverlay visible={isRegistering} overlayBlur={2} />
                    <div className="title">Registration</div>
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
                        description="Password should be of minimum 8 characters, and must include at least one letter, number and special character"
                        value={password}
                        onChange={(e) => {
                            setErrorMessage('');
                            setPassword(e.target.value);
                        }}
                        withAsterisk
                    />
                    <PasswordInput
                        icon={<IconLock size="1rem" />}
                        placeholder="Confirm Password"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setErrorMessage('');
                            setConfirmPassword(e.target.value);
                        }}
                        withAsterisk
                    />
                    <Button onClick={() => submitNewCredentials()}>Submit</Button>
                </Paper>
            </BackgroundImage>
        </div>
    );
};

export default Registration;
