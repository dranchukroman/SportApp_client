import React from "react";

import { NavigationWrapper, StyledNavigation, IconsWrapper } from './Navigation.styled'

import DivideLine from "../Dividers/DivideLine";
import DashboardIcon from "../../assets/icons/Navigation/dashboard";
import TrainingsdIcon from "../../assets/icons/Navigation/trainings";
import DietIcon from "../../assets/icons/Navigation/diet";
import CalculatorIcon from "../../assets/icons/Navigation/calculator";
// import Button from "../Buttons/Button";

function Navigation({currentScreen, onScreenChange, /*setControllButtonsParams, controllButtonsParams*/}){
    return (
        <NavigationWrapper>
            <DivideLine 
                marginBottom={'27px'}
                marginTop={0}
                width={'360px'}
            />
            <StyledNavigation>
                <IconsWrapper>
                    <DashboardIcon 
                        activeIcon={
                            currentScreen === 'Dashboard'
                        }
                        onClick={() => onScreenChange('Dashboard')}
                    />
                    <TrainingsdIcon 
                        activeIcon={
                            currentScreen === 'Trainings' || 
                            currentScreen === 'TrainingPlanDetails' ||
                            currentScreen === 'TrainingDaysView' ||
                            currentScreen === 'TrainingDaysDetails' ||
                            currentScreen === 'ExerciseDetails' ||
                            currentScreen === 'ExercisesView'
                        }
                        onClick={() => onScreenChange('Trainings')}
                    />
                    <DietIcon 
                        activeIcon={
                            currentScreen === 'Diet'
                        }
                        onClick={() => onScreenChange('Diet')}
                    />
                    <CalculatorIcon 
                        activeIcon={
                            currentScreen === 'Calculator'
                        }
                        onClick={() => onScreenChange('Calculator')}
                    />
                </IconsWrapper>
            </StyledNavigation>
        </NavigationWrapper>
    );
}

export default Navigation;