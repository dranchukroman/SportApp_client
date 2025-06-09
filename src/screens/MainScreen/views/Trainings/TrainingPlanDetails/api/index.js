import apiInstance from "../../../../../../api/axiosConfig";

export async function getTrainingPlanById(trainingPlanId) {
    try {
        const response = await apiInstance.get(`/api/trainingPlan`, { params: { trainingPlanId } })

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Something went wrong durign getting training plan by id');
        return error.response?.data;
    }
}

export async function addTrainingPlan(planData) {
    try {
        const response = await apiInstance.post(`/api/addTrainingPlan`, planData)

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Something went wrong durign adding training plan');
        return error.response?.data;
    }
}

export async function updateTrainingPlan(planData) {
    try {
        const response = await apiInstance.put(`/api/updateTrainingPlan`, planData)

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Something went wrong durign updating training plan');
        return error.response?.data;
    }
}