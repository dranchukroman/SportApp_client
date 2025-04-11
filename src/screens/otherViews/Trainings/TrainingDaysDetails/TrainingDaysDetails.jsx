import React, { useEffect, useState } from "react";
import axios from "axios";

import Heading from "../../../../components/Headings/Heading";
import Input from "../../../../components/Inputs/Input";
import Button from "../../../../components/Buttons/Button";
import ChooseImageIcon from "../../../../assets/icons/ChooseImageIcon";
import theme from "../../../../styles/theme";
import { toast } from "sonner";

function TrainingDaysDetails({ token, onScreenChange, trainingPlanId, editModeStatus, traininDayId }) {

    const [dayName, setDayName] = useState('');
    const [dayDescription, setDayDescription] = useState('');
    // const [dayThumbnailImage, setDayThumbnailImage] = useState(null);

    const [fieldsStatus, setFieldsStatus] = useState(false);


    function checkFields() {
        if (dayName !== '' && dayDescription !== '') {
            setFieldsStatus(true);
            return;
        }
        toast.error('All fields shoud be filled');
    }

    useEffect(() => {
        const fetchTrainingDaysData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/trainingDay`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        trainingDayId: traininDayId
                    }
                })

                if (response.status === 200 && response?.data?.trainingDaysData) {
                    setDayName(response.data.trainingDaysData.data.name);
                    setDayDescription(response.data.trainingDaysData.data.description);
                }
            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        }
        if (editModeStatus && traininDayId !== 0) fetchTrainingDaysData();
    }, [editModeStatus, traininDayId, token]);

    // Add or update training day
    useEffect(() => {
        const handleTrainingPlan = async () => {
            try {
                if (traininDayId === 0) {
                    await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/addTrainingDay`,
                        {
                            trainingPlanId,
                            dayName,
                            dayDescription,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    )
                } else await axios.put(`${process.env.REACT_APP_SERVER_LINK}/api/updateTrainingDays`,
                    {
                        day_id: traininDayId,
                        dayName,
                        dayDescription,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                onScreenChange('TrainingDaysView');
            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        }
        if (fieldsStatus) handleTrainingPlan();
    }, [fieldsStatus, dayName, dayDescription, onScreenChange, token, trainingPlanId, traininDayId]);

    return (
        <div>
            <Heading
                fontSize={theme.fontSizes.mediumHeader}
                fontWeight={theme.fontWeights.mediumHeader}
            >
                Training plan details
            </Heading>
            <Input
                placeholder={'Title'}
                onChange={(e) => setDayName(e.target.value)}
                value={dayName}
            />
            <Input
                placeholder={'Description'}
                onChange={(e) => setDayDescription(e.target.value)}
                value={dayDescription}
            />

            <Heading
                fontSize={theme.fontSizes.mediumHeader}
                fontWeight={theme.fontWeights.mediumHeader}
            >
                Add image
            </Heading>
            <Button
                style={{
                    marginTop: '10px'
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <div
                        style={{
                            padding: '0 16px 0 42px'
                        }}
                    >
                        Choose
                    </div>
                    <ChooseImageIcon />
                </div>
            </Button>
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
                    onClick={checkFields}
                    width={'172px'}
                >
                    {editModeStatus ? 'Save' : 'Add day'}
                </Button>
            </div>
        </div>
    )
}

export default TrainingDaysDetails;