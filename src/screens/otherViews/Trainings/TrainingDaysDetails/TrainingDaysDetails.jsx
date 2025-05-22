import React, { useEffect, useState } from "react";

import { toast } from "sonner";

import Heading from "../../../../components/Headings/Heading";
import Input from "../../../../components/Inputs/Input";
import Button from "../../../../components/Buttons/Button";

import { TrainingDaysWrapper } from "./TrainingDaysDetails.styled";
import FunctionalBarLoader from '../../../../components/Loaders/FunctionalBarLoader/FunctionalBarLoader';
import { LoadWrapper } from "../../../../components/Loaders/SingleLoader/SingleLoader.styled";
import { addTrainingDay, getTrainingDayById, updateTrainingDay } from "../../../../api/trainings/days";


function TrainingDaysDetails({ token, onScreenChange, trainingPlanId, editModeStatus, trainingDayId }) {
    const [trainingDayData, setTrainingDayData] = useState({
        dayName: '',
        dayDescription: '',
    })

    const [loading, setLoading] = useState(false);
    const [afterLoad, setAfterLoad] = useState(0);

    // Get training day data
    useEffect(() => {
        const fetchTrainingDaysData = async () => {
            try {
                setLoading(true);
                setAfterLoad(0);
                const response = await getTrainingDayById(trainingDayId);

                if (response.success && response?.data) {
                    setTrainingDayData((prev) => ({
                        ...prev,
                        dayName: response?.data?.trainingDay?.name,
                        dayDescription: response?.data?.trainingDay?.description
                    }))
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'Something went wrong');
            } finally {
                setLoading(false);
                setTimeout(() => setAfterLoad(1), 100);
            }
        }
        if (editModeStatus && trainingDayId !== 0) fetchTrainingDaysData();
        else {
            setLoading(false);
            setAfterLoad(1);
        }
    }, [editModeStatus, trainingDayId, token]);

    // Add or update training day
    const handleTrainingPlan = async () => {
        if (trainingDayData.dayName === '' || trainingDayData.dayDescription === '') return toast.error('All fields shoud be filled');
        try {
            const isNewDay = trainingDayId === 0;
            const dataToSend = isNewDay
                ? { trainingPlanId, ...trainingDayData }
                : { day_id: trainingDayId, ...trainingDayData };

            const response = isNewDay
                ? await addTrainingDay(dataToSend)
                : await updateTrainingDay(dataToSend)

            if(response.success){
                toast.info(response.message || 'Action completed successfully');
                return onScreenChange('TrainingDaysView');
            } toast.error(response.message || 'Action failed');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    }

    return (
        <TrainingDaysWrapper>
            {loading ? <FunctionalBarLoader /> :
                <LoadWrapper opacity={afterLoad}>
                    <Heading>Training day details</Heading>
                    <Input placeholder={'Day name'} value={trainingDayData.dayName}
                        onChange={(e) => setTrainingDayData((prev) => ({ ...prev, dayName: e.target.value }))}
                    />
                    <Input placeholder={'Description'} value={trainingDayData.dayDescription}
                        onChange={(e) => setTrainingDayData((prev) => ({ ...prev, dayDescription: e.target.value }))}
                    />

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: '10px'
                        }}
                    >
                        <Button
                            onClick={() => onScreenChange('TrainingDaysView')}
                            width={'172px'}
                        >
                            Back
                        </Button>

                        <Button
                            onClick={handleTrainingPlan}
                            width={'172px'}
                        >
                            {editModeStatus ? 'Save' : 'Add day'}
                        </Button>
                    </div>
                </LoadWrapper>}
        </TrainingDaysWrapper>
    )
}

export default TrainingDaysDetails;