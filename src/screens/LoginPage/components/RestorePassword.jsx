import React, { useEffect } from "react";
import Input from "../../../components/Inputs/Input";
import Button from "../../../components/Buttons/Button";
import { updatePassword } from "../../../api/user/loginMethods";
import { toast } from "sonner";

function RestorePassword({ authData, setAuthData, changeScreen }) {
    useEffect(() => setAuthData((prev) => ({ ...prev, password: '', password2: ''})), [setAuthData]);
    
    const handleUpdatePassword = async () => {
        try {
            if(!authData.password || !authData.password2) return toast.error('Both fields should be filled');
            if(authData.password !== authData.password2) return toast.error('Both passwords should be the same');
            const isUpdated = await updatePassword(authData.email, authData.password, authData.password2);
            if (!isUpdated) return toast.error('Password has not been updated');
            toast.info('Password has been updated')
            changeScreen('Login');
        } catch (error) {
            console.log('Updating password failed ');
            toast.error("Something went wrong, during updating password");
        }
    }

    return (
        <div style={{ marginTop: '100px' }}>
            <p style={{ color: '#666' }}>
                Enter your new password to update
            </p>
            <Input placeholder='Password' type='password' value={authData.password} onChange={(e) => setAuthData((prev) => ({ ...prev, password: e.target.value }))} style={{ marginBottom: '10px' }} />
            <Input placeholder='Repeat password' type='password' value={authData.password2} onChange={(e) => setAuthData((prev) => ({ ...prev, password2: e.target.value }))} style={{ marginBottom: '20px' }} />
            <Button style={{ marginBottom: '10px' }} onClick={handleUpdatePassword} >
                Update password
            </Button>
            <p onClick={() => changeScreen('Login')} style={{ color: '#999', cursor: 'pointer' }}>
                Remember your password? Click here to log in
            </p>
        </div>
    )
}

export default RestorePassword;