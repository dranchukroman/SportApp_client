import apiInstance from "../axiosConfig";

export async function saveTrainingRecords(trainingPlanId, trainingDayId, progress) {
    try {
        const response = await apiInstance.post(`${process.env.REACT_APP_SERVER_LINK}/api/saveTrainingProgress`, { trainingPlanId, trainingDayId, progress })
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Something went wrong durign saving training progress');
        return error.response?.data;
    }
}