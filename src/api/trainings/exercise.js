import axios from "axios";

export async function getAllExerciseInDay(day_id) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/getDayExercise`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
            params: { day_id }
        });

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting all exercises failed');
        return error.response?.data;
    }
}

export async function getExerciseInDayById(exerciseId) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/exercise`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
            params: { exerciseId }
        });

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Getting exercise by id failed');
        return error.response?.data;
    }
}

export async function addExerciseInDay(exerciseData) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/addDayExercise`, exerciseData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Message');
        return error.response?.data;
    }
}

export async function updateExerciseInDay(exerciseData) {
    try {
        const response = await axios.put(`${process.env.REACT_APP_SERVER_LINK}/api/updateDayExercise`, exerciseData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Message');
        return error.response?.data;
    }
}

export async function deleteExerciseInDay(day_exercise_id) {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_SERVER_LINK}/api/deleteDayExercise`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
            data: { day_exercise_id }
        });

        return response.data;
    } catch (error) {
        console.error(error.response?.data?.message || 'Deleting exercise failed');
        return error.response?.data;
    }
}