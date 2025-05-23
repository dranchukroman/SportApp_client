import React from "react";
import Input from "../../../components/Inputs/Input";
import Button from "../../../components/Buttons/Button";
import { toast } from "sonner";
import { checkIfEmailExist, sendVerificationCode } from "../../../api/user/loginMethods";
import { useNavigate } from "react-router-dom";

function ForgotPassword({ changeScreen, currentScreen, setAuthData, authData }) {
    const navigate = useNavigate();

    const handleRestoreRequest = async () => {
        try {
            if(!authData.email) return toast.error('Email field should not be empty');
            const emailVerification = await checkIfEmailExist(authData.email);
            if(!emailVerification.data.isExist){
                navigate('/registration');
                changeScreen('Registration');
                return toast.error(emailVerification.message);
            }

            const isDelivered = await sendVerificationCode(authData.email);
            if (!isDelivered.data.isDelivered) {
                return toast.error(isDelivered.message);
            }

            changeScreen('VerificationToRestore');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Sending verification code failed');
        }
    }

    return (
        <div style={{ marginTop: '100px' }}>
            <p style={{ color: '#666' }}>
                Enter your email address and we’ll send you a <br />6-digit code to reset your password. <br />The code is valid for 10 minutes.
            </p>
            <Input placeholder='Email' type='email' value={authData.email} onChange={(e) => setAuthData((prev) => ({ ...prev, email: e.target.value }))} style={{ marginBottom: '20px' }} />
            <Button style={{ marginBottom: '10px' }} onClick={handleRestoreRequest} >
                Send verification code
            </Button>
            {currentScreen === 'ForgotPassword' ?
                <p onClick={() => changeScreen('Login')} style={{ color: '#999', cursor: 'pointer' }}>
                    Remember your password? Click here
                </p> : null}
        </div>
    )
}

export default ForgotPassword;