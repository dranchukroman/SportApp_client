import React from "react";

import { NavigationWrapper, StyledNavigation, IconsWrapper } from './Navigation.styled'
import DivideLine from "../Dividers/DivideLine";
import { saveTrainingRecords } from "../../api/trainings/training.api";
import { toast } from "sonner";
import { DashboardIcon, DietIcon, TrainingIcon, CalculatorIcon } from "./Navigation.styled";

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
        if (!result.success) {
            toast.error(result.message || 'Training data has not been saved')
        }
    }

    return (
        <NavigationWrapper>
            <DivideLine marginBottom={'27px'} marginTop={0} width={'360px'} />
            <StyledNavigation>
                <IconsWrapper>
                    <DashboardIcon
                        $active={currentScreen === 'Dashboard'}
                        onClick={() => tryToRedirect('Dashboard')}
                    />
                    <TrainingIcon
                        $active={
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
                        $active={
                            currentScreen === 'Diet'
                        }
                        onClick={() => tryToRedirect('Diet')}
                    />
                    <CalculatorIcon
                        $active={
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