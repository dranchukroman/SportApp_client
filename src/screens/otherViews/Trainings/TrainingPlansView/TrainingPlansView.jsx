import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyledTraining, Paragraph } from './TrainingPlansView.styled'
import theme from "../../../../styles/theme";

import Heading from "../../../../components/Headings/Heading";
import Button from "../../../../components/Buttons/Button";
import Card from '../../../../components/Cards/InfoCard'

import EditIcon from '../../../../assets/icons/Trainings/editIcon';
import DeleteIcon from "../../../../assets/icons/DeleteIcon";
import { toast } from "sonner";

function TrainingPlansView({ token, onScreenChange, setControllTrainings, setEditModeStatus, editModeStatus }) {
    const [trainingPlans, setTrainingPlans] = useState(null);
    const [deletePlanId, setDeletePlanId] = useState(null);

    // Get training plans data
    useEffect(() => {
        const getTrainingPlans = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/trainingPlans`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 200 && response?.data?.data) setTrainingPlans(response.data.data);
                else toast.error('Cant get training plans')
            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        }
        getTrainingPlans();
    }, [deletePlanId, token]);

    // Delete plan
    useEffect(() => {
        const deletePlan = async () => {
            try {
                const response = await axios.delete(`${process.env.REACT_APP_SERVER_LINK}/api/deleteTrainingPlan`, {
                    headers: { Authorization: `Bearer ${token}` },
                    data: { trainingPlanId: deletePlanId }
                });
                if (response.status === 200) setTrainingPlans(prevDays => prevDays.filter(plan => plan.plan_id !== deletePlanId));
                setDeletePlanId(null);
            } catch (error) {
                toast.error(error.response?.data?.message)
            }
        };

        if (deletePlanId) deletePlan();
    }, [deletePlanId, token]);

    // Get training plan id for edit and change screen
    function showTrainingDays(planId) {
        setControllTrainings((prev) => ({
            ...prev,
            trainingPlanId: planId
        }));
        onScreenChange('TrainingDaysView');
    }

    // Fetch training plans
    const fetchTrainingPlans = () => {
        if (!trainingPlans || trainingPlans.length === 0) {
            return (
                <Heading fontSize={theme.fontSizes.mediumHeader} style={{ padding: '30px 0 10px 0' }}>
                    No training plans yet
                </Heading>
            );
        }
        // Map training plans
        return trainingPlans.map(plan => (
            <Card key={plan.plan_id} style={{ marginBottom: '14px', position: 'relative' }}
                onClick={() => showTrainingDays(plan.plan_id)}
            >
                <Heading fontSize={theme.fontSizes.smallHeader} color={theme.colors.whiteText}>{plan.name}</Heading>
                <Paragraph>{plan.description || null}</Paragraph>
                <EditIcon editModeStatus={editModeStatus} CardStyles
                    onClick={(e) => {
                        e.stopPropagation();
                        setControllTrainings((prev) => ({
                            ...prev,
                            trainingPlanId: plan.plan_id
                        }));
                        onScreenChange('TrainingPlanDetails');
                    }}
                />
                <DeleteIcon editModeStatus={editModeStatus} CardStyles
                    onClick={(e) => {
                        e.stopPropagation();
                        setDeletePlanId(plan.plan_id);
                    }}
                />
            </Card>
        ));
    }

    return (
        <StyledTraining>
            {fetchTrainingPlans()}

            <div
                style={{
                    display: trainingPlans?.length <= 0 ? 'block' : "flex",
                    justifyContent: "space-between",
                    marginTop: '10px'
                }}
            >
                <Button
                    style={{ display: trainingPlans?.length <= 0 ? 'none' : 'block' }}
                    onClick={() => setEditModeStatus((prev) => !prev)}
                    width={'172px'}
                >
                    {editModeStatus ? 'Save editing' : 'Edit mode'}
                </Button>

                <Button
                    onClick={() => {
                        setEditModeStatus(false)
                        onScreenChange('TrainingPlanDetails')
                    }}
                    width={trainingPlans?.length <= 0 ? '' : '172px'}
                >
                    Add new training plan
                </Button>
            </div>
        </StyledTraining>
    );
}

export default TrainingPlansView;