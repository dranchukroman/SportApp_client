import apiInstance from "../../../../../../api/axiosConfig";

export async function getTrainingDayById(trainingDayId) {
    try {
        const response = await apiInstance.get(`/api/trainingDay`, { params: { trainingDayId } });
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting training day by id failed');
        return error.response?.data;
    }
}
export async function addTrainingDay(dayData) {
    try {
        const response = await apiInstance.post(`/api/addTrainingDay`, dayData);
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Adding training day failed');
        return error.response?.data;
    }
}
export async function updateTrainingDay(dayData) {
    try {
        const response = await apiInstance.put(`/api/updateTrainingDays`, dayData);
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Updating training day failed');
        console.error(error);
        return error.response?.data;
    }
}