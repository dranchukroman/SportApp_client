import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainScreenWrapper, InfoBarWrapper } from './MainScreen.styled.js'
import axios from 'axios';
import theme from '../../styles/theme'

import Heading from '../../components/Headings/Heading';
import FunctionalBar from '../../components/FunctionalBar/FunctionalBar';
import Navigation from '../../components/Navigation/Navigation'
import UserIcon from '../../components/UserIcon/UserIcon';
import Settings from '../otherViews/Settings/Settings';
import Dashboard from '../otherViews/Dashboard/Dashboard';
import TrainingPlansView from '../otherViews/Trainings/TrainingPlansView/TrainingPlansView.jsx';
import TrainingPlanDetails from '../otherViews/Trainings/TrainingPlanDetails/TrainingPlanDetails.jsx';
import TrainingDaysView from '../otherViews/Trainings/TrainingDaysView/TrainingDaysView.jsx';
import TrainingDaysDetails from '../otherViews/Trainings/TrainingDaysDetails/TrainingDaysDetails.jsx';
import ExercisesView from '../otherViews/Trainings/ExercisesView/ExercisesView.jsx';
import ExerciseDetails from '../otherViews/Trainings/ExerciseDetails/ExerciseDetails.jsx';
import Exercising from '../otherViews/Trainings/Exercising/Exercising.jsx';
import Diet from '../otherViews/Diet/Diet';
import Calculator from '../otherViews/Calculator/Calculator';
import NotFound from '../otherViews/NotFound/NotFound'


