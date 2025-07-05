import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import FunctionalBarLoader from '../../../../../components/Loaders/FunctionalBarLoader/FunctionalBarLoader';
import { deleteTrainingDay, getTrainingDays } from "./api";
import EmptyFunctionalBar from '../../../../../components/states/EmptyFunctionalBar/EmptyFunctionalBar';
import PageWrapper from '../../../../../components/layout/PageWrapper/PageWrapper'
import ControllButtonsGroup from '../../../../../components/ui/ControllButtonsGroup/ControlButtonsGroup'
import TrainingDayCard from "./components/TrainingDayCard";
import { useTraining } from "../../../../../providers/TrainingProvider";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";

function TrainingDaysView() {
    // To remove it
    const { editModeStatus, setEditModeStatus } = useOutletContext();
    const [status, setStatus] = useState('loading');
    const [trainingDays, setTrainingDays] = useState([]);
    const { startTraining } = useTraining();
    const { planId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            setStatus('loading');
            try {
                const response = await getTrainingDays(planId);
                if (response.success) {
                    if (response?.data?.trainingDays?.length > 0) {
                        setTrainingDays(response.data.trainingDays);
                        setStatus('success');
                    } else {
                        setStatus('empty');
                    }
                } else {
                    setStatus('error');
                }
            } catch (error) {
                toast.error(error?.response?.message || 'Getting training days failed')
                setStatus('error');
            }
        };
        fetchData();
    }, [planId]);


    const handleBackButton = () => navigate("/trainings/plans");
    const handleAddDayButton = () => navigate(`/trainings/plans/${planId}/days/new`);
    const handleEditing = (trainingDayId) => navigate(`/trainings/plans/${planId}/days/${trainingDayId}/edit`);
    const handleEditExercise = (trainingDayId) => navigate(`/trainings/plans/${planId}/days/${trainingDayId}/exercises`);
    const handleTrainingStart = (trainingDayId) => {
        startTraining();
        navigate(`/trainings/plans/${planId}/days/${trainingDayId}/exercises`);
    }

    const handleDelete = async (dayIdToDelete) => {
        try {
            const response = await deleteTrainingDay(dayIdToDelete);
            if (response.success) {
                setTrainingDays(prevDays => prevDays.filter(day => day.day_id !== dayIdToDelete));
            } else {
                toast.error(response?.message || 'Deleting training day failed');
            }
        } catch (error) {
            toast.error(error.response?.message || 'Deleting training day failed');
        }
    }

    if (status === 'loading') {
        return <FunctionalBarLoader />;
    }
    if (['empty', 'error'].includes(status)) {
        return <EmptyFunctionalBar
            headerText={'No training days yet'}
            buttonText={'Add training day'}
            onButtonClick={handleAddDayButton}
            backButtonText={'Back'}
            onBackButtonClick={handleBackButton}
        />
    }
    return (
        <PageWrapper>
            {trainingDays.map((day) => (
                <TrainingDayCard
                    key={day.day_id}
                    dayData={day}
                    onEdit={editModeStatus ? handleEditing : null}
                    onDelete={editModeStatus ? handleDelete : null}
                    onSelect={editModeStatus ? handleEditExercise : handleTrainingStart}
                />
            ))}

            <ControllButtonsGroup
                firstButtonText={'Back'}
                onFirstButtonClick={handleBackButton}
                secondButtonText={'Add day'}
                onSecondButtonClick={editModeStatus ? handleAddDayButton : null}
            />
        </PageWrapper>
    );
}

export default TrainingDaysView;