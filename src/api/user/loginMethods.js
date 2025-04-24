import axios from "axios";
import { toast } from "sonner";

const baseUrl = process.env.REACT_APP_SERVER_LINK;

export const logIn = async (email, password, navigateMethod, redirectTo) => {
    if (!email && !password) return toast.error(`Email and password are required`);
    try {
        const { data } = await axios.post(`${baseUrl}/api/login`,
            { email, password });
        if (data?.token) {
            localStorage.setItem('authToken', data.token);
            if (redirectTo && navigateMethod) navigateMethod(redirectTo)
            return true;
        } else toast.error(data?.message);
        return false;
    } catch (error) {
        toast.error(error.response?.data?.message || 'Login failed');
        return false;
    }
}

export const register = async (email, password) => {
    if (!email && !password) return toast.error(`Email and password are required`);
    try {
        const isRegistered = await axios.post(`${baseUrl}/api/register`,
            { email, password })
        if (isRegistered.status === 201) {
            return true;
        } return false;
    } catch (error) {
        toast.error(error.response?.data?.message || 'Registration failed');
        return false;
    }
}

export const verifyCode = async (email, code) => {
    if (!email) return toast.error('Email field can not be empty');
    if (!code) return toast.error('Verification code can not be empty');
    try {
        const isCodeValid = await axios.post(`${baseUrl}/api/codeVerification`,
            { email, verificationCode: code });
        if (isCodeValid.status === 200) return true;
        return false;
    } catch (error) {
        toast.error(error.response?.data?.message || 'Code verification failed');
        return false;
    }
}

export const sendVerificationCode = async (email) => {
    if (!email) return toast.error(`Email field can not be empty`);
    try {
        const isCodeSend = await axios.post(`${baseUrl}/api/sendVerificationCode`, { email });
        if (isCodeSend.status === 200) return false;
    } catch (error) {
        toast.error(error.response?.data?.message || 'Can not sent verification code');
        return false;
    }
}

export const checkIfTokenValid = async (navigateMethod, successRedirect, failRedirect) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios.get(`${baseUrl}/api/checkToken`,
            {
                headers: { Authorization: `Bearer ${token}` }
            });
        if (response.status === 200) {
            navigateMethod(successRedirect);
        } else {
            navigateMethod(failRedirect);
        }
    } catch (error) {
        console.error(`Token validation failed: ${error}`);
        navigateMethod(failRedirect);
    }
}

export const checkIfEmailExist = async (email) => {
    try {
        const response = await axios.post(`${baseUrl}/api/isUserExist`, { email });
        if(response.status === 200) return true;
        return false;
    } catch (error) {
        return false
    }
}

export const updatePassword = async (email, newPassword, repeadPassword) => {
    try {
        if(!email) return toast.error('Email field can not be empty');
        if(!newPassword && !repeadPassword) return toast.error('Password field can not be empty');
        if(newPassword !== repeadPassword) return toast.error('Passwords in both fields should be the same');
        const result = await axios.post(`${baseUrl}/api/updatePassword`, {email, newPassword});
        if(result.status === 200) {
            toast.info('Password has been updated');
            return true;
        }
        toast.error('Password has not been updated');
        return false;
    } catch (error) {
        toast.error(error.response?.data?.message || 'Password update failed');
        return false;
    }
}