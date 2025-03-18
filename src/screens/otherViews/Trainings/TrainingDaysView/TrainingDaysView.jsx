import React, { useState, useEffect } from "react";
import axios from "axios";
import theme from "../../../../styles/theme";

import Heading from "../../../../components/Headings/Heading";
import Button from "../../../../components/Buttons/Button";
import EditIcon from '../../../../assets/icons/Trainings/editIcon';
import Card from "../../../../components/Cards/InfoCard";

function TrainingDaysView({ token, onScreenChange, trainingPlanId, setTraininDayId}){
    const [trainingDays, setTrainingDays ] = useState(null);

    const [deleteDayId, setDeleteDayId] = useState(null);

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
            }
        }
        fetchData(trainingPlanId);
    }, [token, trainingPlanId]);

    useEffect(() => {
        const deleteDay = async () => {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_LINK}/api/deleteTrainingDays`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }, 
                    data: {
                        day_id: deleteDayId
                    }
                }
            )
            console.log(response);
            if (response.status === 200) {
                setTrainingDays(prevDays => prevDays.filter(day => day.day_id !== deleteDayId));
            }
            setDeleteDayId(null);
        }

        if(deleteDayId) deleteDay();
    }, [deleteDayId, token, setDeleteDayId]);

    const getTraingDays = () => {
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
                onClick={() => {
                    setTraininDayId(day.day_id);
                    onScreenChange('SetUpExercises');
                }}
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

            <EditIcon
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0
                }}

                onClick={() => editTrainingDay()}
            />

            <div
                style={{
                    position: 'absolute',
                    left: 7,
                    top: 7,
                    padding: '10px',
                    border: 'solid 1px red'
                }}
            >
                <Heading

                    onClick={(e) => {
                        e.stopPropagation();
                        setDeleteDayId(day.day_id);
                    }
                    }
                    fontSize={'16px'}
                >
                    DEL
                </Heading>
            </div>
        </Card>
        ));
    }

    function editTrainingDay(){

    }

    return (
        <div>
            {getTraingDays()}
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
                    onClick={() => onScreenChange('AddTrainingDay')}
                    width={'172px'}
                >
                    Add day
                </Button>
            </div>

        </div>
    );
}

export default TrainingDaysView;