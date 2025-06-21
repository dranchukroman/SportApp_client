import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import FunctionalBarLoader from '../../../../../components/Loaders/FunctionalBarLoader/FunctionalBarLoader';
import { deleteExerciseInDay, getAllExerciseInDay } from "./api";
import { saveTrainingRecords } from "../../../../../api/trainings/training.api";
import PageWrapper from '../../../../../components/layout/PageWrapper/PageWrapper'
import ControllButtonsGroup from "../../../../../components/ui/ControllButtonsGroup/ControlButtonsGroup";
import EmptyFunctionalBar from "../../../../../components/states/EmptyFunctionalBar/EmptyFunctionalBar";
import TrainingExerciseCard from "./components/TrainingExerciseCard";
import { useModal } from "../../../../../providers/ModalProvider";
import { useTraining } from "../../../../../providers/TrainingProvider";

function ExercisesView({ onScreenChange, trainingDayId, trainingPlanId, editModeStatus, setControllTrainings }) {
    const [status, setStatus] = useState('loading');
    const [exercises, setExercises] = useState([]);
    const { showModal, hideModal } = useModal();
    const { trainingProgress, updateProgress, finishTraining } = useTraining();
    useEffect(() => {
        const fetchData = async () => {
            setStatus('loading');
            try {
                const response = await getAllExerciseInDay(trainingDayId);
                if (response.success) {
                    if (response.data?.exercises.length > 0) {
                        setExercises(response?.data?.exercises);
                        setStatus('success');
                    } else {
                        setStatus('empty');
                    }
                } else {
                    toast.error(response?.message || 'Something went wrong during getting exercises');
                    setStatus('error');
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'Something went wrong during getting exercises');
                setStatus('error');
            }
        };
        fetchData();
    }, [trainingDayId]);

    const handleSaveProgress = async () => {
        try {
            const result = await saveTrainingRecords(trainingPlanId, trainingDayId, trainingProgress.progress);
            if (result.success) {
                handleEmptyProgress();
            } else {
                toast.error(result?.message || 'Training data saving failed')
            }
        } catch (error) {
            toast.error(error?.response?.message || 'Training data saving failed');
        }
    }

    const handleEmptyProgress = () => {
        updateProgress({});
        finishTraining();
        hideModal();
        onScreenChange('TrainingDaysView');
    }

    const handleDelete = async (exerciseIdToDelete) => {
        try {
            const response = await deleteExerciseInDay(exerciseIdToDelete);
            if (response.success) {
                setExercises(prevExercises => prevExercises.filter(exercise => exercise.day_exercise_id !== exerciseIdToDelete));
            } else {
                toast.error(response.message || 'Deleting exercise failed');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Deleting exercise failed');
        }
    }

    const handleEdit = (trainingExerciseId) => {
        setControllTrainings((prev) => ({
            ...prev,
            trainingExerciseId
        }))
        onScreenChange('ExerciseDetails');
    }

    const handleBackButton = () => {
        if (editModeStatus) {
            onScreenChange('TrainingDaysView');
        } else {
            showModal({
                mainText: 'Would you like to finish your training?',
                buttons: [
                    {
                        text: 'Save and Finish',
                        bgColor: null,
                        onClick: handleSaveProgress
                    },
                    {
                        text: 'Discard and Finish',
                        bgColor: null,
                        onClick: handleEmptyProgress
                    },
                    {
                        text: 'Cancel',
                        bgColor: null,
                        onClick: hideModal
                    },
                ]
            })
        }
    }

    const handleSubmitButton = () => {
        if (editModeStatus) {
            console.log('Its editing')
            setControllTrainings((prev) => ({
                ...prev,
                trainingExerciseId: 0
            }))
            onScreenChange('ExerciseDetails');
        } else if (!trainingProgress?.progress[0]?.records?.length > 0) {
            console.log('Its training with no progress')
            onScreenChange('TrainingDaysView');
        } else {
            console.log('Its training')
            showModal({
                mainText: 'Would you like to finish your training?',
                buttons: [
                    {
                        text: 'Save and Finish',
                        bgColor: null,
                        onClick: handleSaveProgress
                    },
                    {
                        text: 'Discard and Finish',
                        bgColor: null,
                        onClick: handleEmptyProgress
                    },
                    {
                        text: 'Cancel',
                        bgColor: null,
                        onClick: hideModal
                    },
                ]
            });
        }
    }

    const handleStartTraining = (trainingExerciseId) => {
        if (editModeStatus) {
            toast.warning('Save editing before starting training')
        } else {
            setControllTrainings((prev) => ({
                ...prev,
                trainingExerciseId
            }))
            onScreenChange('Exercising');
        }
    }

    if (status === 'loading') {
        return <FunctionalBarLoader />
    }

    if (['error', 'empty'].includes(status)) {
        return <EmptyFunctionalBar
            headerText={'No exercises yet'}
            backButtonText={'Back'}
            onBackButtonClick={handleBackButton}
            buttonText={'Add exercise'}
            onButtonClick={handleSubmitButton}
        />
    }

    return (
        <PageWrapper>
            {exercises.map(exercise => (
                <TrainingExerciseCard
                    key={exercise.day_exercise_id}
                    exerciseData={exercise}
                    onEdit={editModeStatus ? handleEdit : null}
                    onDelete={editModeStatus ? handleDelete : null}
                    onSelect={handleStartTraining}
                />
            ))}
            <ControllButtonsGroup
                firstButtonText={'Back'}
                onFirstButtonClick={handleBackButton}
                secondButtonText={editModeStatus ? 'Add exercise' : 'Finish'}
                onSecondButtonClick={handleSubmitButton}
            />
        </PageWrapper>
    );
}

export default ExercisesView;