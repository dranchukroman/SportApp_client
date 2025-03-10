import React, { useState, useEffect } from "react";
import axios from "axios";
import StyledTraining from './TrainingPlans.styled'
import theme from "../../../../styles/theme";

import Heading from "../../../../components/Headings/Heading";
import Button from "../../../../components/Buttons/Button";
import Card from '../../../../components/Cards/InfoCard'

import EditIcon from '../../../../assets/icons/Trainings/editIcon';

function TrainingPlans({ token }) {
    const [trainingPlans, setTrainingPlans] = useState(null);


    async function getTrainingPlansForUser() {
        try {
            // Authorize token
            const user = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/protected`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!user || !user.data || !user.data.user) {
                console.error('User data is not available');
                return null;
            }

            const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/trainingPlans`, {
                params: { email: user.data.user.email }
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
        } else {
            // Map training plans
            return trainingPlans.map(plan => (
                <Card
                    key={plan.id}
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
                    />
                </Card>
            ));
        }
    }

    return (
        <StyledTraining>
            {TrainingScreenView()}
            <Button>
                Add new training plan
            </Button> 
        </StyledTraining>
    );
}

export function redirectToCreateTrainingPlan(location){

}

export default TrainingPlans;