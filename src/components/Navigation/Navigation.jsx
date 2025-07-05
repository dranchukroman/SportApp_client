import React from "react";
import { NavigationWrapper, StyledNavigation, IconsWrapper, DashboardIcon, DietIcon, TrainingIcon, CalculatorIcon } from './Navigation.styled';
import DivideLine from "../Dividers/DivideLine";
import useAppNavigation from "./useAppNavigation";
import { useLocation } from "react-router-dom";

function Navigation({ active }) {
    const location = useLocation();
    const { handleNavigation } = useAppNavigation();

    return (
        <NavigationWrapper $disabled={active}>
            <DivideLine marginBottom={'27px'} marginTop={0} width={'360px'} />
            <StyledNavigation>
                <IconsWrapper>
                    <DashboardIcon
                        $active={location.pathname === '/dashboard'}
                        onClick={() => handleNavigation('/dashboard')}
                    />
                    <TrainingIcon
                        $active={location.pathname.startsWith('/trainings')}
                        onClick={() => handleNavigation('/trainings/plans')}
                    />
                    <DietIcon   
                        $active={location.pathname === '/diet'}
                        onClick={() => handleNavigation('/diet')}
                    />
                    <CalculatorIcon
                        $active={location.pathname === '/calculator'}
                        onClick={() => handleNavigation('/calculator')}
                    />
                </IconsWrapper>
            </StyledNavigation>
        </NavigationWrapper>
    );
}

export default Navigation;