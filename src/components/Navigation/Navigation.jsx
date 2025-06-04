import React from "react";

import { NavigationWrapper, StyledNavigation, IconsWrapper } from './Navigation.styled'

import DivideLine from "../Dividers/DivideLine";
import DashboardIcon from "../../assets/icons/Navigation/dashboard";
import TrainingsdIcon from "../../assets/icons/Navigation/trainings";
import DietIcon from "../../assets/icons/Navigation/diet";
import CalculatorIcon from "../../assets/icons/Navigation/calculator";
import { saveTrainingRecords } from "../../api/trainings/training";
import { toast } from "sonner";

function Navigation({
    currentScreen,
    onScreenChange,
    setTrainingProgress,
    exercisingStatus,
    setModalParams,
    setExercisingStatus,
    trainingPlanId,
    trainingDayId,
    progress
}) {
    const tryToRedirect = (triedView) => {
        if (!exercisingStatus) return onScreenChange(triedView)
        else {
            setModalParams((prev) => ({
                ...prev,
                mainText: 'Would you like to finish your training?',
                btn1Text: 'Save and Finish',
                btn2Text: 'Discard and Finish',
                btn3Text: 'Cancel',
                btn1Color: null,
                btn2Color: null,
                btn3Color: null,
                btn1Method: () => {
                    saveTrainingProgress();
                    setTrainingProgress([]);
                    setExercisingStatus(false);
                    setModalParams((prev) => ({
                        ...prev,
                        isVisible: false
                    }));
                    onScreenChange(triedView);
                },
                btn2Method: () => {
                    setTrainingProgress({});
                    setExercisingStatus(false);
                    setModalParams((prev) => ({
                        ...prev,
                        isVisible: false
                    }));
                    onScreenChange(triedView);
                },
                btn3Method: () => {
                    setModalParams((prev) => ({
                        ...prev,
                        isVisible: false
                    }));
                },
                isVisible: true,
            }))
        }
    }

    const saveTrainingProgress = async () => {
        const result = await saveTrainingRecords(trainingPlanId, trainingDayId, progress);
        if(!result.success){
            toast.error(result.message || 'Training data has not been saved')
        }
    }

    return (
        <NavigationWrapper>
            <DivideLine marginBottom={'27px'} marginTop={0} width={'360px'} />
            <StyledNavigation>
                <IconsWrapper>
                    <DashboardIcon
                        activeIcon={
                            currentScreen === 'Dashboard'
                        }
                        onClick={() => tryToRedirect('Dashboard')}
                    />
                    <TrainingsdIcon
                        activeIcon={
                            currentScreen === 'Trainings' ||
                            currentScreen === 'TrainingPlanDetails' ||
                            currentScreen === 'TrainingDaysView' ||
                            currentScreen === 'TrainingDaysDetails' ||
                            currentScreen === 'ExerciseDetails' ||
                            currentScreen === 'ExercisesView' ||
                            currentScreen === 'Exercising'
                        }
                        onClick={() => tryToRedirect('Trainings')}
                    />
                    <DietIcon
                        activeIcon={
                            currentScreen === 'Diet'
                        }
                        onClick={() => tryToRedirect('Diet')}
                    />
                    <CalculatorIcon
                        activeIcon={
                            currentScreen === 'Calculator'
                        }
                        onClick={() => tryToRedirect('Calculator')}
                    />
                </IconsWrapper>
            </StyledNavigation>
        </NavigationWrapper>
    );
}

export default Navigation;