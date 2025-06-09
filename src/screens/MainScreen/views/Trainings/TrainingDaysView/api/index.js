import apiInstance from "../../../../../../api/axiosConfig";

export async function getTrainingDays(trainingPlanId) {
    try {
        const response = await apiInstance.get(`/api/getTrainingDays`, { params: { trainingPlanId } });
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting all training days failed');
        return error.response?.data;
    }
}
export async function deleteTrainingDay(day_id) {
    try {
        const response = await apiInstance.delete(`/api/deleteTrainingDays`, { data: { day_id } });
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Deleting training day failed');
        return error.response?.data;
    }
}