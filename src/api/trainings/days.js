import axios from "axios";

export async function getTrainingDays(trainingPlanId) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/getTrainingDays`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
            params: { trainingPlanId }
        });

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting all training days failed');
        return error.response?.data;
    }
}
export async function getTrainingDayById(trainingDayId) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/trainingDay`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
            params: { trainingDayId }
        });

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting training day by id failed');
        return error.response?.data;
    }
}
export async function addTrainingDay(dayData) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/addTrainingDay`, dayData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Adding training day failed');
        return error.response?.data;
    }
}
export async function updateTrainingDay(dayData) {
    try {
        const response = await axios.put(`${process.env.REACT_APP_SERVER_LINK}/api/updateTrainingDays`, dayData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Updating training day failed');
        console.error(error);
        return error.response?.data;
    }
}
export async function deleteTrainingDay(day_id) {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_SERVER_LINK}/api/deleteTrainingDays`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
            data: { day_id }
        });

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Deleting training day failed');
        return error.response?.data;
    }
}