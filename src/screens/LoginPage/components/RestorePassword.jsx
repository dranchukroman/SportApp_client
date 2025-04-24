import React from "react";
import Input from "../../../components/Inputs/Input";

function RestorePassword({ loginData, setLoginData, currentScreen, setCurrentScreen, actionButton}){

    return (
        <div style={{ marginTop: '100px' }}>
            <p style={{ color: '#666' }}>
            Enter your new password to update
            </p>
            <Input placeholder='Password' type='password' value={loginData.password} onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))} style={{ marginBottom: '10px' }} />
            <Input placeholder='Repead password' type='password' value={loginData.password2} onChange={(e) => setLoginData((prev) => ({ ...prev, password2: e.target.value }))} style={{ marginBottom: '20px' }} />
            {actionButton()}
            <p onClick={() => setCurrentScreen('Login')} style={{ color: '#999', cursor: 'pointer' }}>
                Remember your password? Click here to log in
            </p>
        </div>
    )
}

export default RestorePassword;