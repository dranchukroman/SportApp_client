import apiInstance from "../../../api/axiosConfig";

export const logIn = async (email, password) => {
    if (!email || !password) return console.error(`Email and password are required`);
    try {
        const loginStatus = await apiInstance.post(`/api/login`, { email, password });
        return loginStatus?.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Login failed');
        return error.response?.data;
    }
}

export const register = async (email, password) => {
    if (!email || !password) return console.error(`Email and password are required`);
    try {
        const response = await apiInstance.post(`/api/register`, { email, password })
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
        const response = await apiInstance.post(`/api/codeVerification`, { email, verificationCode: code });
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Code verification failed');
        return error.response?.data;
    }
}

export const sendVerificationCode = async (email) => {
    if (!email) return console.log(`Email field can not be empty`);
    try {
        const response = await apiInstance.post(`/api/sendVerificationCode`, { email });
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message, error || 'Something went wrong durign sending verification code');
        return error.response?.data;
    }
}

export const checkIfEmailExist = async (email) => {
    if (!email) return console.error(`Email field can not be empty`);
    try {
        const response = await apiInstance.post(`/api/isUserExist`, { email });
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
        const result = await apiInstance.post(`/api/updatePassword`, { email, newPassword });
        return result.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Password update failed');
        return error.response?.data;
    }
}