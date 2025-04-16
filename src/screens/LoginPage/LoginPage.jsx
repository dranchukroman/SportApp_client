import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StyledLoginPage, LoginPageContainer, InButtonWrapper, GoogleButtonWrapper } from './LoginPage.styled'
import axios from 'axios';
import theme from '../../styles/theme';
import Heading from '../../components/Headings/Heading';
import Input from '../../components/Inputs/Input';
import Button from '../../components/Buttons/Button';
import GoogleIcon from '../../assets/icons/LoginPage/google';
import { toast } from 'sonner';
import { LoadWrapper } from '../../components/Loaders/SingleLoader/SingleLoader.styled';

function LoginPage() {
    // Location tools
    const navigate = useNavigate();
    const location = useLocation();
    const isLoginPage = location.pathname.includes('/login');
    const isRegistrationPage = location.pathname.includes('/registration');

    // Check if token valid
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        const checkIfTokenValid = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/checkToken`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    navigate('/dashboard');
                }
            } catch (error) {
                console.error(`Token validation failed: ${error}`);
            }
        };

        checkIfTokenValid();
    }, [navigate]);

    const [email, setEmail] = useState('test1');
    const [password, setPassword] = useState('test1');
    const [password2, setPassword2] = useState('');

    const [afterLoad, setAfterLoad] = useState(0);

    useEffect(() => setAfterLoad(1), [])

    const saveTokenAndRedirect = (token, path) => {
        localStorage.setItem('authToken', token);
        navigate(path);
    }

    // Login function
    const handleLogin = async () => {
        if (!email && !password) return toast.error(`Email and password are required`);
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/login`, { email, password });
            data?.token ? saveTokenAndRedirect(data.token, '/dashboard') : toast.error(data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        }
    }

    // Registration function
    const handleRegistration = async () => {
        if (!email || !password || !password2) return toast.error('All fields are required');
        if (password !== password2) return toast.error('Passwords do not match');

        try {
            const { status } = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/register`, { email, password });

            if (status === 201) await handleLogin();
            else toast.error('Registration failed');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        }
    };

    // Logic to log in by google button
    const logInByGoogle = async () => {
        console.log(process.env.REACT_APP_SERVER_LINK);
    }

    return (
        <LoginPageContainer>
            <LoadWrapper opacity={afterLoad}>
            <StyledLoginPage>
                <Heading>Sport App</Heading>
                <p>Dream big, work hard, stay focused.</p>
                <Input placeholder='Email' value={email} type='email' onChange={(e) => setEmail(e.target.value)} style={{ margin: '100px 0 10px 0' }} />
                <Input placeholder='Password' value={password} type='password' onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: '10px' }} />
                {/* Show field only if registration */}
                {isRegistrationPage && (
                    <Input placeholder='Repeat password' value={password2} type='password' onChange={(e) => setPassword2(e.target.value)} style={{ marginBottom: '10px' }} />
                )}
                {/* Button to log in or registration */}
                <Button style={{ marginBottom: '10px' }} onClick={isLoginPage ? handleLogin : handleRegistration} >
                    {isLoginPage ? 'Log in' : 'Sing Up'}
                </Button>
                <Button style={{ display: 'block' }} onClick={logInByGoogle}>
                    <InButtonWrapper>
                        <GoogleButtonWrapper>
                            <GoogleIcon />
                        </GoogleButtonWrapper>
                        <p style={{ margin: 0 }}>Log in by Google</p>
                    </InButtonWrapper>
                </Button>
                {/* Link to log in or registration */}
                <a href={isLoginPage ? '/registration' : '/login'} style={{ borderBottom: theme.colors.whiteText }}>
                    <p>{isLoginPage ? "Don't have an account yet? Click here" : "Do you already have an account? Click here"}</p>
                </a>
            </StyledLoginPage>
            </LoadWrapper>
        </LoginPageContainer>
    );
}

export default LoginPage;