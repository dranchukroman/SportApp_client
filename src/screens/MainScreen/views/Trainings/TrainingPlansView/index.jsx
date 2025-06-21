import React, { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import FunctionalBarLoader from '../../../../../components/Loaders/FunctionalBarLoader/FunctionalBarLoader';
import { deleteTrainingPlan } from "./api";
import { getTrainingPlan } from "../../../../../api/trainings/plans.api";
import TrainingPlanCard from "./components/TrainingPlanCard";
import ControllButtonsGroup from "../../../../../components/ui/ControllButtonsGroup/ControlButtonsGroup";
import PageWrapper from "../../../../../components/layout/PageWrapper/PageWrapper";
import EmptyFunctionalBar from "../../../../../components/states/EmptyFunctionalBar/EmptyFunctionalBar";
import { useNavigate } from "react-router-dom";

function TrainingPlansView() {
    // To remove it
    const [editModeStatus, setEditModeStatus] = useState(false);
    const [status, setStatus] = useState('loading');
    const [trainingPlans, setTrainingPlans] = useState([]);
    const navigate = useNavigate();
    const getTrainingPlans = useCallback(async () => {
        setStatus('loading');
        try {
            const response = await getTrainingPlan();
            if (response?.success && response?.data?.trainingPlans) {
                if (response.data.trainingPlans.length === 0) {
                    setStatus('empty');
                } else {
                    setStatus('success');
                    setTrainingPlans(response.data.trainingPlans);
                }
            }
        } catch (error) {
            toast.error(error.response?.message || 'Getting training plans failed');
            setStatus('error');
            console.log(error)
        }
    }, []);
    useEffect(() => {
        getTrainingPlans();
    }, [getTrainingPlans]);

    const handleDelete = async (deletePlanId) => {
        try {
            const response = await deleteTrainingPlan(deletePlanId);
            if (response.success) {
                setTrainingPlans(prevDays => prevDays.filter(plan => plan.plan_id !== deletePlanId));
            } else {
                toast.error(response?.message || 'Deleting training plan failed');
            }
        } catch (error) {
            toast.error(error.response?.message || 'Deleting training plan failed');
        }
    }

    const handleEdit = (plan_id) => navigate(`/plans/${plan_id}/edit`);

    const handlePlanCreation = () => {
        setEditModeStatus(false);
        navigate('/plans/new');
    }

    const handleToggleEditMode = () => setEditModeStatus((prev) => !prev);

    const showTrainingDays = (planId) => navigate(`/plans/${planId}/days`);

    if (status === 'loading') {
        return <FunctionalBarLoader />
    }
    if (['error', 'empty'].includes(status)) {
        return (
            <EmptyFunctionalBar 
                headerText={'No training plans yet'} 
                buttonText={'Create training plan'} 
                onButtonClick={handlePlanCreation} 
            />
        );
    }
    return (
        <PageWrapper>
            {trainingPlans.map(plan =>
                <TrainingPlanCard
                    key={plan.plan_id}
                    planData={plan}
                    onSelect={showTrainingDays}
                    onEdit={editModeStatus ? handleEdit : null}
                    onDelete={editModeStatus ? handleDelete : null}
                />
            )}
            <ControllButtonsGroup
                firstButtonText={editModeStatus ? 'Save editing' : 'Edit mode'}
                onFirstButtonClick={handleToggleEditMode}
                secondButtonText={'Add new training plan'}
                onSecondButtonClick={handlePlanCreation}
            />
        </PageWrapper>
    );
}

export default TrainingPlansView;