import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { ViewHeading, ViewInput } from "./TrainingDaysDetails.styled";
import FunctionalBarLoader from '../../../../../components/Loaders/FunctionalBarLoader/FunctionalBarLoader';
import { addTrainingDay, getTrainingDayById, updateTrainingDay } from "./api";
import PageWrapper from '../../../../../components/layout/PageWrapper/PageWrapper'
import ControllButtonsGroup from '../../../../../components/ui/ControllButtonsGroup/ControlButtonsGroup'
import EmptyFunctionalBar from '../../../../../components/states/EmptyFunctionalBar/EmptyFunctionalBar'
import { useNavigate, useParams, useLocation, useOutletContext } from "react-router-dom";

function TrainingDaysDetails() {
    const location = useLocation();
    const navigate = useNavigate();

    const { editModeStatus, setEditModeStatus } = useOutletContext();
    const [status, setStatus] = useState(location.pathname.includes('new') ? 'idle' : 'loading');
    const [trainingDayData, setTrainingDayData] = useState({
        name: '',
        description: '',
    })
    const { planId, dayId } = useParams();
    useEffect(() => {
        const fetchTrainingDaysData = async () => {
            console.log(location.pathname.includes('new'));
            if (!editModeStatus || location.pathname.includes('new')) return;

            setStatus('loading');
            try {
                const response = await getTrainingDayById(dayId);
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
    }, [editModeStatus, dayId]);

    const handleSubmitClick = async () => {
        if (trainingDayData.name === '' || trainingDayData.description === '') {
            return toast.error('All fields shoud be filled');
        }
        setStatus('submitting');
        try {
            const isNewDay = location.pathname.includes('new');
            const dataToSend = isNewDay
                ? { planId, ...trainingDayData }
                : { day_id: dayId, ...trainingDayData };

            const response = isNewDay
                ? await addTrainingDay(dataToSend)
                : await updateTrainingDay(dataToSend)

            if (response.success) {
                console.log(planId)
                navigate(`/trainings/plans/${planId}/days`);
            } else {
                toast.error(response.message || 'Action failed');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setStatus('idle');
        }
    }

    const handleBackClick = () => navigate(`/trainings/plans/${planId}/days`);

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