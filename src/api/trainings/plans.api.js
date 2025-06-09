import apiInstance from "../axiosConfig";

export async function getTrainingPlan() {
    try {
        const response = await apiInstance.get(`/api/trainingPlans`);

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Something went wrong durign getting training plan data');
        return error.response?.data;
    }
}