import apiInstance from "../axiosConfig";

export const checkIfTokenValid = async () => {
    try {
        const response = await apiInstance.get(`/api/checkToken`);
        return response.data.data;
    } catch (error) {
        console.error(error.response?.data?.message || `Token validation failed`);
    }
}