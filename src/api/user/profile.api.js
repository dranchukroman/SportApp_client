import apiInstance from "../axiosConfig";

export async function getProfileData() {
    try {
        const response = await apiInstance.get(`/api/profile`);

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting profile data failed');
        return error.response?.data;
    }
}

export async function createProfile(profileData) {
    try {
        const response = await apiInstance.post(`/api/createProfile`, profileData);
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting profile data failed');
        return error.response?.data;
    }
}

export async function updateProfile(profileData) {
    try {
        const response = await apiInstance.put(`/api/updateProfile`, profileData);
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting profile data failed');
        return error.response?.data;
    }
}

export async function deleteAccoutn() {
    try {
        const response = await apiInstance.delete(`/api/delete`);
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting profile data failed');
        return error.response?.data;
    }
}