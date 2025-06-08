import axios from "axios";

export async function getFullSpendExercisingTime() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/statFullExercisingTime`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting statistic failed');
        return error.response?.data;
    }
}

export async function getAvgTrainingsPerWeek() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/statAvgTrainingsPerWeek`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting statistic failed');
        return error.response?.data;
    }
}

export async function getFullWorkoutCompleted() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/statWorkoutsCompleted`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting statistic failed');
        return error.response?.data;
    }
}

export async function getFullDbStatistic() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/statFullDbData`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting statistic failed');
        return error.response?.data;
    }
}

export async function getExerciseHistory(exercise_id){
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/exerciseHistory`, {
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('authToken')}` 
            },
            params: {
                exercise_id
            }
        });
        
        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting exercise history failed');
        return error.response?.data;
    }
}