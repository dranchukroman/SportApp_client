// External components
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

// Themes and style
import theme from '../../styles/theme';
import { MainScreenWrapper, InfoBarWrapper } from './MainScreen.styled.js';

// Global components
import Heading from '../../components/Headings/Heading';
import FunctionalBar from '../../components/FunctionalBar/FunctionalBar';
import Navigation from '../../components/Navigation/Navigation';
import UserIcon from '../../components/UserIcon/UserIcon';

// Maing pages/views
import Settings from '../otherViews/Settings/Settings';
import Dashboard from '../otherViews/Dashboard/Dashboard';
import Diet from '../otherViews/Diet/Diet';
import Calculator from '../otherViews/Calculator/Calculator';
import NotFound from '../otherViews/NotFound/NotFound';

// Trainings
import TrainingPlansView from '../otherViews/Trainings/TrainingPlansView/TrainingPlansView.jsx';
import TrainingPlanDetails from '../otherViews/Trainings/TrainingPlanDetails/TrainingPlanDetails.jsx';
import TrainingDaysView from '../otherViews/Trainings/TrainingDaysView/TrainingDaysView.jsx';
import TrainingDaysDetails from '../otherViews/Trainings/TrainingDaysDetails/TrainingDaysDetails.jsx';
import ExercisesView from '../otherViews/Trainings/ExercisesView/ExercisesView.jsx';
import ExerciseDetails from '../otherViews/Trainings/ExerciseDetails/ExerciseDetails.jsx';
import Exercising from '../otherViews/Trainings/Exercising/Exercising.jsx';


function MainScreen({ setModalParams }) {
    const navigate = useNavigate(); // Create navigation object
    const token = localStorage.getItem('authToken');

    // Check if token exist and valid
    useEffect(() => {
        !token && navigate('/login');
        
        const tokenValidation = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/checkToken`, {headers: { Authorization: `Bearer ${token}`}});
                res.status !== 200 && navigate('/login');
            } catch (error) {
                navigate('/login');
            }
        }
        tokenValidation()
    }, [token, navigate]);

    const [trainingPlans, setTrainingPlans] = useState([]); // Save all training plans

    // Get all training plans
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
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Can\'t get training plans');
            }
        };
        fetchTrainingPlans();
    }, [token]);


    // Data to controll application
    const [controllTrainings, setControllTrainings] = useState({
        trainingPlanId: 0,
        trainingDayId: 0,
        trainingExerciseId: 0
    })

    const [editModeStatus, setEditModeStatus] = useState(false);
    const [exercisingStatus, setExercisingStatus] = useState(false);
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
        if (updateData && isDataChanged) {
            const update = async () => {
                try {
                    const res = await axios.put(`${process.env.REACT_APP_SERVER_LINK}/api/updateProfile`, profileData(),
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    res.status === 200 ? fetchUserData() : toast.error(res.data?.message);
                } catch (error) {
                    toast.error(error.res?.data?.message);
                } finally {
                    setIsDataChanged(false);
                    setUpdateData(false);
                }
            }
            update();
        }
    }, [updateData, isDataChanged, fetchUserData, profileData, token]);

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
                return <Dashboard onScreenChange={setCurrentScreen} trainingPlans={trainingPlans} />
            case 'Trainings':
                return <TrainingPlansView token={token} onScreenChange={setCurrentScreen} setControllTrainings={setControllTrainings} editModeStatus={editModeStatus} setEditModeStatus={setEditModeStatus} />
            case 'TrainingPlanDetails':
                return <TrainingPlanDetails token={token} onScreenChange={setCurrentScreen} setControllTrainings={setControllTrainings} editModeStatus={editModeStatus} trainingPlanId={controllTrainings.trainingPlanId} />
            case 'TrainingDaysView':
                return <TrainingDaysView token={token} onScreenChange={setCurrentScreen} trainingPlanId={controllTrainings.trainingPlanId} editModeStatus={editModeStatus} setControllTrainings={setControllTrainings} setExercisingStatus={setExercisingStatus} />
            case 'TrainingDaysDetails':
                return <TrainingDaysDetails token={token} onScreenChange={setCurrentScreen} trainingPlanId={controllTrainings.trainingPlanId} traininDayId={controllTrainings.trainingDayId} editModeStatus={editModeStatus} />
            case 'ExercisesView':
                return <ExercisesView token={token} onScreenChange={setCurrentScreen} traininDayId={controllTrainings.trainingDayId} setControllTrainings={setControllTrainings} editModeStatus={editModeStatus} exercisingStatus={exercisingStatus} setModalParams={setModalParams} setExercisingStatus={setExercisingStatus} setTrainingProgress={setTrainingProgress} />
            case 'ExerciseDetails':
                return <ExerciseDetails token={token} onScreenChange={setCurrentScreen} traininDayId={controllTrainings.trainingDayId} trainingExerciseId={controllTrainings.trainingExerciseId} editModeStatus={editModeStatus} />
            case 'Exercising':
                return <Exercising token={token} onScreenChange={setCurrentScreen} trainingExerciseId={controllTrainings.trainingExerciseId} setTrainingProgress={setTrainingProgress} trainingProgress={trainingProgress} trainingPlanId={controllTrainings.trainingPlanId} traininDayId={controllTrainings.trainingDayId} />
            case 'Diet':
                return <Diet token={token} onScreenChange={setCurrentScreen} />
            case 'Calculator':
                return <Calculator token={token} onScreenChange={setCurrentScreen} />
            default:
                return <NotFound onScreenChange={setCurrentScreen} />
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
            {isSettingsVisible && (
                <Settings token={token} setUserData={setUserData} userData={userData} visiblePartOfScreen={visiblePartOfScreen} setIsDataChanged={setIsDataChanged} style={{ flex: 1 }} />
            )}
            {/* Functional bar with different views */}
            <FunctionalBar
                style={{
                    height: `${functionalBarHeight}px`,
                    position: 'absolute',
                    top: isSettingsVisible ? (visiblePartOfScreen - 207) : (userDataHeight + 15),
                    transition: 'top 0.3s ease',
                }}
                trainingPlans={trainingPlans}
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
            <Navigation
                currentScreen={currentScreen}
                onScreenChange={setCurrentScreen}
                setModalParams={setModalParams}
                exercisingStatus={exercisingStatus}
                setTrainingProgress={setTrainingProgress}
                setExercisingStatus={setExercisingStatus}
            />
        </MainScreenWrapper>
    );
}

export default MainScreen;