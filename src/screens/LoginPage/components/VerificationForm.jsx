import React, { useState, useEffect } from "react";
import Input from "../../../components/Inputs/Input";
import Button from "../../../components/Buttons/Button";
import { useNavigate } from 'react-router-dom';
import { register, sendVerificationCode, verifyCode } from "../../../api/user/loginMethods";
import { toast } from 'sonner';

function VerificationForm({ changeScreen, currentScreen, authData, setAuthData, setAfterLoad, }) {
    const navigate = useNavigate();
    const isRestorePass = currentScreen === 'VerificationToRestore';

    const [resendTimer, setResendTimer] = useState(59);

    useEffect(() => {
        if (resendTimer === 0) return;

        const interval = setInterval(() => {
            setResendTimer(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [resendTimer]);
    
    const finishRegistration = async () => {
        if (authData.verificationCode.trim() === '') return toast.error('Verification code is required');
        if(!authData.email) return toast.error('Email field can not be empty');
        try {
            const response = await verifyCode(authData.email, authData.verificationCode);
            if (!response.success) return toast.error(response.message);

            const registerData = await register(authData.email, authData.password);
            console.log(registerData);
            if (!registerData.success) return toast.error(registerData.message);
            if (!registerData.data.token) navigate('/login');

            setAfterLoad(0);
            localStorage.setItem('authToken', registerData.data.token);
            navigate('/createProfile');
        } catch (error) {
            toast.error('Registration failed, try again');
        }
    }

    const finishVerificationToRestorePass = async () => {
        if (authData.verificationCode.trim() === '') return toast.error('Verification code is required');
        if(!authData.email) return toast.error('Email field can not be empty');
        try {
            const response = await verifyCode(authData.email, authData.verificationCode);
            if (!response.success) return toast.error(response.message);
            changeScreen('UpdatePassword');
        } catch (error) {
            toast.error('Verification failed');
        }
    }
    
    return (
        <div style={{ marginTop: '100px' }}>
            <p style={{ color: '#666' }}>
                We’ve sent a 6-digit verification code to your email. <br />Please enter the code below to verify your email.
            </p>
            <Input placeholder='Verification Code' value={authData.verificationCode} onChange={(e) => setAuthData((prev) => ({ ...prev, verificationCode: e.target.value }))} style={{ marginBottom: '20px' }} />
            <Button style={{ marginBottom: '10px' }} onClick={isRestorePass ? finishVerificationToRestorePass : finishRegistration} >
                {isRestorePass ? 'Verify code and restore password' : 'Verify code'}
            </Button>
            <p style={{ marginTop: 0, color: '#666' }}>
                Didn’t get the code? Check your spam or wait a moment.
            </p>
            {resendTimer > 0 ? (
                <p style={{ color: '#999', cursor: 'pointer' }}>Resend code in 00:{(resendTimer < 10 ? `0${resendTimer}` : resendTimer.toString())}</p>
            ) : <p style={{ cursor: 'pointer' }} onClick={() => {sendVerificationCode(authData.email); setResendTimer(59)}}>Click here to send code again!</p>}
        </div>
    )
}

export default VerificationForm;