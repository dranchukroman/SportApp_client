import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginPageContainer } from './LoginPage.styled'
import Heading from '../../components/Headings/Heading';
import Button from '../../components/Buttons/Button';
import { toast } from 'sonner';
import { LoadWrapper } from '../../components/Loaders/SingleLoader/SingleLoader.styled';
import LoginForm from './components/LoginForm';
import VerificationForm from './components/VerificationForm';
import ForgotPassword from './components/ForgotPassword';
import RestorePassword from './components/RestorePassword';

import { logIn, register, verifyCode, sendVerificationCode, checkIfEmailExist, updatePassword } from '../../api/user/loginMethods';

function LoginPage() {
    // Location tools
    const navigate = useNavigate();
    const location = useLocation();
    const isLoginPage = location.pathname.includes('/login');
    const isRegistrationPage = location.pathname.includes('/registration');

    const [currentScreen, setCurrentScreen] = useState(isLoginPage ? 'Login' : 'Registration');

    const [loginData, setLoginData] = useState({
        email: 'roman2003dranchuk@gmail.com',
        password: 'test2',
        password2: 'test2',
        verificationCode: ''
    })

    const [resendTimer, setResendTimer] = useState(59);
    const [afterLoad, setAfterLoad] = useState(0);

    useEffect(() => {
        let timeout = setTimeout(() => setAfterLoad(1), 300);
        return () => clearTimeout(timeout);
    }, [currentScreen]); // Animation to show items after load

    // Timer to send code again
    useEffect(() => {
        if (resendTimer === 0) return;

        const interval = setInterval(() => {
            setResendTimer(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [resendTimer]);

    // Send verification code
    const sendCode = async (newScreen) => {
        try {
            const isDelivered = await sendVerificationCode(loginData.email);
            if (!isDelivered) return;
            setAfterLoad(0);
        } finally {
            changeScreen(newScreen)
            setTimeout(() => {
                setAfterLoad(1);
            }, 300);
            setResendTimer(59);
        }
    }

    const verifyAndRestore = async () => {
        const isCodeValid = await verifyCode(loginData.email, loginData.verificationCode);
        if (!isCodeValid) return toast.error('Verification code is not valid');
        changeScreen('UpdatePassword');
    }

    const sendCodeToRestorePass = async () => {
        var isExist = false;
        try {
            isExist = await checkIfEmailExist(loginData.email);
        } finally {
            if (!isExist) return toast.error(`${loginData.email} do not exist`);
            sendVerificationCode(loginData.email);
            changeScreen('VerificationToRestore');
        }
    }

    const handleRegistration = async () => {
        if (loginData.verificationCode.trim() === '') return toast.error('Verification code is required');
        try {
            const isCodeValid = await verifyCode(loginData.email, loginData.verificationCode);
            console.log(isCodeValid)
            if (!isCodeValid) return;

            const isRegistered = await register(loginData.email, loginData.password);
            if (!isRegistered) return;

        } catch (error) {
            toast.error('Something went wrong during registration');
        } finally {
            setAfterLoad(0);
            await logIn(loginData.email, loginData.password, navigate, '/createProfile');
        }
    };

    const logInByGoogle = async () => {
        console.log('Log in by Google');
    }

    const updatePasswordAndRedirect = async () => {
        try {
            const isUpdated = await updatePassword(loginData.email, loginData.password, loginData.password2);
            if (!isUpdated) return;
            changeScreen('Login');
        } catch (error) {
            console.log('Updating password failed');
        }
    }

    const getCurrentScreen = () => {
        switch (currentScreen) {
            case 'Login':
            case 'Registration':
                return <LoginForm currentScreen={currentScreen} setCurrentScreen={changeScreen} actionButton={actionButton} loginData={loginData} setLoginData={setLoginData} isLoginPage={isLoginPage} logInByGoogle={logInByGoogle} isRegistrationPage={isRegistrationPage} />
            case 'Verification':
            case 'VerificationToRestore':
                return <VerificationForm currentScreen={currentScreen} setCurrentScreen={changeScreen} actionButton={actionButton} loginData={loginData} setLoginData={setLoginData} sendCode={() => sendVerificationCode(loginData.email)} resendTimer={resendTimer} />
            case 'ForgotPassword':
                return <ForgotPassword currentScreen={currentScreen} setCurrentScreen={changeScreen} actionButton={actionButton} loginData={loginData} sendCode={() => sendVerificationCode(loginData.email)} setLoginData={setLoginData} resendTimer={resendTimer} />
            case 'UpdatePassword':
                return <RestorePassword currentScreen={currentScreen} setCurrentScreen={changeScreen} actionButton={actionButton} loginData={loginData} setLoginData={setLoginData} />
            default:
                return <LoginForm currentScreen={currentScreen} setCurrentScreen={changeScreen} actionButton={actionButton} loginData={loginData} setLoginData={setLoginData} isLoginPage={isLoginPage} logInByGoogle={logInByGoogle} isRegistrationPage={isRegistrationPage} />
        }
    }

    const changeScreen = (newScreen) => {
        setAfterLoad(0);
        setTimeout(() => setCurrentScreen(newScreen), 300)
        
    }

    const actionButton = () => {
        let buttonData = { method: null, copy: 'null' };
        if (currentScreen === 'Login') buttonData = { method: () => logIn(loginData.email, loginData.password, navigate, '/dashboard'), copy: 'Log In' }
        else if (currentScreen === 'Verification') buttonData = { method: handleRegistration, copy: 'Verify' }
        else if (currentScreen === 'Registration') buttonData = { method: () => { checkIfEmailExist(loginData.email); sendCode('Verification') }, copy: 'Sing Up' }
        else if (currentScreen === 'VerificationToRestore') buttonData = { method: () => verifyAndRestore(), copy: 'Verify code and restore password' }
        else if (currentScreen === 'ForgotPassword')
            buttonData = {
                method: sendCodeToRestorePass,
                copy: 'Send verification code'
            }
        else if (currentScreen === 'UpdatePassword') buttonData = { method: () => updatePasswordAndRedirect(), copy: 'Update password' }
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
                {getCurrentScreen()}
            </LoadWrapper>
        </LoginPageContainer>
    );
}

export default LoginPage;