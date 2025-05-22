// External components
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Themes and style
import { MainScreenWrapper, InfoBarWrapper, ScreenTitle } from './MainScreen.styled.js';

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
import { getProfileData, updateProfile } from '../../api/user/profile.js';
import { checkIfTokenValid } from '../../api/user/loginMethods.js';
import { getTrainingPlan } from '../../api/trainings/plans.js';

function MainScreen({ setModalParams }) {
    const navigate = useNavigate(); // Create navigation object
    const token = localStorage.getItem('authToken'); // Get token

    // Check if token exist and valid
    useEffect(() => {
        !token && navigate('/login');
        const tokenValidation = async () => {
            try {
                const { tokenStatus } = await checkIfTokenValid();
                if (!tokenStatus) {
                    localStorage.removeItem('authToken');
                    navigate('/login');
                    toast.error('Session expired');
                }
            } catch (error) {
                navigate('/login');
                toast.error('Something went wrong durign checking active session');
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
    const [isLoading, setLoader] = useState(false)

    // Function to get user profile data
    const getUserData = useCallback(async () => {
        try {
            const userData = await getProfileData();
            if (!userData.success && !userData.data.profile) {
                return navigate('/createProfile');
            }
            const { profile } = userData.data;
            setUserData((prevState) => ({
                ...prevState,
                name: profile.first_name,
                surname: profile.last_name,
                height: profile.height,
                weight: profile.weight,
                age: profile.age,
                gender: profile.gender,
                goal: profile.goal,
                activity_level: profile.activity_level,
            }))
        } catch (error) {
            console.error('Error fetching user data:', error);
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
                    const newProfileData = {
                        first_name: userData.name,
                        last_name: userData.surname,
                        height: userData.height,
                        weight: userData.weight,
                        age: userData.age,
                        gender: userData.gender,
                        goal: userData.goal,
                        activity_level: userData.activity_level,
                    }
                    const profileUpdateData = await updateProfile(newProfileData);
                    profileUpdateData.success ? toast.info(profileUpdateData.message || 'Profile updated') : toast.error(profileUpdateData.message || 'Updating profile data failed');
                } catch (error) {
                    toast.error(error.response?.data?.message || 'Updating profile data failed');
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
                const planData = await getTrainingPlan();
                if(planData.success && planData.data.trainingPlans.length > 0){
                    setTrainingPlans(planData.data.trainingPlans);
                    console.log(planData.data.trainingPlans)
                }
                
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
                <ScreenTitle>{pageTitle}</ScreenTitle>
                <UserIcon onClick={showSettings} />
            </InfoBarWrapper>
            {settingsVisibility && (
                <Settings setUserData={setUserData} userData={userData} visiblePartOfScreen={visiblePartOfScreen} setIsDataChanged={setIsDataChanged} />
            )}
            <FunctionalBar
                style={{
                    height: `${functionalBarHeight}px`,
                    position: 'absolute',
                    top: settingsVisibility ? (visiblePartOfScreen - 207) : (userDataHeight + 15),
                    transition: 'top 0.3s ease',
                }}
                trainingPlans={trainingPlans}
                isLoading={isLoading}
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
                        setLoader,
                    })}
                </div>
            </FunctionalBar>
            <Navigation currentScreen={currentScreen} onScreenChange={setCurrentScreen} setModalParams={setModalParams} exercisingStatus={exercisingStatus} setTrainingProgress={setTrainingProgress} setExercisingStatus={setExercisingStatus} />
        </MainScreenWrapper>
    );
}

export default MainScreen;