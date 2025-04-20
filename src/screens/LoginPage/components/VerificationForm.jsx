import React from "react";
import Input from "../../../components/Inputs/Input";


function VerificationForm({ loginData, setLoginData, actionButton, sendCode, resendStatus, resendTimer }) {
    return (
        <div style={{ marginTop: '100px' }}>
            <p style={{ color: '#666' }}>
                We’ve sent a 6-digit verification code to your email. <br />Please enter the code below to verify your email.
            </p>
            <Input placeholder='Verification Code' value={loginData.verificationCode} onChange={(e) => setLoginData((prev) => ({...prev, verificationCode: e.target.value}))} style={{ marginBottom: '20px' }} />
            {actionButton()}
            <p style={{ marginTop: 0, color: '#666' }}>
                Didn’t get the code? Check your spam or wait a moment.
            </p>
            {resendTimer > 0 && !resendStatus ? (
                <p style={{ color: '#999', cursor: 'pointer' }}>Resend code in 00:{(resendTimer < 10 ? `0${resendTimer}` : resendTimer.toString())}</p>
            ) : <p style={{ cursor: 'pointer' }} onClick={sendCode}>Click here to send code again!</p>}
        </div>
    )
}

export default VerificationForm;