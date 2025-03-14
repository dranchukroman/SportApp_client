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
    const [deletePlanId, setDeletePlanId] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/trainingPlans`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (response && response?.data?.data) {
                setTrainingPlans(response.data.data);
            } else {
                setTrainingPlans(null);
            }
        }
        fetchData();
    }, [token]);

    // Get training plan id for edit and change screen
    function editTrainingDays(planId) {
        setTrainingPlanId(planId);
        onScreenChange('SetUpTrainingDays');
    }

    useEffect(() => {
        const deletePlan = async () => {
            try {
                console.log('Deleting training plan with ID:', deletePlanId);
                const response = await axios.delete(`${process.env.REACT_APP_SERVER_LINK}/api/deleteTrainingPlan`, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }, 
                        data: {
                            trainingPlanId: deletePlanId
                        }
                    }
                );
                console.log('Delete response:', response);

                if (response.status === 200) {
                    setTrainingPlans(prevDays => prevDays.filter(plan => plan.plan_id !== deletePlanId));
                }
                setDeletePlanId(null);
            } catch (error) {
                console.error('Error deleting training plan:', error);
            }
        };

        if(deletePlanId) deletePlan();
    }, [deletePlanId, token]);

    const deletePlan = (deletePlanId) => {
        setDeletePlanId(deletePlanId);
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
                <div
                    style={{
                        position: 'absolute',
                        left: 7,
                        top: 7,
                        padding: '10px',
                        border: 'solid 1px red'
                    }}
                >
                    <Heading

                        onClick={() => deletePlan(plan.plan_id)}
                        fontSize={'16px'}
                    >
                        DEL
                    </Heading>
                </div>
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