import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import FunctionalBarLoader from '../../../../../components/Loaders/FunctionalBarLoader/FunctionalBarLoader';
import { addTrainingPlan, getTrainingPlanById, updateTrainingPlan } from "./api";
import TrainingPlanForm from "./components/TrainingPlanForm";
import EmptyFunctionalBar from "../../../../../components/states/EmptyFunctionalBar/EmptyFunctionalBar";

function TrainingPlanDetails({ setControllTrainings, onScreenChange, editModeStatus, trainingPlanId }) {
    const [status, setStatus] = useState(editModeStatus ? 'loading' : 'idle')
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        days_per_week: [],
        thumbnail_image: null,
        is_current_plan: false,
    });

    useEffect(() => {
        const fetchTrainingPlansData = async () => {
            if (!editModeStatus) return;

            setStatus('loading');
            try {
                const response = await getTrainingPlanById(trainingPlanId);
                if (response.success && response?.data?.trainingPlan) {
                    const { name, description, days_per_week, thumbnail_image, is_current_plan } = response.data.trainingPlan;
                    setFormData((prev) => ({
                        ...prev,
                        name,
                        description,
                        days_per_week,
                        thumbnail_image,
                        is_current_plan,
                    }))
                    setStatus('idle');
                } else {
                    toast.error(response?.data?.message || 'Getting training plan data failed');
                    setStatus('error')
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'Getting training plan data failed');
                setStatus('error')
            }
        }

        fetchTrainingPlansData();
    }, [editModeStatus, trainingPlanId]);

    const handleSubmitClick = async () => {
        if (formData.name === '' || formData.description === '' || formData.days_per_week.length === 0)
            return toast.error('All fields should be filled');

        setStatus('submitting');
        try {
            const dataToSend = editModeStatus
                ? { ...formData, trainingPlanId }
                : formData;

            const response = editModeStatus
                ? await updateTrainingPlan(dataToSend)
                : await addTrainingPlan(dataToSend);

            if (response.success) {

                if (!editModeStatus) {
                    setControllTrainings((prev) => ({
                        ...prev,
                        trainingPlanId: response.data.planId
                    }))
                    onScreenChange('TrainingDaysView');
                } else onScreenChange('Trainings');
            } else {
                toast.error(response.message || 'Action failed');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setStatus('idle');
        }
    }

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    const handleCheckBoxChange = (field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: !prev[field]
        }))
    }

    const handleDayClick = (day) => {
        setFormData((prev) => ({
            ...prev,
            days_per_week: prev.days_per_week.includes(day)
                ? prev.days_per_week.filter((d) => d !== day)
                : [...prev.days_per_week, day],
        }))
    }

    if (['loading', 'submitting'].includes(status)) {
        return <FunctionalBarLoader />;
    }
    if (['empty', 'error'].includes(status)) {
        return <EmptyFunctionalBar
            headerText={'No data to display'}
            backButtonText={'Back'}
            onBackButtonClick={() => onScreenChange('Trainings')}
        />
    }
    return <TrainingPlanForm
        formData={formData}
        onInput={handleInputChange}
        onCheckBox={handleCheckBoxChange}
        onSubmit={handleSubmitClick}
        onWeekDayClick={handleDayClick}
        isEditing={editModeStatus}
        isSubmitting={status === 'submitting'}
        status={status}
        onBack={() => onScreenChange('Trainings')}
    />
}

export default TrainingPlanDetails;