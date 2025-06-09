import apiInstance from "../axiosConfig";

export async function getExerciseInDayById(exerciseId) {
    try {
        const response = await apiInstance.get(`/api/exercise`, { params: { exerciseId } });
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting exercise by id failed');
        return error.response?.data;
    }
}