import React, { useEffect, useState } from "react";
import Heading from "../../../../components/Headings/Heading";
import Input from "../../../../components/Inputs/Input";
import Button from "../../../../components/Buttons/Button";
import ChooseImageIcon from "../../../../assets/icons/ChooseImageIcon";
import CheckBox from "../../../../components/Inputs/CheckBoxes/CheckBox";
import TextCheckBox from "../../../../components/Inputs/CheckBoxes/TextCheckBox";
import axios from "axios";


function CreateTrainingPlan({ token, setTraininPlanId, onScreenChange }) {
    const [planName, setPlanName] = useState('');
    const [planDescription, setPlanDescription] = useState('');
    const [plandaysPerWeek, setPlandaysPerWeek] = useState([]);

    // Temporary fix
    // const [planThumbnailImage, setPlanThumbnailImage] = useState(null);
    const planThumbnailImage = null

    const [isCurrentPlan, setIsCurrentPlan] = useState(false);

    const [fieldsStatus, setFieldsStatus] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);

    // Create training day
    useEffect(() => {
        const createTraininPlan = async () => {
            try {        
                const planData = {
                    // email: userauth.data.user.email, 
                    name: planName, 
                    description: planDescription, 
                    days_per_week: plandaysPerWeek, 
                    thumbnail_image: planThumbnailImage, 
                    is_current_plan: isCurrentPlan,
                }

                const createPlan = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/addTrainingPlan`, 
                    planData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                setTraininPlanId(createPlan.data.planId);
            } catch (error) {
                console.error('Error while creating training plan: ', error);
            }
        }
        if(fieldsStatus) {
            createTraininPlan();
            onScreenChange('SetUpTrainingDays');
        }
    }, [fieldsStatus, planName, planDescription, plandaysPerWeek, planThumbnailImage, isCurrentPlan, token, setTraininPlanId, onScreenChange]);

    function checkFields(){
        if(planName !== '' && planDescription !== '' && plandaysPerWeek.length > 0){
            setFieldsStatus(true);
            return;
        } 
        setErrorMessage('All fields shoud be filled');
    }

    function handleDayClick(day) {
        setPlandaysPerWeek((prevDays) => {
            if (prevDays.includes(day)) {
                return prevDays.filter(d => d !== day);
            } else {
                return [...prevDays, day];
            }
        });
    }


    return (
        <div>
            <Heading
                fontSize={'23px'}
                fontWeight={600}
            >
                Training plan details
            </Heading>
            <Input
                placeholder={'Title'}
                onChange={(e) => setPlanName(e.target.value)}
            />
            <Input
                placeholder={'Description'}
                onChange={(e) => setPlanDescription(e.target.value)}
            />
            <Heading
                fontSize={'23px'}
                fontWeight={600}
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
                        isActive={plandaysPerWeek.includes(day)} // Use $ prefix for transient prop
                        onClick={() => handleDayClick(day)}
                    >
                        <div>{day}</div>
                    </TextCheckBox>
                ))}
            </div>

            <Heading
                fontSize={'23px'}
                fontWeight={600}
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
            <Heading
                fontSize={'23px'}
                fontWeight={600}
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
                            color: '#EEE',
                            margin: '8px 0 0 0',
                            fontSize: '15px',
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
                        ischecked={isCurrentPlan} // Use $ prefix for transient prop
                        onChange={() => setIsCurrentPlan(!isCurrentPlan)}
                    />
                </div>
            </div>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

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
                    Next
                </Button>
            </div>

        </div>
    )
}



export default CreateTrainingPlan;