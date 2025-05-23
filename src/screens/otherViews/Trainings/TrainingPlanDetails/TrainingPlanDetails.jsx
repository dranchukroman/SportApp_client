import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import Heading from "../../../../components/Headings/Heading";
import Input from "../../../../components/Inputs/Input";
import Button from "../../../../components/Buttons/Button";
import CheckBox from "../../../../components/Inputs/CheckBoxes/CheckBox";
import TextCheckBox from "../../../../components/Inputs/CheckBoxes/TextCheckBox";
import {
    TrainingDetailsWrapper,
    IsCurrentPlanWrapper,
    Paragraph,
    TrainingDaysWrapper
} from "./TrainingPlanDetails";
import theme from "../../../../styles/theme";
import convertStringToArray from "../../../../utils/stringHelpers";
import FunctionalBarLoader from '../../../../components/Loaders/FunctionalBarLoader/FunctionalBarLoader';
import { LoadWrapper } from "../../../../components/Loaders/SingleLoader/SingleLoader.styled";
import { addTrainingPlan, getTrainingPlanById, updateTrainingPlan } from "../../../../api/trainings/plans";


function TrainingPlanDetails({ token, setControllTrainings, onScreenChange, editModeStatus, trainingPlanId }) {
    const [planData, setPlanData] = useState({
        name: '',
        description: '',
        days_per_week: [],
        thumbnail_image: null,
        is_current_plan: false,
    }) // Training plan data

    const trainingDaysList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; // Listed week days

    const [loading, setLoading] = useState(editModeStatus);
    const [afterLoad, setAfterLoad] = useState(0);

    // Select day by click
    const handleDayClick = useCallback((day) => {
        setPlanData((prev) => ({
            ...prev,
            days_per_week: prev.days_per_week.includes(day)
                ? prev.days_per_week.filter((d) => d !== day)
                : [...prev.days_per_week, day],
        }));
    }, [])

    // Get training plans data to edit
    useEffect(() => {
        const fetchTrainingPlansData = async () => {
            try {
                setLoading(true);
                setAfterLoad(0);
                const response = await getTrainingPlanById(trainingPlanId);


                if (response.success && response?.data.trainingPlan) {
                    const planData = response.data.trainingPlan;
                    setPlanData((prev) => ({
                        ...prev,
                        name: planData.name,
                        description: planData.description,
                        days_per_week: convertStringToArray(planData.days_per_week),
                        thumbnail_image: planData.thumbnail_image,
                        is_current_plan: planData.is_current_plan,
                    }))
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'Getting training plan data failed');
            } finally {
                setLoading(false);
                setTimeout(() => setAfterLoad(1), 100);
            }
        }
        if (editModeStatus) fetchTrainingPlansData();
        else {
            setLoading(false);
            setAfterLoad(1);
        }
    }, [editModeStatus, trainingPlanId, token]);

    // Update or add training plan
    const handleTrainingPlan = async () => {
        if (planData.name === '' || planData.description === '' || planData.days_per_week.length === 0)
            return toast.error('All fields should be filled');
        try {
            // Send api request depend on editModeStatus
            const dataToSend = editModeStatus
                ? { ...planData, trainingPlanId }
                : planData;

            const response = editModeStatus
                ? await updateTrainingPlan(dataToSend)
                : await addTrainingPlan(dataToSend);

            if (response.success) {
                toast.info(response.message || 'Action completed successfully');

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
        }
    }

    return (
        <TrainingDetailsWrapper>
            {loading ? <FunctionalBarLoader /> :
                <LoadWrapper opacity={afterLoad}>
                    <Heading fontSize={theme.fontSizes.mediumHeader}>
                        Training plan details
                    </Heading>
                    <Input placeholder={'Plan name'} value={planData.name}
                        onChange={(e) => setPlanData((prev) => ({
                            ...prev,
                            name: e.target.value
                        }))}
                    />
                    <Input placeholder={'Description'} value={planData.description}
                        onChange={(e) => setPlanData((prev) => ({
                            ...prev,
                            description: e.target.value
                        }))}
                    />
                    <Heading fontSize={theme.fontSizes.mediumHeader}>
                        Training days
                    </Heading>
                    <TrainingDaysWrapper>
                        {trainingDaysList.map((day) => (
                            <TextCheckBox
                                key={day}
                                isActive={planData.days_per_week.includes(day)}
                                onClick={() => handleDayClick(day)}
                            >
                                {day}
                            </TextCheckBox>
                        ))}
                    </TrainingDaysWrapper>
                    <Heading fontSize={theme.fontSizes.mediumHeader}>
                        Current training plan
                    </Heading>
                    <IsCurrentPlanWrapper>
                        <Paragraph>You will see your training plan on dashboard</Paragraph>
                        <CheckBox style={{ height: '20px' }} active={planData.is_current_plan}
                            onClick={() => setPlanData((prev) => ({
                                ...prev,
                                is_current_plan: !prev.is_current_plan
                            }))}
                            onChange={null}
                        />
                    </IsCurrentPlanWrapper>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: '10px'
                        }}
                    >
                        <Button
                            onClick={() => onScreenChange('Trainings')}
                            width={'172px'}
                        >
                            Back
                        </Button>
                        <Button
                            onClick={handleTrainingPlan}
                            width={'172px'}
                        >
                            {editModeStatus ? 'Save' : 'Next'}
                        </Button>
                    </div>
                </LoadWrapper>
            }
        </TrainingDetailsWrapper>
    )
}

export default TrainingPlanDetails;