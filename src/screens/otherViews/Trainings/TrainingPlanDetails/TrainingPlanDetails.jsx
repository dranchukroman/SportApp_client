import React, { useEffect, useState } from "react";
import Heading from "../../../../components/Headings/Heading";
import Input from "../../../../components/Inputs/Input";
import Button from "../../../../components/Buttons/Button";
import ChooseImageIcon from "../../../../assets/icons/ChooseImageIcon";
import CheckBox from "../../../../components/Inputs/CheckBoxes/CheckBox";
import TextCheckBox from "../../../../components/Inputs/CheckBoxes/TextCheckBox";
import axios from "axios";
import ErrorToast from "../../../../components/popUps/ErrorToast";
import theme from "../../../../styles/theme";

function TrainingPlanDetails({ token, setTrainingPlanId, onScreenChange, editModeStatus, trainingPlanId }) {
    // Training plan data
    const [planName, setPlanName] = useState('');
    const [planDescription, setPlanDescription] = useState('');
    const [plandaysPerWeek, setPlandaysPerWeek] = useState([]);
    const [planThumbnailImage, setPlanThumbnailImage] = useState(null);
    const [isCurrentPlan, setIsCurrentPlan] = useState(false);

    // Service data
    const [fieldsStatus, setFieldsStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    // Check if fields are filled
    function checkFields() {
        if (planName !== '' && planDescription !== '' && plandaysPerWeek.length > 0) {
            setFieldsStatus(true);
            return;
        }
        setErrorMessage('All fields shoud be filled');
    }

    // Select day on click
    function handleDayClick(day) {
        setPlandaysPerWeek((prevDays) => {
            if (prevDays.includes(day)) {
                return prevDays.filter(d => d !== day);
            } else {
                return [...prevDays, day];
            }
        });
    }

    function handleImage() {
        console.log('Choose image')
    }

    // Get training plans
    useEffect(() => {
        // Get training plan data to edit
        const fetchTraininPlans = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/trainingPlan`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        trainingPlanId: trainingPlanId
                    }
                })

                if (response.status === 200 && response?.data?.data) {
                    const planData = response.data.data;
                    setPlanName(planData.name);
                    setPlanDescription(planData.description);
                    setIsCurrentPlan(planData.is_current_plan);
                    setPlanThumbnailImage(planData.thumbnail_image);
                    setPlandaysPerWeek(convertStringToArray(planData.days_per_week));
                }
            } catch (error) {
                setErrorMessage(error.response?.data?.message);
            }
        }
        if (editModeStatus) fetchTraininPlans();

    }, [editModeStatus, trainingPlanId, token]);

    useEffect(() => {
        // Update or add training plan
        const handleTraininPlan = async () => {
            try {
                const planData = {
                    name: planName,
                    description: planDescription,
                    days_per_week: plandaysPerWeek,
                    thumbnail_image: planThumbnailImage,
                    is_current_plan: isCurrentPlan,
                }
                if (editModeStatus) planData.trainingPlanId = trainingPlanId; // If it's updating add trainingPlanId

                // Send api request depend on editModeStatus
                const response = !editModeStatus
                    ? await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/addTrainingPlan`,
                        planData,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    : await axios.put(`${process.env.REACT_APP_SERVER_LINK}/api/updateTrainingPlan`,
                        planData,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                // Redirect to correct screen depends on editModeStatus
                if (!editModeStatus) {
                    setTrainingPlanId(response.data.planId);
                    onScreenChange('SetUpTrainingDays');
                } else onScreenChange('Trainings');

            } catch (error) {
                setErrorMessage(error.response?.data?.message);
            }
        }
        if (fieldsStatus) handleTraininPlan();

    }, [fieldsStatus, editModeStatus, isCurrentPlan, onScreenChange, planDescription, planName, planThumbnailImage, plandaysPerWeek, setTrainingPlanId, token, trainingPlanId]);

    return (
        <div>
            <Heading
                fontSize={theme.fontSizes.mediumHeader}
                fontWeight={theme.fontWeights.mediumHeader}
            >
                Training plan details
            </Heading>
            <Input
                placeholder={'Plan name'}
                onChange={(e) => setPlanName(e.target.value)}
                value={planName}
            />
            <Input
                placeholder={'Description'}
                onChange={(e) => setPlanDescription(e.target.value)}
                value={planDescription}
            />
            <Heading
                fontSize={theme.fontSizes.mediumHeader}
                fontWeight={theme.fontWeights.mediumHeader}
            >
                Training days
            </Heading>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',

                }}
            >
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <TextCheckBox
                        key={day}
                        isActive={plandaysPerWeek.includes(day)}
                        onClick={() => handleDayClick(day)}
                    >
                        <div>{day}</div>
                    </TextCheckBox>
                ))}
            </div>

            <Heading
                fontSize={theme.fontSizes.mediumHeader}
                fontWeight={theme.fontWeights.mediumHeader}
            >
                Add background image
            </Heading>
            <Button
                style={{
                    marginTop: '10px'
                }}
                onClick={handleImage}
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
            <Heading
                fontSize={theme.fontSizes.mediumHeader}
                fontWeight={theme.fontWeights.mediumHeader}
                style={{
                    marginTop: '10px'
                }}
            >
                Current training plan
            </Heading>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: '23px'
                }}
            >
                <div>
                    <p
                        style={{
                            color: theme.colors.whiteText,
                            margin: '8px 0 0 0',
                            fontSize: theme.fontSizes.largeParagraph,
                            width: '188px'
                        }}
                    >
                        You will see your training plan on dashboard
                    </p>
                </div>
                <div
                    style={{
                        height: '20px'
                    }}
                >
                    <CheckBox
                        checked={isCurrentPlan}
                        onClick={() => setIsCurrentPlan((prew) => !prew)}
                    />
                </div>
            </div>

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
                    onClick={checkFields}
                    width={'172px'}
                >
                    {editModeStatus ? 'Save' : 'Next'}
                </Button>
            </div>

            <ErrorToast message={errorMessage} setErrorMessage={setErrorMessage} />
        </div>
    )
}

export default TrainingPlanDetails;

function convertStringToArray(str) {
    // Replace curly braces with square brackets
    const jsonArrayStr = str.replace(/{/g, '[').replace(/}/g, ']');
    // Parse the string into an array
    return JSON.parse(jsonArrayStr);
}