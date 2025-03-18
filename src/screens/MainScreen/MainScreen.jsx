import React, { useState, useEffect, useRef } from 'react';

// Styles
import './MainScreen.styled'
import theme from '../../styles/theme'

// Main components
import Heading from '../../components/Headings/Heading';
import FunctionalBar from '../../components/FunctionalBar/FunctionalBar';
import Navigation from '../../components/Navigation/Navigation'
import UserIcon from '../../components/UserIcon/UserIcon';
import Settings from '../otherViews/Settings/Settings';

// Views on functional bar
//// Dashboard
import Dashboard from '../otherViews/Dashboard/Dashboard';
//// Trainings
import TrainingPlans from '../otherViews/Trainings/TrainingPlans/TrainingPlans';
import CreateTrainingPlan from '../otherViews/Trainings/CreateTrainingPlan/CreateTrainingPlan';
import SetUpTrainingDays from '../otherViews/Trainings/SetUpTrainingDays/SetUpTrainingDays';
import AddTrainingDay from '../otherViews/Trainings/AddTrainingDay/AddTrainingDay';
import SetUpExercises from '../otherViews/Trainings/SetUpExercises/SetUpExercises';
import SetUpExercise from '../otherViews/Trainings/SetUpExercise/SetUpExercise';
//// Diet
import Diet from '../otherViews/Diet/Diet';
//// Calculator
import Calculator from '../otherViews/Calculator/Calculator';
//// Not found view
import NotFound from '../otherViews/NotFound/NotFound'

function MainScreen() {
    // Go to login if auth token doesn't exist
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = '/login';
    }

    // User data
    const userName = getUserName();

    // Change screen
    const initialScreen = sessionStorage.getItem('userView') || 'Diet';
    const [currentScreen, setCurrentScreen] = useState(initialScreen);
    useEffect(() => {
        sessionStorage.setItem('userView', currentScreen);
    }, [currentScreen]);

    // App data
    const [pageTitle, changePageTitle] = useState(`Hi, ${userName}`); // Page title
    const [trainingPlanId, setTrainingPlanId] = useState(0); // Save training plan id to work with
    const [traininDayId, setTraininDayId] = useState(0); // Save training day id to work with
    const [trainingExerciseId, setTrainingExerciseId] = useState(0); // Save exercise id to work with

    const [editModeStatus, setEditModeStatus] = useState(false);

    // Change page title
    useEffect(() => {
        const titles = {
            Dashboard: `Hi, ${userName}`,
            Trainings: 'Trainings',
            NewTrainingPlan: 'New training plan',
            SetUpTrainingDays: 'Set up training days',
            AddTrainingDay: 'Set up training days',
            SetUpExercises: 'Set up exercises',
            SetUpExercise: 'Set up exercise',
            Diet: 'Diet',
            Calculator: 'Calculator'
        }
        changePageTitle(titles[currentScreen])
    }, [currentScreen, userName]);

    // Render new screen
    const renderScreen = () => {
        switch (currentScreen) {
            case 'Dashboard':
                return <Dashboard token={token} onScreenChange={setCurrentScreen} />

            case 'Trainings':
                return <TrainingPlans token={token} onScreenChange={setCurrentScreen} setTrainingPlanId={setTrainingPlanId} editModeStatus={editModeStatus} setEditModeStatus={setEditModeStatus} />
            case 'NewTrainingPlan':
                return <CreateTrainingPlan token={token} onScreenChange={setCurrentScreen} setTrainingPlanId={setTrainingPlanId} editModeStatus={editModeStatus} trainingPlanId={trainingPlanId} />
            case 'SetUpTrainingDays':
                return <SetUpTrainingDays token={token} onScreenChange={setCurrentScreen} trainingPlanId={trainingPlanId} setTrainingPlanId={setTrainingPlanId} setTraininDayId={setTraininDayId} />
            case 'AddTrainingDay':
                return <AddTrainingDay token={token} onScreenChange={setCurrentScreen} trainingPlanId={trainingPlanId} />
            case 'SetUpExercises':
                return <SetUpExercises token={token} onScreenChange={setCurrentScreen} traininDayId={traininDayId} setTrainingExerciseId={setTrainingExerciseId} />
            case 'SetUpExercise':
                return <SetUpExercise token={token} onScreenChange={setCurrentScreen} traininDayId={traininDayId} trainingExerciseId={trainingExerciseId} />

            case 'Diet':
                return <Diet token={token} onScreenChange={setCurrentScreen} />

            case 'Calculator':
                return <Calculator token={token} onScreenChange={setCurrentScreen} />

            default:
                return <NotFound token={token} onScreenChange={setCurrentScreen} />
        }
    }

    // Change height of functional bar
    const userInformationHeight = useRef(null);
    const [userDataHeight, setUserDataHeight] = useState(0)
    useEffect(() => {
        if (userInformationHeight.current) {
            setUserDataHeight(userInformationHeight.current.offsetHeight);
        }
    }, [setUserDataHeight, userInformationHeight]);
    const visiblePartOfScreen = window.innerHeight; // Visible part of screen height
    const functionalBarHeight = (visiblePartOfScreen - userDataHeight - 85); // Height of functional bar
    const scrollablePartHeight = (functionalBarHeight - 160); // Height of scrollable part in functional bar

    // Show settings
    const [isSettingsVisible, setFunctionalBarVisibility] = useState(false);
    const showSettings = () => setFunctionalBarVisibility(prev => !prev);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                textAlign: 'center',
            }}
        >
            {/* Element with user information */}
            <div
                ref={userInformationHeight}
                style={{
                    display: 'flex',
                    width: '360px',
                    margin: '10px auto',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                }}
            >
                <div>
                    <Heading
                        color={theme.colors.darkBackground}
                        fontSize={theme.fontSizes.largeHeader}
                    >
                        {pageTitle}
                    </Heading>
                </div>
                <UserIcon
                    onClick={showSettings}
                />
            </div>
            <div
                style={{
                    flex: 1
                }}
            >
                {/* Settings view */}
                <Settings token={token} />
            </div>

            {/* Functional bar with different views */}
            <FunctionalBar
                style={{
                    height: `${functionalBarHeight}px`,
                    position: 'absolute',
                    top: isSettingsVisible ? (visiblePartOfScreen - 207) : (userDataHeight + 15),
                    transition: 'top 0.3s ease',
                }}
            >
                <div
                    className='no-scrollbar'
                    style={{
                        height: scrollablePartHeight + "px",
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                    }}
                >
                    {renderScreen()}
                </div>
            </FunctionalBar>

            {/* Navigation */}
            <Navigation
                style={{
                    width: '100%'
                }}
                currentScreen={currentScreen}
                onScreenChange={setCurrentScreen}
            />
        </div>
    );
}

const getUserName = () => {
    return "Roman";
}

export default MainScreen;