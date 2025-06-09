import apiInstance from "../../../../../../api/axiosConfig";

export async function getExercisesFromLibrary(muscle_group) {
    try {
        const response = await apiInstance.get(`/api/getAllExercises`, { params: { muscle_group } });

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting exercise from list failed');
        return error.response?.data;
    }
}

export async function getMuscleGroups() {
    try {
        const response = await apiInstance.get(`/api/categories`);

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting muscle groups failed');
        return error.response?.data;
    }
}


export async function addExerciseInDay(exerciseData) {
    try {
        const response = await apiInstance.post(`/api/addDayExercise`, exerciseData);
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Message');
        return error.response?.data;
    }
}

export async function updateExerciseInDay(exerciseData) {
    try {
        const response = await apiInstance.put(`/api/updateDayExercise`, exerciseData);
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Message');
        return error.response?.data;
    }
}