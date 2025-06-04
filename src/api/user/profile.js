import axios from "axios";

export async function getProfileData() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/profile`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting profile data failed');
        return error.response?.data;
    }
}

export async function createProfile(profileData) {
    // Add check if fields not exist
    // Necessary fields:
    // first_name: userData.name,
    // last_name: userData.surname,
    // height: userData.height,
    // weight: userData.weight,
    // age: userData.age,
    // gender: userData.gender,
    // goal: userData.goal,
    // activity_level: userData.activityLevel,

    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/createProfile`, profileData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting profile data failed');
        return error.response?.data;
    }
}

export async function updateProfile(profileData) {
    // Add check if fields not exist
    // Necessary fields:
    // first_name: userData.name,
    // last_name: userData.surname,
    // height: userData.height,
    // weight: userData.weight,
    // age: userData.age,
    // gender: userData.gender,
    // goal: userData.goal,
    // activity_level: userData.activityLevel,

    try {
        const response = await axios.put(`${process.env.REACT_APP_SERVER_LINK}/api/updateProfile`, profileData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting profile data failed');
        return error.response?.data;
    }
}

export async function deleteAccoutn() {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_SERVER_LINK}/api/delete`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting profile data failed');
        return error.response?.data;
    }
}