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
import { useParams, useNavigate } from "react-router-dom";

function ExercisesView() {
    // To remove it
    const [editModeStatus, setEditModeStatus] = useState(false);
    const [status, setStatus] = useState('loading');
    const [exercises, setExercises] = useState([]);
    const { showModal, hideModal } = useModal();
    const { trainingProgress, updateProgress, finishTraining } = useTraining();
    const { dayId, planId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            setStatus('loading');
            try {
                const response = await getAllExerciseInDay(dayId);
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
    }, [dayId]);

    const handleSaveProgress = async () => {
        try {
            const result = await saveTrainingRecords(planId, dayId, trainingProgress.progress);
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
        navigate(`/plans/${planId}/days`);
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
        navigate(`/exercises/${trainingExerciseId}/edit`);
    }

    const handleBackButton = () => {
        if (editModeStatus) {
            navigate(`/plans/${planId}/days`);
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

    const handleSubmitButton = (trainingExerciseId) => {
        if (editModeStatus) {
            navigate(`/exercises/${trainingExerciseId}/edit`);
        } else if (!trainingProgress?.progress[0]?.records?.length > 0) {
            navigate(`/plans/${planId}/days`);
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
            navigate(`/workout/${trainingExerciseId}`);
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
            onButtonClick={handleSubmitButton(0)}
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
                onSecondButtonClick={() => handleSubmitButton(0)} // To thing how to get exercise id
            />
        </PageWrapper>
    );
}

export default ExercisesView;