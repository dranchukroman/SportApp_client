// External components
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

// Themes and style
import { MainScreenWrapper, InfoBarWrapper, PageTitle } from './MainScreen.styled.js';

// Global components
import FunctionalBar from '../../components/FunctionalBar/FunctionalBar';
import Navigation from '../../components/Navigation/Navigation';
import UserIcon from '../../components/UserIcon/UserIcon';

// Main pages/views
import Settings from '../otherViews/Settings/Settings';

// Other functions
import renderScreen from './renderScreen.js';
import getPageTitles from './getPageTitles.js';
import useFunctionalBarHeight from './useFunctionalBarHeight.js';

function MainScreen({ setModalParams }) {
    const navigate = useNavigate(); // Create navigation object
    const token = localStorage.getItem('authToken'); // Get token

    // Check if token exist and valid
    useEffect(() => {
        !token && navigate('/login');
        const tokenValidation = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/checkToken`, { headers: { Authorization: `Bearer ${token}` } });
                res.status !== 200 && navigate('/login');
            } catch (error) {
                navigate('/login');
            }
        }
        tokenValidation()
    }, [token, navigate]);

    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        height: 0,
        weight: 0,
        age: 0,
        gender: 'other',
        goal: '',
        activity_level: 'low'
    }); // Save user data

    const [trainingPlans, setTrainingPlans] = useState([]); // Save all training plans

    const [controllTrainings, setControllTrainings] = useState({
        trainingPlanId: 0,
        trainingDayId: 0,
        trainingExerciseId: 0
    }); // Data to manipulate trainings

    const [editModeStatus, setEditModeStatus] = useState(false); // Edit trainings

    const [exercisingStatus, setExercisingStatus] = useState(false); // Exercising status (Do user started training?)
    const [trainingProgress, setTrainingProgress] = useState({}); // Save progress from training

    const [isDataChanged, setIsDataChanged] = useState(false); // Have data been changed in settings?
    const [updateData, setUpdateData] = useState(false); // Trigger to update data

    // Function to get user profile data
    const getUserData = useCallback(async () => {
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
            navigate('/createProfile') // There is no profile redirect to create profile
        }
    }, [token, navigate]);

    // Fetch user profile data
    useEffect(() => {
        getUserData();
    }, [getUserData]);

    // Update user profile data
    useEffect(() => {
        if (updateData && isDataChanged) {
            const update = async () => {
                try {
                    const profileData = {
                        first_name: userData.name,
                        last_name: userData.surname,
                        height: userData.height,
                        weight: userData.weight,
                        age: userData.age,
                        gender: userData.gender,
                        goal: userData.goal,
                        activity_level: userData.activity_level,
                    }
                    const res = await axios.put(`${process.env.REACT_APP_SERVER_LINK}/api/updateProfile`, profileData,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    res.status === 200 ? getUserData() : toast.error(res.data?.message);
                } catch (error) {
                    toast.error(error.res?.data?.message);
                } finally {
                    setIsDataChanged(false);
                    setUpdateData(false);
                }
            }
            update();
        }
    }, [updateData, isDataChanged, getUserData, token, userData]);

    // Get all training plans
    useEffect(() => {
        const fetchTrainingPlans = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/trainingPlans`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 200 && response?.data?.data.length > 0) setTrainingPlans(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Can\'t get training plans');
            }
        };
        fetchTrainingPlans();
    }, [token]);

    const [currentScreen, setCurrentScreen] = useState('Dashboard'); // Current screen
    const pageTitles = useMemo(() => getPageTitles(userData.name), [userData.name]); // Get page titles
    const [pageTitle, changePageTitle] = useState(pageTitles["Dashboard"]); // Page title
    useEffect(() => changePageTitle(pageTitles[currentScreen]), [currentScreen, pageTitles]); // Change page title

    // Custom hook to change height of functional bar
    const { userInformationHeight, functionalBarHeight, scrollablePartHeight, userDataHeight, visiblePartOfScreen } = useFunctionalBarHeight();

    // Show/hide settings
    const [settingsVisibility, setSettingsVisibility] = useState(false);
    const showSettings = () => {
        setSettingsVisibility(prev => {
            if (prev) {
                setUpdateData(true);
            }
            return !prev;
        });
    };

    return (
        <MainScreenWrapper>
            <InfoBarWrapper ref={userInformationHeight}>
                <PageTitle>{pageTitle}</PageTitle>
                <UserIcon onClick={showSettings} />
            </InfoBarWrapper>
            {settingsVisibility && (
                <Settings token={token} setUserData={setUserData} userData={userData} visiblePartOfScreen={visiblePartOfScreen} setIsDataChanged={setIsDataChanged} />
            )}
            <FunctionalBar
                style={{
                    height: `${functionalBarHeight}px`,
                    position: 'absolute',
                    top: settingsVisibility ? (visiblePartOfScreen - 207) : (userDataHeight + 15),
                    transition: 'top 0.3s ease',
                }}
                
                trainingPlans={trainingPlans}
            >
                <div
                    style={{
                        height: `${scrollablePartHeight}px`,
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                    }}
                >
                    {renderScreen({
                        token,
                        setModalParams,
                        trainingPlans,
                        currentScreen,
                        setCurrentScreen,
                        controllTrainings,
                        setControllTrainings,
                        editModeStatus,
                        setEditModeStatus,
                        exercisingStatus,
                        setExercisingStatus,
                        trainingProgress,
                        setTrainingProgress,
                    })}
                </div>
            </FunctionalBar>
            <Navigation currentScreen={currentScreen} onScreenChange={setCurrentScreen} setModalParams={setModalParams} exercisingStatus={exercisingStatus} setTrainingProgress={setTrainingProgress} setExercisingStatus={setExercisingStatus}
            />
        </MainScreenWrapper>
    );
}

export default MainScreen;