import React from "react";
import { toast } from "sonner";
import { useModal } from "../../providers/ModalProvider";

import { NavigationWrapper, StyledNavigation, IconsWrapper, DashboardIcon, DietIcon, TrainingIcon, CalculatorIcon } from './Navigation.styled';
import DivideLine from "../Dividers/DivideLine";
import { saveTrainingRecords } from "../../api/trainings/training.api";
import { useTraining } from "../../providers/TrainingProvider";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function Navigation({ isActive }) {
    const { showModal, hideModal } = useModal();
    const { isExercising, trainingProgress, updateProgress, finishTraining } = useTraining();
    const { dayId, planId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSaveProgress = async () => {
        if (!trainingProgress.progress) return true; // Якщо немає чого зберігати, вважаємо успіхом
        try {
            const result = await saveTrainingRecords(planId, dayId, trainingProgress.progress);
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
        if(!isActive) return;

        // Якщо тренування не активне, просто переходимо
        if (!isExercising) {
            navigate(targetView);
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
                            navigate(targetView);
                        }
                        hideModal();
                    }
                },
                {
                    text: 'Discard and Finish',
                    onClick: () => {
                        handleEmptyProgress();
                        hideModal();
                        navigate(targetView);
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
                        $active={location.pathname === '/dashboard'}
                        onClick={() => checkAndRedirect('/dashboard')}
                    />
                    <TrainingIcon
                        $active={location.pathname.startsWith('/trainings')}
                        onClick={() => checkAndRedirect('/trainings/plans')}
                    />
                    <DietIcon   
                        $active={location.pathname === '/diet'}
                        onClick={() => checkAndRedirect('/diet')}
                    />
                    <CalculatorIcon
                        $active={location.pathname === '/calculator'}
                        onClick={() => checkAndRedirect('/calculator')}
                    />
                </IconsWrapper>
            </StyledNavigation>
        </NavigationWrapper>
    );
}

export default Navigation;