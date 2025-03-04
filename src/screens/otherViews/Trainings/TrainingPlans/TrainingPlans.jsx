import React, { useState, useEffect } from "react";
import axios from "axios";
import StyledTraining from './TrainingPlans.styled'
import theme from "../../../../styles/theme";

import Heading from "../../../../components/Headings/Heading";
import Button from "../../../../components/Buttons/Button";

function TrainingPlans() {
    const [trainingPlans, setTrainingPlans] = useState(null);

    async function getTrainingPlansForUser() {
        // Get auth token
        const token = localStorage.getItem('authToken');

        // Remove token if not valid
        if (!token) {
            console.log('Profile can\'t be deleted, because auth token doesn\'t exist');
            localStorage.removeItem('authToken');
            window.location.href = '/login';
            return;
        }

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
                    <Button>
                        Add new training plan
                    </Button>
                </div>
            );
        } else {
            // Map training plans
            return trainingPlans.map(plan => (
                <div style={{color: "white"}} key={plan.id}>
                    <h3>{plan.name}</h3>
                    <p>{plan.description}</p>
                </div>
            ));
        }
    }

    return (
        <StyledTraining>
            {TrainingScreenView()}
        </StyledTraining>
    );
}

export default TrainingPlans;