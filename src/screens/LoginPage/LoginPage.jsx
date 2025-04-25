import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LoginPageContainer } from './LoginPage.styled'
import Heading from '../../components/Headings/Heading';
import { LoadWrapper } from '../../components/Loaders/SingleLoader/SingleLoader.styled';
import LoginForm from './components/LoginForm';
import VerificationForm from './components/VerificationForm';
import ForgotPassword from './components/ForgotPassword';
import RestorePassword from './components/RestorePassword';

function LoginPage() {
    const location = useLocation();
    const isLoginPage = location.pathname.includes('/login');

    const [currentScreen, setCurrentScreen] = useState(isLoginPage ? 'Login' : 'Registration');

    const [authData, setAuthData] = useState({
        email: '',
        password: '',
        password2: '',
        verificationCode: ''
    })

    const [afterLoad, setAfterLoad] = useState(0);

    useEffect(() => {
        let timeout = setTimeout(() => setAfterLoad(1), 300);
        return () => clearTimeout(timeout);
    }, [currentScreen]);

    const getCurrentScreen = () => {
        switch (currentScreen) {
            case 'Login':
            case 'Registration':
                return <LoginForm changeScreen={changeScreen} authData={authData} setAuthData={setAuthData} />
            case 'Verification':
            case 'VerificationToRestore':
                return <VerificationForm changeScreen={changeScreen} currentScreen={currentScreen} authData={authData} setAuthData={setAuthData} setAfterLoad={setAfterLoad} />
            case 'ForgotPassword':
                return <ForgotPassword changeScreen={changeScreen} currentScreen={currentScreen} setAuthData={setAuthData} authData={authData} />
            case 'UpdatePassword':
                return <RestorePassword changeScreen={changeScreen} authData={authData} setAuthData={setAuthData} />
            default:
                return <LoginForm changeScreen={changeScreen} authData={authData} setAuthData={setAuthData} />
        }
    }

    const changeScreen = (newScreen) => {
        setAfterLoad(0);
        setTimeout(() => setCurrentScreen(newScreen), 300)
    }

    return (
        <LoginPageContainer>
            <LoadWrapper opacity={afterLoad}>
                <Heading>Sport App</Heading>
                <p>Dream big, work hard, stay focused.</p>
                {getCurrentScreen()}
            </LoadWrapper>
        </LoginPageContainer>
    );
}

export default LoginPage;