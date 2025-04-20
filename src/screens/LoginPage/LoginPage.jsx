import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginPageContainer } from './LoginPage.styled'
import axios from 'axios';
import Heading from '../../components/Headings/Heading';
import Button from '../../components/Buttons/Button';
import { toast } from 'sonner';
import { LoadWrapper } from '../../components/Loaders/SingleLoader/SingleLoader.styled';
import LoginForm from './components/LoginForm';
import VerificationForm from './components/VerificationForm';

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

    const [loginData, setLoginData] = useState({
        email: 'test2',
        password: 'test2',
        password2: 'test2',
        verificationCode: ''
    })

    const [isVerification, setIsVerification] = useState(false);
    const [resendTimer, setResendTimer] = useState(10);
    const [resendStatus, setResendStatus] = useState(false);
    const [afterLoad, setAfterLoad] = useState(0);

    useEffect(() => setAfterLoad(1), [afterLoad]);

    const saveTokenAndRedirect = (token, path) => {
        localStorage.setItem('authToken', token);
        navigate(path);
    }

    useEffect(() => {
        if (resendTimer === 0) return setResendStatus(true);
        if (resendStatus) setResendStatus(false);

        const interval = setInterval(() => {
            setResendTimer(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [resendTimer, resendStatus]);

    const handleLogin = async (newUser) => {
        if (!loginData.email && !loginData.password) return toast.error(`Email and password are required`);
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/login`, { email: loginData.email, password: loginData.password });
            data?.token ? saveTokenAndRedirect(data.token, newUser ? '/createProfile' : '/dashboard') : toast.error(data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        }
    }

    const logInByGoogle = async () => {
        console.log(process.env.REACT_APP_SERVER_LINK);
    }

    const verifyAndRegister = async () => {
        if (loginData.verificationCode === '') toast.error('Verification code is required');

        try {
            const { status } = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/codeVerification`, { email: loginData.email, verificationCode: loginData.verificationCode });

            if (status === 201) {
                const newUser = true;
                handleLogin(newUser);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Code verification failed');
        }
        console.log('Code verification');
    }

    const sendCode = async () => {
        if (!loginData.email || !loginData.password || !loginData.password2) return toast.error('All fields are required');
        if (loginData.password !== loginData.password2) return toast.error('Passwords do not match');

        try {
            const { status } = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/register`, { email: loginData.email, password: loginData.password });

            if (status === 200) {
                setIsVerification(true);
                setResendTimer(10);
            } else toast.error('Registration failed');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        }
    }

    const actionButton = () => {
        let buttonData = { method: null, copy: 'Change button' };
        if (isLoginPage) buttonData = { method: handleLogin, copy: 'Log In' }
        else if (isRegistrationPage && isVerification) buttonData = { method: verifyAndRegister, copy: 'Verify' }
        else if (isRegistrationPage && !isVerification) buttonData = { method: sendCode, copy: 'Sing Up' }
        return (
            <Button style={{ marginBottom: '10px' }} onClick={buttonData.method} >
                {buttonData.copy}
            </Button>
        )
    }

    return (
        <LoginPageContainer>
            <LoadWrapper opacity={afterLoad}>
                <Heading>Sport App</Heading>
                <p>Dream big, work hard, stay focused.</p>
                {
                    isVerification
                        ? <VerificationForm actionButton={actionButton} loginData={loginData} setLoginData={setLoginData} resendStatus={resendStatus} sendCode={sendCode} resendTimer={resendTimer} />
                        : <LoginForm actionButton={actionButton} loginData={loginData} setLoginData={setLoginData} isLoginPage={isLoginPage} logInByGoogle={logInByGoogle} isRegistrationPage={isRegistrationPage} />
                }
            </LoadWrapper>
        </LoginPageContainer>
    );
}

export default LoginPage;