import axios from "axios";

const token = localStorage.getItem('authToken');

export async function getTrainingPlan() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/trainingPlans`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Something went wrong durign getting training plan data');
        return error.response?.data;
    }
}

export async function getTrainingPlanById(trainingPlanId) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/trainingPlan`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
            params: { trainingPlanId }
        })

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Something went wrong durign getting training plan by id');
        return error.response?.data;
    }
}

export async function addTrainingPlan(planData) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/addTrainingPlan`, planData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        })

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Something went wrong durign adding training plan');
        return error.response?.data;
    }
}

export async function updateTrainingPlan(planData) {
    try {
        const response = await axios.put(`${process.env.REACT_APP_SERVER_LINK}/api/updateTrainingPlan`, planData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        })

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Something went wrong durign updating training plan');
        return error.response?.data;
    }
}

export async function deleteTrainingPlan(deletePlanId) {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_SERVER_LINK}/api/deleteTrainingPlan`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
            data: { trainingPlanId: deletePlanId }
        });

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Something went wrong durign deleting training plan data');
        return error.response?.data;
    }
}

