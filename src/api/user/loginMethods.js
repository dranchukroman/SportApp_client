import axios from "axios";

const baseUrl = process.env.REACT_APP_SERVER_LINK;

export const logIn = async (email, password, navigateMethod, redirectTo) => {
    if (!email || !password) return console.error(`Email and password are required`);
    try {
        const loginStatus = await axios.post(`${baseUrl}/api/login`, { email, password });
        if (loginStatus.status === 200 || loginStatus.data?.token) {
            localStorage.setItem('authToken', loginStatus.data.token);
            if (redirectTo && navigateMethod) navigateMethod(redirectTo)
            return true;
        } else console.error(loginStatus.data?.message);
        return false;
    } catch (error) {
        console.error(error.response?.data?.message || 'Login failed');
        return false;
    }
}

export const register = async (email, password) => {
    if (!email || !password) return console.error(`Email and password are required`);
    try {
        const isRegistered = await axios.post(`${baseUrl}/api/register`,
            { email, password })
        if (isRegistered.status === 201) {
            return true;
        } return false;
    } catch (error) {
        console.error(error.response?.data?.message || 'Registration failed');
        return false;
    }
}

export const verifyCode = async (email, code) => {
    if (!code) return console.error('Verification code can not be empty');
    if (!email) return console.error('Email field can not be empty');
    try {
        const isCodeValid = await axios.post(`${baseUrl}/api/codeVerification`, { email, verificationCode: code });
        if (isCodeValid.status === 200) return true;
        return false;
    } catch (error) {
        console.error(error.response?.data?.message || 'Code verification failed');
        return false;
    }
}

export const sendVerificationCode = async (email) => {
    if (!email) return console.log(`Email field can not be empty`);
    try {
        const isCodeSend = await axios.post(`${baseUrl}/api/sendVerificationCode`, { email });
        if (isCodeSend.status === 200) {
            return isCodeSend.data.isDelivered;
        }
    } catch (error) {
        console.error(error.response?.data?.message, error || 'Something went wrong durign sending verification code');
        return false;
    }
}

export const checkIfTokenValid = async (navigateMethod, successRedirect, failRedirect) => {
    if(!navigateMethod || !successRedirect || !failRedirect) return console.log('All methouds shoud be added');
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
        console.error(error.response?.data?.message || `Token validation failed`);
        navigateMethod(failRedirect);
    }
}

export const checkIfEmailExist = async (email) => {
    if (!email) return console.error(`Email field can not be empty`);
    try {
        const response = await axios.post(`${baseUrl}/api/isUserExist`, { email });
        if(response.status === 200) return response.data.isExist;
        return false;
    } catch (error) {
        console.error(error.response?.data?.message || 'Error while checking if profile already exist');
        return false
    }
}

export const updatePassword = async (email, newPassword, repeadPassword) => {
    try {
        if(!email) return console.error('Email field can not be empty');
        if(!newPassword || !repeadPassword) return console.error('Password field can not be empty');
        if(newPassword !== repeadPassword) return console.error('Passwords in both fields should be the same');
        const result = await axios.post(`${baseUrl}/api/updatePassword`, {email, newPassword});
        if(result.status === 200) {
            console.log('Password has been updated');
            return true;
        }
        console.error('Password has not been updated');
        return false;
    } catch (error) {
        console.error(error.response?.data?.message || 'Password update failed');
        return false;
    }
}