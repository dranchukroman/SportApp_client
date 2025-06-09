import apiInstance from "../../../../../../api/axiosConfig";

export async function getAllExerciseInDay(day_id) {
    try {
        const response = await apiInstance.get(`/api/getDayExercise`, { params: { day_id } });
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting all exercises failed');
        return error.response?.data;
    }
}

export async function deleteExerciseInDay(day_exercise_id) {
    try {
        const response = await apiInstance.delete(`/api/deleteDayExercise`, { data: { day_exercise_id } });
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Deleting exercise failed');
        return error.response?.data;
    }
}