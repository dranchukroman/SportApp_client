import React, { useState, useEffect } from "react";
import axios from "axios";
import theme from "../../../../styles/theme";
import { toast } from "sonner";

import { ExerciseViewWrapper, ExerciseDataWrapper, ExerciseParagraph, ExerciseHeader } from './ExercisesView.styled';

import Heading from "../../../../components/Headings/Heading";
import Button from "../../../../components/Buttons/Button";
import Card from "../../../../components/Cards/InfoCard";
import EditIcon from "../../../../assets/icons/Trainings/editIcon";
import DeleteIcon from "../../../../assets/icons/DeleteIcon";


function ExercisesView({ token, onScreenChange, trainingDayId, editModeStatus, setControllTrainings, exercisingStatus, setModalParams, saveTrainingProgress, setExercisingStatus, setTrainingProgress }) {
    const [exercises, setExercises] = useState([]);
    const [deleteExercise, setDeleteExercise] = useState(null);

    // Get exercises from DB
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/getDayExercise`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { day_id: trainingDayId }
                });
                setExercises(response?.data?.exerciseData?.data);
            } catch (error) {
                toast.error('Something went wrong during getting exercises')
                console.error('Error fetching exercises:', error);
            }
        };
        fetchData();
    }, [token, trainingDayId]);

    // Delete exercise
    useEffect(() => {
        const reduceExercises = async () => {
            try {
                const response = await axios.delete(`${process.env.REACT_APP_SERVER_LINK}/api/deleteDayExercise`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        data: { day_exercise_id: deleteExercise }
                    }
                );

                if (response.status === 200) {
                    setExercises(prevExercises => prevExercises.filter(exercise => exercise.day_exercise_id !== deleteExercise));
                }
                setDeleteExercise(null);
            } catch (error) {
                toast.error(error.message);
                console.error('Error deleting exercise:', error);
            }
        };
        if (deleteExercise !== null) reduceExercises();
    }, [deleteExercise, token]);

    // Set up popUp if it is training
    const handlePopUp = (triedView) => {
        if (!exercisingStatus) return onScreenChange(triedView)
        else {
            setModalParams((prev) => ({
                ...prev,
                mainText: 'Would you like to finish your training?',
                btn1Text: 'Save and Finish',
                btn2Text: 'Discard and Finish',
                btn3Text: 'Cancel',
                btn1Color: null,
                btn2Color: null,
                btn3Color: null,
                btn1Method: () => {
                    saveTrainingProgress();
                    setExercisingStatus(false);
                    setModalParams((prev) => ({
                        ...prev,
                        isVisible: false
                    }));
                    onScreenChange(triedView);
                },
                btn2Method: () => {
                    setTrainingProgress({});
                    setExercisingStatus(false);
                    setModalParams((prev) => ({
                        ...prev,
                        isVisible: false
                    }));
                    onScreenChange(triedView);
                },
                btn3Method: () => {
                    setModalParams((prev) => ({
                        ...prev,
                        isVisible: false
                    }));
                },
                isVisible: true,
            }))
        }
    }

    return (
        <ExerciseViewWrapper>
            {exercises && exercises.length > 0 ? (
                exercises.map(exercise => (
                    <Card
                        style={{
                            marginBottom: '14px',
                            position: 'relative',
                            padding: `20px 0`,
                            textAlign: 'left'
                        }}
                        key={exercise.day_exercise_id}
                        onClick={() => {
                            if (editModeStatus) {
                                toast.warning('Save editing before starting training')
                            } else {
                                setControllTrainings((prev) => ({
                                    ...prev,
                                    trainingExerciseId: exercise.day_exercise_id
                                }))
                                onScreenChange('Exercising');
                            }
                        }}
                    >
                        <ExerciseDataWrapper>
                            <ExerciseHeader fontSize={theme.fontSizes.smallHeader}>
                                {exercise.exercise_name}
                            </ExerciseHeader>
                            {exercise.reps && <ExerciseParagraph>
                                Reps - {exercise.reps}
                            </ExerciseParagraph>}
                            {exercise.weight && <ExerciseParagraph>
                                Weight - {exercise.weight}
                            </ExerciseParagraph>}
                            {exercise.sets && <ExerciseParagraph>
                                Sets - {exercise.sets}
                            </ExerciseParagraph>}
                            {exercise.rest_time && <ExerciseParagraph>
                                Rest - {exercise.rest_time}
                            </ExerciseParagraph>}
                            {exercise.description && <ExerciseParagraph>
                                Description - {exercise.description}
                            </ExerciseParagraph>}
                        </ExerciseDataWrapper>
                        <EditIcon editModeStatus={editModeStatus} CardStyles
                            onClick={(e) => {
                                e.stopPropagation();
                                setControllTrainings((prev) => ({
                                    ...prev,
                                    trainingExerciseId: exercise.day_exercise_id
                                }))
                                onScreenChange('ExerciseDetails');
                            }}
                        />
                        <DeleteIcon editModeStatus={editModeStatus} CardStyles
                            style={{
                                right: 7,
                                left: 'unset',
                                bottom: 4,
                                top: 'unset'
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setDeleteExercise(exercise.day_exercise_id);
                            }}
                        />
                    </Card>
                ))
            ) : (
                <Heading style={{ padding: "30px 0 10px 0" }} fontSize={theme.fontSizes.mediumHeader}>
                    No exercises yet
                </Heading>
            )}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: '10px'
                }}
            >
                <Button
                    onClick={() => handlePopUp('TrainingDaysView')}
                    width={'172px'}
                >
                    Back
                </Button>

                <Button
                    onClick={() => {
                        setControllTrainings((prev) => ({
                            ...prev,
                            trainingExerciseId: 0
                        }))
                        onScreenChange('ExerciseDetails');
                    }}
                    width={'172px'}
                >
                    Add exercise
                </Button>
            </div>
        </ExerciseViewWrapper>
    );
}

export default ExercisesView;