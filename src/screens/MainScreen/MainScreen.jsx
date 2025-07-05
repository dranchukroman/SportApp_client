// External components
import React, { useState } from 'react';
import { MainScreenWrapper, InfoBarWrapper, ScreenTitle } from './MainScreen.styled.js';
import FunctionalBar from '../../components/FunctionalBar/FunctionalBar';
import Navigation from '../../components/Navigation/Navigation';
import UserIcon from '../../components/UserIcon/UserIcon';
import { SettingsContainer } from './MainScreen.styled.js';
import Settings from './views/Settings/Settings';
import useFunctionalBarHeight from './hooks/useFunctionalBarHeight.js';
import { useAuth } from '../../providers/AuthProvider.jsx';
import { Outlet } from 'react-router-dom';
import { usePageTitle } from './hooks/usePageTitle.js';

function MainScreen() {
    const { user, updateUser } = useAuth();

    //Form data from settings, it is here, because profile is saving after closing settings
    const [formData, setFormData] = useState(user);
    const [isProfileChanged, setIsProfileChanged] = useState(false);

    const pageTitle = usePageTitle();

    // Custom hook to change height of functional bar
    const { 
        userInformationHeight, 
        functionalBarHeight, 
        scrollablePartHeight, 
        userDataHeight, 
        visiblePartOfScreen 
    } = useFunctionalBarHeight();
    const [settingsVisibility, setSettingsVisibility] = useState(false);

    // Save new profile data only, if data have been changed and settings are closed
    const showSettings = async () => {
        if (settingsVisibility && isProfileChanged) {
            await updateUser(formData);
            setIsProfileChanged(false);
        }
        setSettingsVisibility(prev => !prev);
    };

    const functionalBarPosition = settingsVisibility ? (visiblePartOfScreen - 207) : (userDataHeight + 15);

    return (
        <MainScreenWrapper>
            <InfoBarWrapper ref={userInformationHeight}>
                <ScreenTitle>{pageTitle}</ScreenTitle>
                <UserIcon onClick={showSettings} />
            </InfoBarWrapper>
            <SettingsContainer $isOpen={settingsVisibility}>
                <Settings setFormData={setFormData} formData={formData} visiblePartOfScreen={visiblePartOfScreen} setIsProfileChanged={setIsProfileChanged} />
            </SettingsContainer>
            <FunctionalBar height={functionalBarHeight} topPosition={functionalBarPosition} scrollHeight={scrollablePartHeight}>
                <Outlet />
            </FunctionalBar>
            <Navigation active={!settingsVisibility}/>
        </MainScreenWrapper>
    );
}

export default MainScreen;