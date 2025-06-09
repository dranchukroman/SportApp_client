import axios from "axios";

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