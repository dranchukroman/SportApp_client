// External components
import React, { useState } from 'react';
import { MainScreenWrapper, InfoBarWrapper, ScreenTitle } from './MainScreen.styled.js';
import FunctionalBar from '../../components/FunctionalBar/FunctionalBar';
import Navigation from '../../components/Navigation/Navigation';
import UserIcon from '../../components/UserIcon/UserIcon';
import { SettingsContainer } from './MainScreen.styled.js';
import Settings from './views/Settings/Settings';
import getPageTitles from './utils/pageTitles.js';
import useFunctionalBarHeight from './hooks/useFunctionalBarHeight.js';
import { useAuth } from '../../providers/AuthProvider.jsx';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { usePageTitle } from './hooks/usePageTitle.js';

function MainScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, updateUser } = useAuth();
    const pageTitle = usePageTitle();

    //Settings
    const [formData, setFormData] = useState(user);
    const [isDataChanged, setIsDataChanged] = useState(false);

    // Custom hook to change height of functional bar
    const { userInformationHeight, functionalBarHeight, scrollablePartHeight, userDataHeight, visiblePartOfScreen } = useFunctionalBarHeight();
    const [settingsVisibility, setSettingsVisibility] = useState(false);

    const showSettings = async () => {
        // If user changed profile data in settings than update user data\
        console.log(location.pathname);
        if (settingsVisibility && isDataChanged) {
            await updateUser(formData);
            setIsDataChanged(false);
            navigate('/trainings/plans');
        } else {
            navigate('/dashboard');
        }
        setSettingsVisibility(prev => !prev);
    };

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
            <Navigation />
        </MainScreenWrapper>
    );
}

export default MainScreen;