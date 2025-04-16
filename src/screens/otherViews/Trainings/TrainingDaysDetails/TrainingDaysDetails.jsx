import React, { useEffect, useState } from "react";
import axios from "axios";

import { toast } from "sonner";

import Heading from "../../../../components/Headings/Heading";
import Input from "../../../../components/Inputs/Input";
import Button from "../../../../components/Buttons/Button";

import { TrainingDaysWrapper } from "./TrainingDaysDetails.styled";
import FunctionalBarLoader from '../../../../components/Loaders/FunctionalBarLoader/FunctionalBarLoader';
import { LoadWrapper } from "../../../../components/Loaders/SingleLoader/SingleLoader.styled";


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
                const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/trainingDay`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { trainingDayId: trainingDayId }
                })
                if (response.status === 200 && response?.data?.trainingDaysData) {
                    setTrainingDayData((prev) => ({
                        ...prev,
                        dayName: response.data.trainingDaysData.data.name,
                        dayDescription: response.data.trainingDaysData.data.description
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
            const endpoint = isNewDay ? 'addTrainingDay' : 'updateTrainingDays';
            const method = isNewDay ? axios.post : axios.put;

            const dataToSend = isNewDay
                ? { trainingPlanId, ...trainingDayData }
                : { day_id: trainingDayId, ...trainingDayData };

            await method(`${process.env.REACT_APP_SERVER_LINK}/api/${endpoint}`, dataToSend, {
                headers: { Authorization: `Bearer ${token}` }
            })
            onScreenChange('TrainingDaysView');
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