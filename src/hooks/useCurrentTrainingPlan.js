import { useState, useEffect } from "react";
import { getTrainingPlan } from "../api/trainings/plans.api";
import { toast } from "sonner";

const useCurrentTrainingPlan = () => {
    const [trainingPlans, setTrainingPlans] = useState([]);
    
    useEffect(() => {
        const fetchTrainingPlans = async () => {
            try {
                const planData = await getTrainingPlan();
                if (planData.success && planData.data.trainingPlans.length > 0) {
                    setTrainingPlans(planData.data.trainingPlans);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Can\'t get training plans');
            }
        };
        fetchTrainingPlans();
    }, []);

    const currentPlan = trainingPlans?.find(plan => plan.is_current_plan === true)

    return currentPlan;
}

export default useCurrentTrainingPlan;