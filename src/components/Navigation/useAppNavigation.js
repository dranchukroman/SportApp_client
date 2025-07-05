import { useModal } from "../../providers/ModalProvider";
import { useTraining } from "../../providers/TrainingProvider";
import { useParams, useNavigate } from "react-router-dom";
import { saveTrainingRecords } from "../../api/trainings/training.api";
import { toast } from "sonner";


const useAppNavigation = () => {
    const navigate = useNavigate();

    const { showModal, hideModal } = useModal();
    const { isExercising, trainingProgress, updateProgress, finishTraining } = useTraining();

    const { dayId, planId } = useParams();

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

    const handleNavigation = (targetView) => {
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

    return { handleNavigation };
}

export default useAppNavigation;