import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledLoginPage, LoginPageContainer } from './LoginPage.styled'
import axios from 'axios';

import Heading from '../../components/Headings/Heading';
import Input from '../../components/Inputs/Input';
import Button from '../../components/Buttons/Button';
import GoogleIcon from '../../assets/icons/LoginPage/google';

function LoginPage({ setErrorMessage, setModalParams }) {
    const navigate = useNavigate();

    // Check if token valid
    const token = localStorage.getItem('authToken') || '';
    const checkIfTokenValid = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/checkToken`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                navigate('/dashboard');
            }
        } catch (error) {
            console.log(`Token validation failed: ${error}`);
        }
    }, [navigate, token]);
    useEffect(() => {
        if (token !== '') checkIfTokenValid()
    }, [checkIfTokenValid, token]);

    const [email, setEmail] = useState('test1');
    const [password, setPassword] = useState('test1');
    const [password2, setPassword2] = useState('');
    const [isRegistration, setIsRegistration] = useState(false);

    useEffect(() => {
        const userLocation = window.location.href;
        if (userLocation.includes('/registration')) {
            setIsRegistration(true);
        } else {
            setIsRegistration(false);
        }
    }, []);

    const saveTokenAndRedirect = (token, path) => {
        localStorage.setItem('authToken', token);
        navigate(path);
    }

    const handleLogin = async () => {
        if (!email && !password) return setErrorMessage(`Email and password are required`);
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/login`, { email, password });
            data?.token ? saveTokenAndRedirect(data.token, '/dashboard') : setErrorMessage(data.message);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Login failed');
        }
    }

    const handleRegistration = async () => {
        if (!email || !password || !password2) return setErrorMessage('All fields are required');
        if (password !== password2) return setErrorMessage('Passwords do not match');
      
        try {
          const { status } = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/register`, { email, password });
      
          if (status === 201) await handleLogin(); 
          else setErrorMessage('Registration failed');
        } catch (error) {
          setErrorMessage(error.response?.data?.message || 'Registration failed');
        }
      };

    const logInByGoogle = async () => {
        console.log(process.env.REACT_APP_SERVER_LINK);
    }

    function LoginOrRegistrationButton() {
        const [button, setButtonText] = useState(null);

        useEffect(() => {
            const userLocation = window.location.href;

            if (userLocation.includes('/login')) {
                setButtonText({
                    text: "Log In",
                    loginMethod: handleLogin
                })
            } else if (userLocation.includes('/registration')) {
                setButtonText({
                    text: 'Sing Up',
                    loginMethod: handleRegistration
                })
            } else {
                setButtonText({
                    text: 'Log In',
                    loginMethod: handleLogin
                })
            }
        }, []);

        if (!button) return null;

        return (
            <Button
                onClick={button.loginMethod}
            >
                {button.text}
            </Button>
        );
    }

    function LoginOrRegistrationLink() {
        const [link, setLink] = useState(null);

        useEffect(() => {
            const userLocation = window.location.href;

            if (userLocation.includes('/login')) {
                setLink({
                    href: '/registration',
                    text: "Don't have an account yet? Click here",
                });
            } else if (userLocation.includes('/registration')) {
                setLink({
                    href: '/login',
                    text: 'Do you already have an account? Click here',
                });
            } else {
                setLink({
                    href: '/login',
                    text: 'Click here if you want to log in',
                });
            }
        }, []);

        if (!link) return null;

        return (
            <a
                href={link.href}
                style={{
                    borderBottom: 'white'
                }}
            >
                <p>{link.text}</p>
            </a>
        );
    }

    return (
        <LoginPageContainer>
            <StyledLoginPage>
                <Heading>Sport App</Heading>
                <p>Dream big, work hard, stay focused.</p>
                <Input
                    placeholder='Email'
                    value={email}
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        margin: '100px 0 10px 0'
                    }}
                />
                <Input
                    placeholder='Password'
                    value={password}
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        marginBottom: '10px'
                    }}
                />
                {isRegistration && (
                    <Input
                        placeholder='Repeat password'
                        value={password2}
                        type='password'
                        onChange={(e) => setPassword2(e.target.value)}
                        style={{
                            marginBottom: '10px'
                        }}
                    />
                )}
                <div style={{ marginBottom: '20px' }}>
                    <LoginOrRegistrationButton />
                </div>

                <Button style={{ display: 'none' }} onClick={logInByGoogle}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        width: '100%',
                    }}>
                        <div style={{
                            position: 'absolute',
                            left: '29px',
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <GoogleIcon />
                        </div>
                        <p style={{ margin: 0 }}>Log in by Google</p>
                    </div>
                </Button>
                <LoginOrRegistrationLink />
            </StyledLoginPage>
        </LoginPageContainer>
    );
}

export default LoginPage;
