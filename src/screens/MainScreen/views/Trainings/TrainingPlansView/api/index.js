import apiInstance from "../../../../../../api/axiosConfig";

export async function deleteTrainingPlan(planId) {
    try {
        const response = await apiInstance.delete(`/api/deleteTrainingPlan`, { data: { planId } });

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Something went wrong durign deleting training plan data');
        return error.response?.data;
    }
}