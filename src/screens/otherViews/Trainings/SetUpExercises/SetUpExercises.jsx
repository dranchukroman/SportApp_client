import React, { useState, useEffect } from "react";
import axios from "axios";
import theme from "../../../../styles/theme";

import Heading from "../../../../components/Headings/Heading";
import Button from "../../../../components/Buttons/Button";
import Card from "../../../../components/Cards/InfoCard";
import EditIcon from "../../../../assets/icons/Trainings/editIcon";

function SetUpExercises({ token, onScreenChange, traininDayId}){
    const [exercises, setExercises] = useState(null);

    const [deleteExercises, setDeleteExercises] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/getDayExercise`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        day_id: traininDayId
                    }
                });

                console.log(response?.data?.exerciseData?.data);
                setExercises(response?.data?.exerciseData?.data);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };
        fetchData();
    }, [token, traininDayId]);

    function setUpExercise(){

    }

    function editExercise(){

    }

    function deleteExercise(){
        
    }

    const getExercises = () => {
        if(!exercises || exercises.length <= 0){

            return (
                <div>
                    <div
                        style={{
                            padding: '10px 0 10px 0'
                        }}
                    >
                        <Heading
                            fontSize={theme.fontSizes.mediumHeader}
                        >
                            No exercises yet
                        </Heading>
                    </div>
                </div>
            );
        }

        return exercises.map(exercise => (
            <Card
                key={exercise.day_exercise_id}
                data-elem={exercise.day_exercise_id}
                style={{ marginBottom: '14px', position: 'relative' }}
                onClick={() => setUpExercise(exercise.day_exercise_id)}
            >
            <div style={{ color: "white" }}>
                <Heading
                    fontSize={'18px'}
                >
                    {exercise.name}
                </Heading>
                <div
                    style={{marginBottom: '0'}}
                >
                    Reps: {exercise.reps}
                </div>
                <div
                    style={{marginBottom: '0'}}
                >
                    Weight: {exercise.weight}
                </div>
                <div
                    style={{marginBottom: '0'}}
                >
                    Sets: {exercise.sets}
                </div>
                <div
                    style={{marginBottom: '0'}}
                >
                    Rest: {exercise.rest_time}
                </div>
            </div>

            <EditIcon
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0
                }}

                onClick={() => editExercise()}
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

                    onClick={() => deleteExercise(exercise.day_id)}
                    fontSize={'16px'}
                >
                    DEL
                </Heading>
            </div>
        </Card>
        ));
    }

    return (
        <div>
        <div>
            {getExercises()}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: '10px'
                }}
            >
                <Button
                    onClick={() => onScreenChange('SetUpTrainingDays')}
                    width={'172px'}
                >
                    Back
                </Button>

                <Button
                    // onClick={() => onScreenChange('AddTrainingDay')}
                    width={'172px'}
                >
                    Add exercise
                </Button>
            </div>

        </div>
        </div>
    );
}

export default SetUpExercises;