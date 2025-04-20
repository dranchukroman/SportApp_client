import React from "react";
import Input from "../../../components/Inputs/Input";
import theme from "../../../styles/theme";
import GoogleIcon from "../../../assets/icons/LoginPage/google"
import Button from "../../../components/Buttons/Button";
import { InButtonWrapper } from "../LoginPage.styled";
import { GoogleButtonWrapper } from "../LoginPage.styled";


function LoginForm({ actionButton, loginData, setLoginData, isLoginPage, logInByGoogle, isRegistrationPage }){

    return (
        <div style={{ marginTop: '100px' }}>
            <Input placeholder='Email' value={loginData.email} type='email' onChange={(e) => setLoginData((prev) => ({...prev, email: e.target.value}))} style={{ marginBottom: '10px' }} />
            <Input placeholder='Password' value={loginData.password} type='password' onChange={(e) => setLoginData((prev) => ({...prev, password: e.target.value}))} style={{ marginBottom: '10px' }} />

            {isRegistrationPage && (
                <Input placeholder='Repeat password' value={loginData.password2} type='password' onChange={(e) => setLoginData((prev) => ({...prev, password2: e.target.value}))} style={{ marginBottom: '10px' }} />
            )}
            {actionButton()}
            <Button style={{ display: 'block' }} onClick={logInByGoogle}>
                <InButtonWrapper>
                    <GoogleButtonWrapper>
                        <GoogleIcon />
                    </GoogleButtonWrapper>
                    <p style={{ margin: 0 }}>Log in by Google</p>
                </InButtonWrapper>
            </Button>

            <a href={isLoginPage ? '/registration' : '/login'} style={{ borderBottom: theme.colors.whiteText }}>
                <p>{isLoginPage ? "Don't have an account yet? Click here" : "Do you already have an account? Click here"}</p>
            </a>
        </div>
    )
}

export default LoginForm;