import React, { useState, useEffect, useMemo } from "react";
import StyledDashboard from './Dashboard.styled'
import Card from '../../../components/Cards/InfoCard'
import Button from '../../../components/Buttons/Button'
import DivideLine from '../../../components/Dividers/DivideLine';
import Heading from '../../../components/Headings/Heading';
import theme from "../../../styles/theme";
import axios from 'axios';

import { redirectToCreateTrainingPlan } from "../Trainings/TrainingPlans/TrainingPlans";

function Dashboard({ children, token, onScreenChange }) {
    const [headerUnderTraininTile, setHeaderUnderTraininTile] = useState('Set up your first training plan');
    const [currentTraining, setCurrentTraining] = useState(null);
    const [trainingProgress, setTrainingProgress] = useState({workoutsCompleted: 4, trainingPeWeek: 4, spentExercising: 134});

    // Use effect to not create infinite loop by rerendering page
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userauth = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/protected`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/trainingPlans`, {
                    params: { email: userauth.data.user.email }
                });


                // Check if current training exists
                if (response?.data?.data[0]?.name) {
                    setCurrentTraining(response.data.data[0].name);

                    // Change header
                    setHeaderUnderTraininTile('To change text');

                    // Go to training tile
                    setCurrentTraining(
                        <div>
                            <Card
                                $paddingBottom={'10px'}
                                style={{
                                    marginTop: '10px',
                                }}
                            >
                                <Heading
                                    fontSize={'18px'}
                                    style={{ padding: '7px 0 25px 0' }}
                                >
                                    {response.data.data[0].name}
                                </Heading>
                                <Button
                                    onClick={() => { redirectToTrainingPlan() }}
                                    width={'280px'}
                                >
                                    Start training
                                </Button>
                            </Card>
                        </div>
                    );
                } else {
                    // Change header
                    setHeaderUnderTraininTile('Set up your first training plan');

                    // Create training plan tile
                    setCurrentTraining(
                        <div>
                            <Card
                                $paddingBottom={'40px'}
                                $paddingTop={'40px'}
                                style={{
                                    marginTop: '10px',
                                }}
                            >
                                <Button
                                    onClick={() => { onScreenChange('NewTrainingPlan') }}
                                    width={'280px'}
                                >
                                    Create training plan
                                </Button>
                            </Card>
                        </div>
                    );
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setCurrentTraining(
                    <div>
                        <Card
                            $paddingBottom={'40px'}
                            $paddingTop={'40px'}
                            style={{
                                marginTop: '10px',
                            }}
                        >
                            <Button
                                onClick={() => { onScreenChange('NewTrainingPlan') }}
                                width={'280px'}
                            >
                                Create training plan
                            </Button>
                        </Card>
                    </div>
                );
            }
        };

        fetchData();
    }, [token]);

    function redirectToTrainingPlan(location){
        // Function to do in future
    }



    return (
        <StyledDashboard>
            {/* Dashboard header */}
            <Heading
                fontSize={theme.fontSizes.mediumHeader}
            >
                {headerUnderTraininTile}
            </Heading>
            {/* Card with current training */}
            {currentTraining}

            <DivideLine />

            {/* Progress header */}
            <Heading
                fontSize={theme.fontSizes.mediumHeader}
            >
                Progress
            </Heading>

            {/* Progress tiles */}
            <div
                style={{
                    display: 'flex',
                    width: '360px',
                    margin: '0 auto',
                    marginTop: '10px'
                }}
            >
                {/* Full exercising time */}
                <Card
                    style={{
                        width: '172px',
                        paddingBottom: '18px',
                        paddingTop: '18px'
                    }}
                >
                    <Heading
                        fontSize={'33px'}
                    >
                        {trainingProgress.spentExercising ? trainingProgress.spentExercising : '0 min'}
                    </Heading>
                    <p
                        style={{
                            color: '#EEE',
                            margin: '8px 0 0 0',
                            fontSize: '15px'
                        }}
                    >
                        Spent exercising
                    </p>
                </Card>

                {/* Trainings per week */}
                <Card
                    style={{
                        width: '172px',
                        paddingBottom: '18px',
                        paddingTop: '18px',
                    }}
                >
                    <Heading
                        fontSize={'33px'}
                    >
                        {trainingProgress.trainingPeWeek ? trainingProgress.trainingPeWeek : '0'}
                    </Heading>
                    <p
                        style={{
                            color: '#EEE',
                            margin: '8px 0 0 0',
                            fontSize: '15px'
                        }}
                    >
                        Training per week
                    </p>
                </Card>
            </div>

            {/* How much workouts have been completed */}
            <Card
                style={{
                    marginTop: '16px'
                }}
                paddingBottom={'18px'}
                paddingTop={'18px'}
            >
                <Heading
                    fontSize={'33px'}
                >
                    {trainingProgress.workoutsCompleted ? trainingProgress.workoutsCompleted : '0'}
                </Heading>
                <p
                    style={{
                        color: '#EEE',
                        margin: '8px 0 0 0',
                        fontSize: '15px'
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