import axios from "axios";

const apiInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_LINK,
});

apiInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiInstance;