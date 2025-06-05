import React, { useState, useEffect, useCallback } from "react";
import StyledDashboard from './Dashboard.styled'
import Card from '../../../components/Cards/InfoCard'
import Button from '../../../components/Buttons/Button'
import DivideLine from '../../../components/Dividers/DivideLine';
import Heading from '../../../components/Headings/Heading';
import theme from "../../../styles/theme";
import FunctionalBarLoader from '../../../components/Loaders/FunctionalBarLoader/FunctionalBarLoader';
import { LoadWrapper } from "../../../components/Loaders/SingleLoader/SingleLoader.styled";
import { toast } from "sonner";
import { getFullDbStatistic } from "../../../api/user/statistic";

function Dashboard({ onScreenChange, trainingPlans, setControllTrainings }) {
    const [headerUnderTraininTile, setHeaderUnderTraininTile] = useState('Set up your first training plan');
    const [trainingProgress, setTrainingProgress] = useState({
        total_sessions: 0,
        avg_sessions_per_week: 0,
        total_training_minutes: 0
    })

    const [loading, setLoading] = useState(false);
    const [afterLoad, setAfterLoad] = useState(0);

    const changeHeaderIfTrainingPlanExist = useCallback(() => {
        if (trainingPlans?.length > 0) {
            const currentPlan = trainingPlans.find(plan => plan.is_current_plan === true);
            if (currentPlan) {
                setHeaderUnderTraininTile('Current training plan');
            }
        }
    }, [trainingPlans]);

    useEffect(() => {
        const fetchStatistic = async () => {
            try {
                const result = await getFullDbStatistic();
                if (result?.success) {
                    const { total_sessions, avg_sessions_per_week, total_training_minutes } = result.data;

                    const hours = Math.floor(total_training_minutes / 60);
                    const minutes = total_training_minutes % 60;
                    setTrainingProgress({
                        total_sessions,
                        avg_sessions_per_week,
                        total_training_minutes: `${hours ? hours + 'h' : null} ${minutes}m`
                    })
                }
            } catch (error) {
                toast.error(error?.response?.message || 'Getting statistic failed');
            }
        }

        try {
            setLoading(true);
            setAfterLoad(0);
            changeHeaderIfTrainingPlanExist()
            fetchStatistic();
        } catch (error) {
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
            setTimeout(() => setAfterLoad(1), 100);
        }
    }, [trainingPlans, changeHeaderIfTrainingPlanExist]);

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
                            onClick={() => {
                                setControllTrainings(prev => ({ ...prev, trainingPlanId: currentPlan[0].plan_id }));
                                onScreenChange('TrainingDaysView');
                            }}
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
                                {trainingProgress.total_training_minutes || 0}
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
                                {trainingProgress.avg_sessions_per_week || 0}
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
                            {trainingProgress.total_sessions || 0}
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