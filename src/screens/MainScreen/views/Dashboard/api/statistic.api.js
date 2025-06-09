import apiInstance from "../../../../../api/axiosConfig";

export async function getFullSpendExercisingTime() {
    try {
        const response = await apiInstance.get(`/api/statFullExercisingTime`);
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting statistic failed');
        return error.response?.data;
    }
}

export async function getAvgTrainingsPerWeek() {
    try {
        const response = await apiInstance.get(`/api/statAvgTrainingsPerWeek`);
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting statistic failed');
        return error.response?.data;
    }
}

export async function getFullWorkoutCompleted() {
    try {
        const response = await apiInstance.get(`/api/statWorkoutsCompleted`);
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting statistic failed');
        return error.response?.data;
    }
}

export async function getFullDbStatistic() {
    try {
        const response = await apiInstance.get(`/api/statFullDbData`);
        
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting statistic failed');
        return error.response?.data;
    }
}