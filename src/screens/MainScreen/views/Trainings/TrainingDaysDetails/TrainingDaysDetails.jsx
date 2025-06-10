import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Heading from "../../../../../components/Headings/Heading";
import Input from "../../../../../components/Inputs/Input";
import Button from "../../../../../components/Buttons/Button";
import { ViewHeading, ViewInput } from "./TrainingDaysDetails.styled";
import FunctionalBarLoader from '../../../../../components/Loaders/FunctionalBarLoader/FunctionalBarLoader';
import { LoadWrapper } from "../../../../../components/Loaders/SingleLoader/SingleLoader.styled";
import { addTrainingDay, getTrainingDayById, updateTrainingDay } from "./api";
import PageWrapper from '../../../../../components/layout/PageWrapper/PageWrapper'
import ControllButtonsGroup from '../../../../../components/ui/ControllButtonsGroup/ControlButtonsGroup'
import EmptyFunctionalBar from '../../../../../components/states/EmptyFunctionalBar/EmptyFunctionalBar'

function TrainingDaysDetails({ onScreenChange, trainingPlanId, editModeStatus, trainingDayId }) {
    const [status, setStatus] = useState(editModeStatus ? 'loading' : 'idle');
    const [trainingDayData, setTrainingDayData] = useState({
        name: '',
        description: '',
    })

    useEffect(() => {
        const fetchTrainingDaysData = async () => {
            if (!editModeStatus) return;

            setStatus('loading');
            try {
                const response = await getTrainingDayById(trainingDayId);
                if (response.success) {
                    if (response?.data) {
                        setTrainingDayData((prev) => ({
                            ...prev,
                            name: response?.data?.trainingDay?.name,
                            description: response?.data?.trainingDay?.description
                        }))
                        setStatus('success');
                    } else {
                        setStatus('empty');
                    }
                } else {
                    setStatus('error');
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'Something went wrong');
                setStatus('error');
            }
        }
        fetchTrainingDaysData();
    }, [editModeStatus, trainingDayId]);

    const handleSubmitClick = async () => {
        if (trainingDayData.name === '' || trainingDayData.description === '') {
            return toast.error('All fields shoud be filled');
        }
        setStatus('submitting');
        try {
            const isNewDay = trainingDayId === 0;
            const dataToSend = isNewDay
                ? { trainingPlanId, ...trainingDayData }
                : { day_id: trainingDayId, ...trainingDayData };

            const response = isNewDay
                ? await addTrainingDay(dataToSend)
                : await updateTrainingDay(dataToSend)

            if (response.success) {
                onScreenChange('TrainingDaysView');
            } else {
                toast.error(response.message || 'Action failed');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setStatus('idle');
        }
    }

    const handleBackClick = () => onScreenChange('TrainingDaysView');

    const handleInputChange = (field, value) => {
        setTrainingDayData((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    if (status === 'loading') {
        return <FunctionalBarLoader />;
    }

    if (['empty', 'error'].includes(status)) {
        return <EmptyFunctionalBar
            headerText={'Error getting data to edit'}
            backButtonText={'Back'}
            onBackButtonClick={handleBackClick}
        />
    }
    return (
        <PageWrapper>
            <ViewHeading>Training day details</ViewHeading>
            <ViewInput
                name='name'
                placeholder={'Day name'}
                value={trainingDayData.name}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
            <ViewInput
                name='description'
                placeholder={'Day description'}
                value={trainingDayData.description}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
            <ControllButtonsGroup
                firstButtonText={'Back'}
                onFirstButtonClick={handleBackClick}
                secondButtonText={editModeStatus ? 'Save' : 'Add day'}
                onSecondButtonClick={status === 'submitting' ? null : handleSubmitClick}
            />
        </PageWrapper>
    )
}

export default TrainingDaysDetails;