function MainScreen({ errorMessage, setErrorMessage }) {
    const navigate = useNavigate();

    const token = localStorage.getItem('authToken');
    useEffect(() => {
        if (!token) {
            window.location.href = '/login';
        }
    }, [token]);

    // Data to controll application
    const [trainingPlanId, setTrainingPlanId] = useState(0); // Save training plan id to work with
    const [traininDayId, setTrainingDayId] = useState(0); // Save training day id to work with
    const [trainingExerciseId, setTrainingExerciseId] = useState(0); // Save exercise id to work with
    const [editModeStatus, setEditModeStatus] = useState(false);

    const [controllButtonsParams, setControllButtonsParams] = useState({
        leftButtonStatus: false,
        rightButtonStatus: false,
        leftButtonMethod: null,
        rightButtonMethod: null,
    })

    // Start training
    const [exrcisingStatus, setExercisingStatus] = useState(false);
    const [trainingProgress, setTrainingProgress] = useState({});

    // Handle user data
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        height: 0,
        weight: 0,
        age: 0,
        gender: 'other',
        goal: '',
        activity_level: 'low'
    })
    const [isDataChanged, setIsDataChanged] = useState(false);
    const [updateData, setUpdateData] = useState(false);

    const profileData = useCallback(() => ({
        first_name: userData.name,
        last_name: userData.surname,
        height: userData.height,
        weight: userData.weight,
        age: userData.age,
        gender: userData.gender,
        goal: userData.goal,
        activity_level: userData.activity_level,
    }), [userData]);

    // Fetch data from user profile
    const fetchUserData = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200 && response.data) {
                const userData = response.data[0];
                setUserData((prevState) => ({
                    ...prevState,
                    name: userData.first_name,
                    surname: userData.last_name,
                    height: userData.height,
                    weight: userData.weight,
                    age: userData.age,
                    gender: userData.gender,
                    goal: userData.goal,
                    activity_level: userData.activity_level,
                }))
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            navigate('/createProfile')
        }
    }, [token, navigate]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    // Update user data
    useEffect(() => {
        const updateUserData = async () => {
            try {
                const response = await axios.put(`${process.env.REACT_APP_SERVER_LINK}/api/updateProfile`, profileData(),
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (response.status === 200) {
                    fetchUserData()
                } else {
                    setErrorMessage(response.data?.message);
                }
            } catch (error) {
                setErrorMessage(error.response?.data?.message);
            }
        };

        if (updateData && isDataChanged) {
            updateUserData();
            setIsDataChanged(false);
            setUpdateData(false);
        }
    }, [updateData, isDataChanged, fetchUserData, profileData, token, setErrorMessage]);

    // Screen data
    const [pageTitle, changePageTitle] = useState(`Hi, ${userData.name || 'Friend'}`); // Page title
    // Available page titles
    const pageTitles = useMemo(() => ({
        Dashboard: `Hi, ${userData.name || 'Friend'}`,
        Trainings: 'Trainings',
        TrainingPlanDetails: 'New training plan',
        TrainingDaysView: 'Set up training days',
        TrainingDaysDetails: 'Set up training days',
        ExercisesView: 'Set up exercises',
        ExerciseDetails: 'Set up exercise',
        Exercising: 'Training',
        Diet: 'Diet',
        Calculator: 'Calculator'
    }), [userData.name]);
    // Change screen
    const [currentScreen, setCurrentScreen] = useState('Dashboard');
    // Change page title
    useEffect(() => {
        changePageTitle(pageTitles[currentScreen])
    }, [currentScreen, pageTitles]);
    // Render new screen
    const renderScreen = () => {
        switch (currentScreen) {
            case 'Dashboard':
                return <Dashboard token={token} onScreenChange={setCurrentScreen} />
            case 'Trainings':
                return <TrainingPlansView token={token} onScreenChange={setCurrentScreen} setTrainingPlanId={setTrainingPlanId} editModeStatus={editModeStatus} setEditModeStatus={setEditModeStatus} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
            case 'TrainingPlanDetails':
                return <TrainingPlanDetails token={token} onScreenChange={setCurrentScreen} setTrainingPlanId={setTrainingPlanId} editModeStatus={editModeStatus} trainingPlanId={trainingPlanId} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
            case 'TrainingDaysView':
                return <TrainingDaysView token={token} onScreenChange={setCurrentScreen} trainingPlanId={trainingPlanId} editModeStatus={editModeStatus} setTrainingPlanId={setTrainingPlanId} setTrainingDayId={setTrainingDayId} errorMessage={errorMessage} setErrorMessage={setErrorMessage} setExercisingStatus={setExercisingStatus}/>
            case 'TrainingDaysDetails':
                return <TrainingDaysDetails token={token} onScreenChange={setCurrentScreen} trainingPlanId={trainingPlanId} traininDayId={traininDayId} editModeStatus={editModeStatus} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
            case 'ExercisesView':
                return <ExercisesView token={token} onScreenChange={setCurrentScreen} traininDayId={traininDayId} setTrainingExerciseId={setTrainingExerciseId} editModeStatus={editModeStatus} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
            case 'ExerciseDetails':
                return <ExerciseDetails token={token} onScreenChange={setCurrentScreen} traininDayId={traininDayId} trainingExerciseId={trainingExerciseId} editModeStatus={editModeStatus} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
            case 'Exercising':
                return <Exercising token={token} onScreenChange={setCurrentScreen} trainingExerciseId={trainingExerciseId} setErrorMessage={setErrorMessage} setTrainingProgress={setTrainingProgress} trainingProgress={trainingProgress} trainingPlanId={trainingPlanId} traininDayId={traininDayId} />
            case 'Diet':
                return <Diet token={token} onScreenChange={setCurrentScreen} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
            case 'Calculator':
                return <Calculator token={token} onScreenChange={setCurrentScreen} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
            default:
                return <NotFound token={token} onScreenChange={setCurrentScreen} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
        }
    }

    // Change height of functional bar
    const userInformationHeight = useRef(null);
    const [userDataHeight, setUserDataHeight] = useState(0)
    useEffect(() => {
        if (userInformationHeight.current) {
            setUserDataHeight(userInformationHeight.current.offsetHeight);
        }
    }, [userInformationHeight]);
    const visiblePartOfScreen = window.innerHeight; // Visible part of screen height
    const functionalBarHeight = (visiblePartOfScreen - userDataHeight - 85); // Height of functional bar
    const scrollablePartHeight = (functionalBarHeight - 160); // Height of scrollable part in functional bar
    // Show settings
    const [isSettingsVisible, setFunctionalBarVisibility] = useState(false);
    const showSettings = () => {
        setFunctionalBarVisibility(prev => {
            if (prev) {
                setUpdateData(true);
            }
            return !prev;
        });
    };
    return (
        <MainScreenWrapper>
            <InfoBarWrapper ref={userInformationHeight}>
                <Heading
                    color={theme.colors.darkBackground}
                    fontSize={theme.fontSizes.largeHeader}
                >
                    {pageTitle}
                </Heading>
                <UserIcon onClick={showSettings} />
            </InfoBarWrapper>
            <Settings token={token} setUserData={setUserData} userData={userData} visiblePartOfScreen={visiblePartOfScreen} setIsDataChanged={setIsDataChanged} style={{ flex: 1 }}/>
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
                        height: `${scrollablePartHeight}px`,
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                    }}
                >
                    {renderScreen()}
                </div>
            </FunctionalBar>
            <Navigation currentScreen={currentScreen} onScreenChange={setCurrentScreen} controllButtonsParams={controllButtonsParams} setControllButtonsParams={setControllButtonsParams} />
        </MainScreenWrapper>
    );
}

export default MainScreen;