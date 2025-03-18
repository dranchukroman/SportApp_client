import React, { useEffect, useState } from "react";
import axios from "axios";

import Heading from "../../../../components/Headings/Heading";
import Input from "../../../../components/Inputs/Input";
import Button from "../../../../components/Buttons/Button";
import ChooseImageIcon from "../../../../assets/icons/ChooseImageIcon";

function TrainingDaysDetails({ token, onScreenChange, trainingPlanId }){

    const [dayName, setDayName] = useState('');
    const [dayDescription, setDayDescription] = useState('');
    // const [dayThumbnailImage, setDayThumbnailImage] = useState(null);

    const [fieldsStatus, setFieldsStatus] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);

    function checkFields(){
        console.log('statu')
        if(dayName !== '' && dayDescription !== ''){
            setFieldsStatus(true);
            return;
        } 
        setErrorMessage('All fields shoud be filled');
    }

    useEffect(() => {
        const addTrainingPlan = async () => {
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

            onScreenChange('SetUpTrainingDays');
        }
        if(fieldsStatus) addTrainingPlan();
    }, [fieldsStatus, dayName, dayDescription, onScreenChange, token, trainingPlanId]);

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
                onChange={(e) => setDayName(e.target.value)}
            />
            <Input
                placeholder={'Description'}
                onChange={(e) => setDayDescription(e.target.value)}
            />

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

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

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
                    Save
                </Button>
            </div>

        </div>
    )
}

export default TrainingDaysDetails;