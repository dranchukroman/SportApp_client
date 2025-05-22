import React, { useState, useEffect } from "react";
import StyledDashboard from './Dashboard.styled'
import Card from '../../../components/Cards/InfoCard'
import Button from '../../../components/Buttons/Button'
import DivideLine from '../../../components/Dividers/DivideLine';
import Heading from '../../../components/Headings/Heading';
import theme from "../../../styles/theme";
import FunctionalBarLoader from '../../../components/Loaders/FunctionalBarLoader/FunctionalBarLoader';
import { LoadWrapper } from "../../../components/Loaders/SingleLoader/SingleLoader.styled";
import { toast } from "sonner";

function Dashboard({ onScreenChange, trainingPlans }) {
    const [headerUnderTraininTile, setHeaderUnderTraininTile] = useState('Set up your first training plan');
    const trainingProgress = { workoutsCompleted: 4, trainingPeWeek: 4, spentExercising: 134 };

    const [loading, setLoading] = useState(false);
    const [afterLoad, setAfterLoad] = useState(0);

    useEffect(() => {
        try {
            setLoading(true);
            setAfterLoad(0);
            console.log(trainingPlans.length)
            if (trainingPlans?.length > 0) {
                const currentPlan = trainingPlans.find(plan => plan.is_current_plan === true);
                if (currentPlan) {
                    setHeaderUnderTraininTile('Current training plan');
                }
            }
        } catch (error) {
            toast.error('Can\'t get training plans');
        } finally {
            setLoading(false);
            setTimeout(() => setAfterLoad(1), 100);
        }
    }, [trainingPlans]);

    function createTrainingTile() {
        if (trainingPlans?.length > 0) {
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
            {loading ? <FunctionalBarLoader /> :
                <LoadWrapper opacity={afterLoad}>
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
                </LoadWrapper>}
        </StyledDashboard>
    )
}

export default Dashboard;