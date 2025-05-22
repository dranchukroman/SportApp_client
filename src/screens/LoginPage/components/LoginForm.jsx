import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Input from "../../../components/Inputs/Input";
import theme from "../../../styles/theme";
import GoogleIcon from "../../../assets/icons/LoginPage/google"
import Button from "../../../components/Buttons/Button";
import { InButtonWrapper } from "../LoginPage.styled";
import { GoogleButtonWrapper } from "../LoginPage.styled";
import { checkIfEmailExist, logIn, sendVerificationCode } from "../../../api/user/loginMethods";
import { toast } from "sonner";

function LoginForm({ changeScreen, authData, setAuthData }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isRegistrationPage = location.pathname.includes('/registration');

    const sendCodeToRegister = async () => {
        try {
            if(authData.email === '') return toast.error('Email field should not be empty');
            const userExisting = await checkIfEmailExist(authData.email);
            if (userExisting.data.isExist) {
                toast.error(userExisting.message);
                return navigate('/login');
            }

            const codeDelivering = await sendVerificationCode(authData.email);
            if (!codeDelivering.success) {
                toast.error(codeDelivering.message);
                return;
            }

            changeScreen('Verification');
        } catch (error) {
            console.error('Registration failed ', error);
            toast.error('Registration failed');
        }
    }

    const handleLogIn = async () => {
        try {
            if(!authData.email || !authData.password) return toast.error('All fields should be filled');
            const loginData = await logIn(authData.email, authData.password);
            if(!loginData.success) return toast.error(loginData.message);
            localStorage.setItem('authToken', loginData.data.token);
            navigate('/dashboard')
        } catch (error) {
            console.log(`Login failed`);
        }
    }

    return (
        <div style={{ marginTop: '100px' }}>
            <Input placeholder='Email' value={authData.email} type='text'
                onChange={(e) => setAuthData((prev) => ({ ...prev, email: e.target.value }))} style={{ marginBottom: '10px' }} />
            <Input placeholder='Password' value={authData.password} type='password'
                onChange={(e) => setAuthData((prev) => ({ ...prev, password: e.target.value }))} style={{ marginBottom: '10px' }} />

            {isRegistrationPage && (
                <Input placeholder='Repead password' value={authData.password2} type='password' onChange={(e) => setAuthData((prev) => ({ ...prev, password2: e.target.value }))} style={{ marginBottom: '10px' }} />
            )}

            <Button style={{ marginBottom: '10px' }} onClick={isRegistrationPage ? sendCodeToRegister : handleLogIn} >
                {isRegistrationPage ? 'Sing Up' : 'Log In'}
            </Button>
            <Button style={{ display: 'none' }} onClick={() => console.log('Log in by google')}>
                <InButtonWrapper>
                    <GoogleButtonWrapper>
                        <GoogleIcon />
                    </GoogleButtonWrapper>
                    <p style={{ margin: 0 }}>Log in by Google</p>
                </InButtonWrapper>
            </Button>

            <a href={!isRegistrationPage ? '/registration' : '/login'} style={{ borderBottom: theme.colors.whiteText }}>
                <p>{!isRegistrationPage ? "Don't have an account yet? Click here" : "Do you already have an account? Click here"}</p>
            </a>
            {!isRegistrationPage ?
                <p onClick={() => changeScreen('ForgotPassword')} style={{ color: '#999', cursor: 'pointer' }}>
                    Forgot password? Click here
                </p> : null}
        </div>
    )
}

export default LoginForm;