// External components
import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { MainScreenWrapper, InfoBarWrapper, ScreenTitle } from './MainScreen.styled.js';
import FunctionalBar from '../../components/FunctionalBar/FunctionalBar';
import Navigation from '../../components/Navigation/Navigation';
import UserIcon from '../../components/UserIcon/UserIcon';
import {SettingsContainer} from './MainScreen.styled.js';
import Settings from './views/Settings/Settings';
import getPageTitles from './utils/getPageTitles.js';
import useFunctionalBarHeight from './hooks/useFunctionalBarHeight.js';
import { getTrainingPlan } from '../../api/trainings/plans.api.js';
import { useAuth } from '../../providers/AuthProvider.jsx';
import { Outlet } from 'react-router-dom';

function MainScreen() {
    const { user, updateUser } = useAuth();

    //Settings
    const [formData, setFormData] = useState(user);
    const [isDataChanged, setIsDataChanged] = useState(false);
    
    // Custom hook to change height of functional bar
    const { userInformationHeight, functionalBarHeight, scrollablePartHeight, userDataHeight, visiblePartOfScreen } = useFunctionalBarHeight();
    const [settingsVisibility, setSettingsVisibility] = useState(false);
    
    const showSettings = async () => {
        // If user changed profile data in settings than update user data
        if (settingsVisibility && isDataChanged) {
            await updateUser(formData);
            setIsDataChanged(false);
        }
        setSettingsVisibility(prev => !prev);
    };


    const [trainingPlans, setTrainingPlans] = useState([]);

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

    const pageTitles = useMemo(() => getPageTitles(user.first_name), [user.first_name]); // Get page titles
    const [pageTitle, changePageTitle] = useState(pageTitles["Dashboard"]); // Page title
    // useEffect(() => changePageTitle(pageTitles[currentScreen]), [currentScreen, pageTitles]); // Change page title

    return (
        <MainScreenWrapper>
            <InfoBarWrapper ref={userInformationHeight}>
                <ScreenTitle>{pageTitle}</ScreenTitle>
                <UserIcon onClick={showSettings} />
            </InfoBarWrapper>
            <SettingsContainer $isOpen={settingsVisibility}>
                <Settings setFormData={setFormData} formData={formData} visiblePartOfScreen={visiblePartOfScreen} setIsDataChanged={setIsDataChanged} />
            </SettingsContainer>
            <FunctionalBar
                style={{
                    height: `${functionalBarHeight}px`,
                    position: 'absolute',
                    top: settingsVisibility ? (visiblePartOfScreen - 207) : (userDataHeight + 15),
                    transition: 'top 0.3s ease-in-out',
                    zIndex: 1,
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
                    <Outlet />
                </div>
            </FunctionalBar>
            <Navigation/>
        </MainScreenWrapper>
    );
}

export default MainScreen;