// External components
import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';

// Themes and style
import { MainScreenWrapper, InfoBarWrapper, ScreenTitle } from './MainScreen.styled.js';

// Global components
import FunctionalBar from '../../components/FunctionalBar/FunctionalBar';
import Navigation from '../../components/Navigation/Navigation';
import UserIcon from '../../components/UserIcon/UserIcon';

// Main pages/views
import Settings from './views/Settings/Settings';

// Other functions
import renderScreen from './utils/renderScreen.js';
import getPageTitles from './utils/getPageTitles.js';
import useFunctionalBarHeight from './hooks/useFunctionalBarHeight.js';
import { getTrainingPlan } from '../../api/trainings/plans.api.js';
import { useAuth } from '../../providers/AuthProvider.jsx';

function MainScreen() {
    const { user, updateUser } = useAuth();
    // All profile data
    const [formData, setFormData] = useState(user);
    // Variable that virify if user changed profile data in settings;
    const [isDataChanged, setIsDataChanged] = useState(false);
    
    // Custom hook to change height of functional bar
    const { userInformationHeight, functionalBarHeight, scrollablePartHeight, userDataHeight, visiblePartOfScreen } = useFunctionalBarHeight();
    // Show/hide settings
    const [settingsVisibility, setSettingsVisibility] = useState(false);
    // Show/hide settings function
    const showSettings = async () => {
        // If user changed profile data in settings, update user data
        if (settingsVisibility && isDataChanged) {
            await updateUser(formData);
            setIsDataChanged(false);
        }
        // Show/hide settings
        setSettingsVisibility(prev => !prev);
    };

    // Save all training plans
    const [trainingPlans, setTrainingPlans] = useState([]);

    // Move it to context
    // Data to manipulate trainings
    const [controllTrainings, setControllTrainings] = useState({
        trainingPlanId: 0,
        trainingDayId: 0,
        trainingExerciseId: 0
    });

    // Move it to context
    // State to check if it is edit mode or not;
    const [editModeStatus, setEditModeStatus] = useState(false); // Edit trainings

    // Change it to take only current training
    // Get all training plans
    useEffect(() => {
        const fetchTrainingPlans = async () => {
            try {
                const planData = await getTrainingPlan();
                if (planData.success && planData.data.trainingPlans.length > 0) {
                    setTrainingPlans(planData.data.trainingPlans);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Can\'t get training plans');
            }
        };
        fetchTrainingPlans();
    }, []);

    const [currentScreen, setCurrentScreen] = useState('Dashboard'); // Current screen
    const pageTitles = useMemo(() => getPageTitles(user.first_name), [user.first_name]); // Get page titles
    const [pageTitle, changePageTitle] = useState(pageTitles["Dashboard"]); // Page title
    useEffect(() => changePageTitle(pageTitles[currentScreen]), [currentScreen, pageTitles]); // Change page title

    return (
        <MainScreenWrapper>
            <InfoBarWrapper ref={userInformationHeight}>
                <ScreenTitle>{pageTitle}</ScreenTitle>
                <UserIcon onClick={showSettings} />
            </InfoBarWrapper>
            {settingsVisibility && (
                <Settings setFormData={setFormData} formData={formData} visiblePartOfScreen={visiblePartOfScreen} setIsDataChanged={setIsDataChanged} />
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
                        trainingPlans,
                        currentScreen,
                        setCurrentScreen,
                        controllTrainings,
                        setControllTrainings,
                        editModeStatus,
                        setEditModeStatus,
                    })}
                </div>
            </FunctionalBar>
            <Navigation currentScreen={currentScreen} onScreenChange={setCurrentScreen} trainingPlanId={controllTrainings.trainingPlanId} trainingDayId={controllTrainings.trainingDayId} />
        </MainScreenWrapper>
    );
}

export default MainScreen;