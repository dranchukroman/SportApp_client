import React, { useState, useEffect } from "react";
import axios from "axios";
import theme from "../../../../styles/theme";

import Heading from "../../../../components/Headings/Heading";
import Input from "../../../../components/Inputs/Input";
import Button from "../../../../components/Buttons/Button";
import ChooseImageIcon from "../../../../assets/icons/ChooseImageIcon";
import Card from "../../../../components/Cards/InfoCard";

function SetUpTrainingDays({ token, onScreenChange, trainingPlanId}){
    const [trainingDays, setTrainingDays ] = useState(null);

    useEffect(() => {
        const fetchData = async (trainingPlanId) => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/getTrainingDays`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    trainingPlanId
                }
            })

            if(response?.data?.trainingDaysData?.data.length > 0){
                setTrainingDays(response.data.trainingDaysData.data);
                console.log(response.data.trainingDaysData.data);
            }
        }
        fetchData(trainingPlanId);
    }, [])

    const getTraingDays = () => {
        console.log(trainingDays)
        if(!trainingDays || trainingDays.length <= 0){

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
                            No training days yet
                        </Heading>
                    </div>
                </div>
            );
        }

        return trainingDays.map(day => (
            <Card
                key={day.day_id}
                data-elem={day.day_id}
                style={{ marginBottom: '14px', position: 'relative' }}
            >
            <div style={{ color: "white" }}>
                <Heading
                    fontSize={'18px'}
                >
                    {day.name}
                </Heading>
                <p
                    style={{marginBottom: '0'}}
                >
                    {day.description}
                </p>
            </div>

            <ChooseImageIcon
                style={{
                    position: 'absolute',
                    right: 9,
                    top: 9
                }}

                // onClick={() => editTrainingDays(day.day_id)}
            />
        </Card>
        ));
    }

    return (
        <div>
            {getTraingDays()}
            <Button
                onClick={() => onScreenChange('AddTrainingDay')}
            >
                Add training day
            </Button> 
        </div>
    );
}

export default SetUpTrainingDays;