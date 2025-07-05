import React, { useEffect, useState } from "react";
import { StyledFunctionalBar, FunctionalBarWrapper } from './FunctionalBar.styled'
import Calendar from "../Calendar/Calendar";
import DivideLine from '../Dividers/DivideLine'
import { toast } from "sonner";
import { getTrainingPlan } from "../../api/trainings/plans.api";

function FunctionalBar({ style, children }) {
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
    return (
        <StyledFunctionalBar style={style}>
            <FunctionalBarWrapper>
                <Calendar currentPlan={trainingPlans?.find(plan => plan.is_current_plan === true)} />
                <DivideLine marginTop={'0'} marginBottom={'10px'} />
                {children}
            </FunctionalBarWrapper>
        </StyledFunctionalBar>
    )
}

export default FunctionalBar;