import React from "react";
import Input from "../../../components/Inputs/Input";

function ForgotPassword({ setCurrentScreen, currentScreen, setRestorePass, actionButton, setLoginData, loginData, sendCode, resendTimer, }) {


    return (
        <div style={{ marginTop: '100px' }}>
            <p style={{ color: '#666' }}>
            Enter your email address and we’ll send you a <br/>6-digit code to reset your password. <br/>The code is valid for 10 minutes.
            </p>
            <Input placeholder='Email' type='email' value={loginData.email} onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))} style={{ marginBottom: '20px' }} />
            {actionButton()}
            {currentScreen === 'ForgotPassword' ?
                <p onClick={() => setCurrentScreen('Login')} style={{ color: '#999', cursor: 'pointer' }}>
                    Remember your password?
                </p> : null}
        </div>
    )
}

export default ForgotPassword;