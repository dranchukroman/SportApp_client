import React, { useCallback } from "react";
import { toast } from "sonner";
import { useModal } from "../../providers/ModalProvider";

import { NavigationWrapper, StyledNavigation, IconsWrapper, DashboardIcon, DietIcon, TrainingIcon, CalculatorIcon } from './Navigation.styled';
import DivideLine from "../Dividers/DivideLine";
import { saveTrainingRecords } from "../../api/trainings/training.api";
import { useTraining } from "../../providers/TrainingProvider";

function Navigation({
    currentScreen,
    onScreenChange,
    trainingPlanId,
    trainingDayId,
}) {
    const { showModal, hideModal } = useModal();
    const { isExercising, trainingProgress, updateProgress, finishTraining } = useTraining();

    const handleSaveProgress = async () => {
        if (!trainingProgress.progress) return true; // Якщо немає чого зберігати, вважаємо успіхом
        try {
            const result = await saveTrainingRecords(trainingPlanId, trainingDayId, trainingProgress.progress);
            if (!result.success) {
                toast.error(result?.message || 'Training data saving failed');
                return false; // Повертаємо ознаку неуспіху
            }
            return true; // Повертаємо ознаку успіху
        } catch (error) {
            toast.error(error?.response?.message || 'Training data saving failed');
            return false;
        }
    };

    const handleEmptyProgress = () => {
        updateProgress({});
        finishTraining();
    };

    const checkAndRedirect = (targetView) => {
        // Якщо тренування не активне, просто переходимо
        if (!isExercising) {
            onScreenChange(targetView);
            return;
        }

        // Якщо тренування активне, показуємо модальне вікно
        // з динамічно створеними обробниками кнопок
        showModal({
            mainText: 'Would you like to finish your training?',
            buttons: [
                {
                    text: 'Save and Finish',
                    onClick: async () => {
                        const isSuccess = await handleSaveProgress();
                        if (isSuccess) {
                            handleEmptyProgress();
                            onScreenChange(targetView);
                        }
                        hideModal();
                    }
                },
                {
                    text: 'Discard and Finish',
                    onClick: () => {
                        handleEmptyProgress();
                        hideModal();
                        onScreenChange(targetView);
                    }
                },
                {
                    text: 'Cancel',
                    onClick: hideModal
                },
            ]
        });
    };

    return (
        <NavigationWrapper>
            <DivideLine marginBottom={'27px'} marginTop={0} width={'360px'} />
            <StyledNavigation>
                <IconsWrapper>
                    <DashboardIcon
                        $active={currentScreen === 'Dashboard'}
                        onClick={() => checkAndRedirect('Dashboard')}
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
                        onClick={() => checkAndRedirect('Trainings')}
                    />
                    <DietIcon
                        $active={
                            currentScreen === 'Diet'
                        }
                        onClick={() => checkAndRedirect('Diet')}
                    />
                    <CalculatorIcon
                        $active={
                            currentScreen === 'Calculator'
                        }
                        onClick={() => checkAndRedirect('Calculator')}
                    />
                </IconsWrapper>
            </StyledNavigation>
        </NavigationWrapper>
    );
}

export default Navigation;