import React, { useState, useEffect } from "react";
import axios from "axios";
import StyledTraining from './TrainingPlans.styled'
import theme from "../../../../styles/theme";

import Heading from "../../../../components/Headings/Heading";
import Button from "../../../../components/Buttons/Button";
import Card from '../../../../components/Cards/InfoCard'

import EditIcon from '../../../../assets/icons/Trainings/editIcon';

function TrainingPlans({ token, onScreenChange, setTrainingPlanId }) {
    const [trainingPlans, setTrainingPlans] = useState(null);


    async function getTrainingPlansForUser() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/trainingPlans`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    }

    useEffect(() => {
        async function fetchData() {
            const plans = await getTrainingPlansForUser();
            if (plans && plans.data) {
                setTrainingPlans(plans.data);
            } else {
                setTrainingPlans(null);
            }
        }
        fetchData();
    }, []);

    // Get training plan id for edit and change screen
    function editTrainingDays(planId){
        setTrainingPlanId(planId);
        onScreenChange('SetUpTrainingDays');
    }

    const TrainingScreenView = () => {
        if (!trainingPlans || trainingPlans.length === 0) {
            return (
                <div>
                    <div
                        style={{
                            padding: '30px 0 10px 0'
                        }}
                    >
                        <Heading
                            fontSize={theme.fontSizes.mediumHeader}
                        >
                            No training plans yet
                        </Heading>
                    </div>
                </div>
            );
        } 
        
        // Map training plans
        return trainingPlans.map(plan => (
            <Card
                key={plan.plan_id}
                data-elem={plan.plan_id}
                style={{ marginBottom: '14px', position: 'relative' }}
            >
                <div style={{ color: "white" }}>
                    <Heading
                        fontSize={'18px'}
                    >
                        {plan.name}
                    </Heading>
                </div>

                <EditIcon
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: 0
                    }}

                    onClick={() => editTrainingDays(plan.plan_id)}
                />
            </Card>
        ));
    }

    return (
        <StyledTraining>
            {TrainingScreenView()}
            <Button
                onClick={() => onScreenChange('NewTrainingPlan')}
            >
                Add new training plan
            </Button> 
        </StyledTraining>
    );
}

export default TrainingPlans;