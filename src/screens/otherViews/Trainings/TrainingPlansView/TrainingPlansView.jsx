import React, { useState, useEffect } from "react";
import axios from "axios";
import StyledTraining from './TrainingPlansView.styled'
import theme from "../../../../styles/theme";

import Heading from "../../../../components/Headings/Heading";
import Button from "../../../../components/Buttons/Button";
import Card from '../../../../components/Cards/InfoCard'
import ErrorToast from "../../../../components/popUps/ErrorToast";

import EditIcon from '../../../../assets/icons/Trainings/editIcon';
import DeleteIcon from "../../../../assets/icons/DeleteIcon";

function TrainingPlansView({ token, onScreenChange, setTrainingPlanId, setEditModeStatus, editModeStatus }) {
    const [trainingPlans, setTrainingPlans] = useState(null);
    const [deletePlanId, setDeletePlanId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Fetch training plan data
        const fetchTrainingPlans = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/trainingPlans`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                if (response.status === 200 && response?.data?.data) {
                    setTrainingPlans(response.data.data);
                } else setErrorMessage('Cant get training plans')
            } catch (error) {
                setErrorMessage(error.response?.data?.message);
            }
        }
        fetchTrainingPlans();
    }, [deletePlanId, token]);

    useEffect(() => {
        // Delete plan
        const deletePlan = async () => {
            try {
                console.log('Deleting training plan with ID:', deletePlanId);
                const response = await axios.delete(`${process.env.REACT_APP_SERVER_LINK}/api/deleteTrainingPlan`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        data: {
                            trainingPlanId: deletePlanId
                        }
                    }
                );
                console.log('Delete response:', response);

                if (response.status === 200) {
                    setTrainingPlans(prevDays => prevDays.filter(plan => plan.plan_id !== deletePlanId));
                }
                setDeletePlanId(null);
            } catch (error) {
                setErrorMessage(error.response?.data?.message)
            }
        };

        if (deletePlanId) deletePlan();
    }, [deletePlanId, token]);



    // Get training plan id for edit and change screen
    function editTrainingDays(planId) {
        setTrainingPlanId(planId);
        onScreenChange('TrainingDaysView');
    }



    const showTrainingPlans = () => {
        if (!trainingPlans || trainingPlans.length === 0) {
            return (
                <div>
                    <div
                        style={{
                            padding: '30px 0 10px 0'
                        }}
                    >
                        <Heading
                            fontSize={theme.fontSizes.mediumHeader}
                        >
                            No training plans yet
                        </Heading>
                    </div>
                </div>
            );
        }
        // Map training plans
        return trainingPlans.map(plan => (
            <Card
                key={plan.plan_id}
                data-elem={plan.plan_id}
                style={{ marginBottom: '14px', position: 'relative' }}
                onClick={() => editModeStatus ? editTrainingDays(plan.plan_id) : startTraining(plan.plan_id)}
            >
                <Heading
                    fontSize={theme.fontSizes.smallHeader}
                    color={theme.colors.whiteText}
                >
                    {plan.name}
                </Heading>
                <EditIcon
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        zIndex: '100',
                        cursor: 'pointer',
                        display: editModeStatus ? 'block' : 'none'
                    }}

                    onClick={(e) => {
                        e.stopPropagation();
                        setTrainingPlanId(plan.plan_id);
                        onScreenChange('TrainingPlanDetails');
                    }}
                />
                <DeleteIcon
                    style={{
                        position: 'absolute',
                        left: 7,
                        top: 4,
                        zIndex: '100',                        
                        display: editModeStatus ? 'block' : 'none',
                        cursor: 'pointer',
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setDeletePlanId(plan.plan_id);
                    }}
                />
            </Card>
        ));
    }

    function startTraining(planId) {
        console.log(`Start training ${planId}`);
    }

    return (
        <StyledTraining>
            {showTrainingPlans()}

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

            <ErrorToast message={errorMessage} setErrorMessage={setErrorMessage} />
        </StyledTraining>
    );
}

export default TrainingPlansView;