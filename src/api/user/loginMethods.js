import axios from "axios";

const baseUrl = process.env.REACT_APP_SERVER_LINK;

export const logIn = async (email, password) => {
    if (!email || !password) return console.error(`Email and password are required`);
    try {
        const loginStatus = await axios.post(`${baseUrl}/api/login`, { email, password });
        return loginStatus?.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Login failed');
        return error.response?.data;
    }
}

export const register = async (email, password) => {
    if (!email || !password) return console.error(`Email and password are required`);
    try {
        const response = await axios.post(`${baseUrl}/api/register`, { email, password })
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Registration failed');
        return error.response?.data;
    }
}

export const verifyCode = async (email, code) => {
    if (!code) return console.error('Verification code can not be empty');
    if (!email) return console.error('Email field can not be empty');
    try {
        const response = await axios.post(`${baseUrl}/api/codeVerification`, { email, verificationCode: code });
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Code verification failed');
        return error.response?.data;
    }
}

export const sendVerificationCode = async (email) => {
    if (!email) return console.log(`Email field can not be empty`);
    try {
        const response = await axios.post(`${baseUrl}/api/sendVerificationCode`, { email });
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message, error || 'Something went wrong durign sending verification code');
        return error.response?.data;
    }
}

export const checkIfTokenValid = async () => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios.get(`${baseUrl}/api/checkToken`,
            {
                headers: { Authorization: `Bearer ${token}` }
            });
        return response.data.data;
    } catch (error) {
        console.error(error.response?.data?.message || `Token validation failed`);
    }
}

export const checkIfEmailExist = async (email) => {
    if (!email) return console.error(`Email field can not be empty`);
    try {
        const response = await axios.post(`${baseUrl}/api/isUserExist`, { email });
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Error while checking if profile already exist');
        return error.response?.data;
    }
}

export const updatePassword = async (email, newPassword, repeadPassword) => {
    try {
        if (!email) return console.error('Email field can not be empty');
        if (!newPassword || !repeadPassword) return console.error('Password field can not be empty');
        if (newPassword !== repeadPassword) return console.error('Passwords in both fields should be the same');
        const result = await axios.post(`${baseUrl}/api/updatePassword`, { email, newPassword });
        return result.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Password update failed');
        return error.response?.data;
    }
}