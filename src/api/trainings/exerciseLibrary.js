import axios from "axios";

export async function getExercisesFromLibrary(muscle_group) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/getAllExercises`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
            params: { muscle_group }
        });

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting exercise from list failed');
        return error.response?.data;
    }
}

export async function getMuscleGroups() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/categories`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting muscle groups failed');
        return error.response?.data;
    }
}