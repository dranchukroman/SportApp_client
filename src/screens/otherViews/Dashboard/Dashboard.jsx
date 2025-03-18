import React, { useState, useEffect } from "react";
import StyledDashboard from './Dashboard.styled'
import Card from '../../../components/Cards/InfoCard'
import Button from '../../../components/Buttons/Button'
import DivideLine from '../../../components/Dividers/DivideLine';
import Heading from '../../../components/Headings/Heading';
import theme from "../../../styles/theme";
import axios from 'axios';

function Dashboard({ children, token, onScreenChange }) {
    const [headerUnderTraininTile, setHeaderUnderTraininTile] = useState('Set up your first training plan');
    const [trainingPlans, setTrainingPlans] = useState([]);

    // Temporary fix
    // const [trainingProgress, setTrainingProgress] = useState({workoutsCompleted: 4, trainingPeWeek: 4, spentExercising: 134});
    const trainingProgress = { workoutsCompleted: 4, trainingPeWeek: 4, spentExercising: 134 };

    useEffect(() => {
        const fetchTrainingPlans = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/trainingPlans`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                if (response.status === 200 && response?.data?.data.length > 0) {
                    setTrainingPlans(response.data.data);
                    setHeaderUnderTraininTile('Current training plan')
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchTrainingPlans();
    }, [token]);

    function createTrainingTile() {
        if (trainingPlans.length > 0) {
            const currentPlan = trainingPlans.filter(plan => plan.is_current_plan === true);
            if (currentPlan.length === 1) {
                return (
                    <Card
                        $paddingBottom={'10px'}
                        style={{
                            marginTop: '10px',
                        }}
                    >
                        <Heading
                            fontSize={theme.fontSizes.smallHeader}
                            style={{ padding: '7px 0 25px 0' }}
                        >
                            {currentPlan[0].name}
                        </Heading>
                        <Button
                            onClick={() => { console.log(`Button to start training, planId ${currentPlan[0].plan_id}`) }}
                            width={'280px'}
                        >
                            Start training
                        </Button>
                    </Card>
                )
            }
        } return (
            <Card
                $paddingBottom={'40px'}
                $paddingTop={'40px'}
                style={{
                    marginTop: '10px',
                }}
            >
                <Button
                    onClick={() => { onScreenChange('TrainingPlanDetails') }}
                    width={'280px'}
                >
                    Create training plan
                </Button>
            </Card>
        )
    }

    return (
        <StyledDashboard>
            {/* Current plan data */}
            <Heading
                fontSize={theme.fontSizes.mediumHeader}
            >
                {headerUnderTraininTile}
            </Heading>
            {createTrainingTile()}
            <DivideLine />

            <Heading
                fontSize={theme.fontSizes.mediumHeader}
            >
                Progress
            </Heading>

            {/* Statistic */}
            <div
                style={{
                    display: 'flex',
                    width: '360px',
                    margin: '0 auto',
                    marginTop: '10px'
                }}
            >
                <Card
                    style={{
                        width: '172px',
                        paddingBottom: '18px',
                        paddingTop: '18px'
                    }}
                >
                    <Heading
                        fontSize={theme.fontSizes.largeHeader}
                    >
                        {trainingProgress.spentExercising ? trainingProgress.spentExercising : '0 min'}
                    </Heading>
                    <p
                        style={{
                            color: theme.colors.whiteText,
                            margin: '8px 0 0 0',
                            fontSize: theme.fontSizes.largeParagraph
                        }}
                    >
                        Spent exercising
                    </p>
                </Card>

                <Card
                    style={{
                        width: '172px',
                        paddingBottom: '18px',
                        paddingTop: '18px',
                    }}
                >
                    <Heading
                        fontSize={theme.fontSizes.largeHeader}
                    >
                        {trainingProgress.trainingPeWeek ? trainingProgress.trainingPeWeek : '0'}
                    </Heading>
                    <p
                        style={{
                            color: theme.colors.whiteText,
                            margin: '8px 0 0 0',
                            fontSize: theme.fontSizes.largeParagraph
                        }}
                    >
                        Training per week
                    </p>
                </Card>
            </div>
            <Card
                style={{
                    marginTop: '16px'
                }}
                paddingBottom={'18px'}
                paddingTop={'18px'}
            >
                <Heading
                    fontSize={theme.fontSizes.largeHeader}
                >
                    {trainingProgress.workoutsCompleted ? trainingProgress.workoutsCompleted : '0'}
                </Heading>
                <p
                    style={{
                        color: theme.colors.whiteText,
                        margin: '8px 0 0 0',
                        fontSize: theme.fontSizes.largeParagraph
                    }}
                >
                    Workouts completed
                </p>
            </Card>
            {children}
        </StyledDashboard>
    )
}

export default Dashboard;