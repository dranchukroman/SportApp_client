import React, { useState, useEffect } from "react";
import { toast } from "sonner";

import Heading from "../../../../components/Headings/Heading";
import Input from "../../../../components/Inputs/Input";
import Button from "../../../../components/Buttons/Button";
import { ExerciseDetailsWrapper, DivideTimerDots, TimerWrapper } from './ExerciseDetails.styled';
import SelectList from '../../../../components/SelectList/SelectList';
import { parseRestTime } from "../../../../utils/stringHelpers";
import FunctionalBarLoader from '../../../../components/Loaders/FunctionalBarLoader/FunctionalBarLoader';
import { LoadWrapper } from "../../../../components/Loaders/SingleLoader/SingleLoader.styled";
import { addExerciseInDay, getExerciseInDayById, updateExerciseInDay } from "../../../../api/trainings/exercise";
import { getExercisesFromLibrary, getMuscleGroups } from "../../../../api/trainings/exerciseLibrary";

function ExerciseDetails({ token, onScreenChange, trainingDayId, editModeStatus, trainingExerciseId }) {
    const [exerciseList, setExerciseList] = useState([]);
    const [muscleGroupList, setMuscleGroups] = useState([]);

    const [exerciseData, setExerciseData] = useState({
        exerciseId: '',
        name: '',
        muscleGroup: muscleGroupList[0]?.name,
        series: '',
        weight: '',
        times: '',
        description: '',
        minutes: null,
        seconds: null,
    })

    const [loading, setLoading] = useState(false);
    const [afterLoad, setAfterLoad] = useState(0);

    useEffect(() => {
    const fetchExercises = async () => {
        try {
            const muscleGroupResponse = await getMuscleGroups();
            if (!muscleGroupResponse?.success) {
                toast.error('Getting muscle groups failed');
            }

            const muscleGroups = muscleGroupResponse.data.muscleGroupsList;
            setMuscleGroups(muscleGroups);

            const selectedGroup = exerciseData.muscleGroup || muscleGroups[0]?.name;

            const exercisesResponse = await getExercisesFromLibrary(selectedGroup);
            if (!exercisesResponse?.success) {
                toast.error('Getting exercises failed');
            }

            const exerciseList = exercisesResponse.data.exerciseList;
            setExerciseList(exerciseList);

            const firstExercise = exerciseList[0];
            if (firstExercise) {
                setExerciseData((prev) => {
                    if (prev.name === '' && prev.exerciseId !== firstExercise.exercise_id) {
                        return {
                            ...prev,
                            name: firstExercise.name,
                            exerciseId: firstExercise.exercise_id,
                        };
                    }
                    return prev;
                });
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || 'Getting muscle groups or exercises failed',
                { id: 'muscleGroupAndExerciseFailed' }
            );
        }
    };

    fetchExercises();
}, [exerciseData.muscleGroup]);

    // Fetch exercise data to edit
    useEffect(() => {
        const fetchExerciseData = async () => {
            try {
                setLoading(true);
                setAfterLoad(0);
                const response = await getExerciseInDayById(trainingExerciseId);

                if (response.success && response.data) {
                    const exerciseData = response.data.exercise;
                    const { minutes, seconds } = parseRestTime(exerciseData.rest_time);
                    setExerciseData((prev) => ({
                        ...prev,
                        exerciseId: exerciseData.exercise_id,
                        name: exerciseData.name,
                        muscleGroup: exerciseData.muscle_group,
                        series: exerciseData.sets,
                        weight: exerciseData.weight,
                        times: exerciseData.reps,
                        description: exerciseData.description,
                        minutes: minutes,
                        seconds: seconds,
                    }));
                }
            } catch (error) {
                toast.error(error.response?.data?.message + 'here');
            } finally {
                setLoading(false);
                setTimeout(() => setAfterLoad(1), 100);
            }
        };
        if (editModeStatus && trainingExerciseId !== 0) fetchExerciseData();
        else {
            setLoading(false);
            setAfterLoad(1);
        }
    }, [editModeStatus, trainingExerciseId, token]);

    const updateExerciseField = (key, value) => {
        setExerciseData((prev) => ({ ...prev, [key]: value }));
    };

    // Handle adding or updating exercise based on editModeStatus
    const handleExercise = async () => {
        if (exerciseData.name === '' || exerciseData.muscleGroup === '') return toast.error('Select muscle group and exercise');
        try {
            const editing = editModeStatus && trainingExerciseId !== 0;
            const exerciseToSave = {
                day_id: trainingDayId,
                exercise_id: exerciseData.exerciseId,
                muscle_group: exerciseData.muscleGroup,
                sets: exerciseData.series,
                weight: exerciseData.weight,
                reps: exerciseData.times,
                description: exerciseData.description,
                rest_time: returnRestTime(exerciseData.minutes, exerciseData.seconds)
            };

            const dataToSend = editing ? { ...exerciseToSave, day_exercise_id: trainingExerciseId } : exerciseToSave

            const response = editing
                ? await updateExerciseInDay(dataToSend)
                : await addExerciseInDay(dataToSend)
            if (!response.success) {
                return toast.error(response.message);
            } return onScreenChange('ExercisesView');
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    return (
        <ExerciseDetailsWrapper>
            {loading ? <FunctionalBarLoader /> :
                <LoadWrapper opacity={afterLoad}>
                    <Heading>Muscle group</Heading>
                    <SelectList value={exerciseData.muscleGroup} onChange={(e) => updateExerciseField('muscleGroup', e.target.value)}>
                        {muscleGroupList.map(group => (
                            <option key={group.category_id} value={group.name}>{group.name}</option>
                        ))}
                    </SelectList>

                    <Heading>Exercise</Heading>
                    <SelectList value={exerciseData.name}
                        onChange={(e) => {
                            const selectedOption = e.target.selectedOptions[0]; // беремо вибраний <option>
                            const exerciseId = selectedOption.getAttribute('data-exercise-id');
                            updateExerciseField('name', e.target.value);
                            updateExerciseField('exerciseId', exerciseId);
                        }}
                    >
                        {exerciseList.length === 0
                            ? <option value="">No exercise to display</option>
                            : exerciseList.map(exercise => (
                                <option key={exercise.exercise_id} data-exercise-id={exercise.exercise_id} value={exercise.name}>
                                    {exercise.name}
                                </option>
                            ))
                        }
                    </SelectList>

                    <Heading>Exercise details</Heading>
                    <Input placeholder={'Series'} value={exerciseData.series} onChange={(e) => updateExerciseField('series', e.target.value)} />
                    <Input placeholder={'Weight'} value={exerciseData.weight} onChange={(e) => updateExerciseField('weight', e.target.value)} />
                    <Input placeholder={'Times'} value={exerciseData.times} onChange={(e) => updateExerciseField('times', e.target.value)} />
                    <Input placeholder={'Description'} value={exerciseData.description} onChange={(e) => updateExerciseField('description', e.target.value)} />
                    <TimerWrapper>
                        <Input
                            className={'timer-input'}
                            placeholder={'minutes'}
                            min='0' max='59' type={'number'}
                            value={exerciseData.minutes ?? ''}
                            onChange={(e) => {
                                const minutes = e.target.value
                                if (minutes.length > 2) {
                                    toast.error('Please enter no more than 2 digits for minutes');
                                    return;
                                } updateExerciseField('minutes', minutes);
                            }}
                            onBlur={(e) => {
                                const minutes = e.target.value;
                                if (!minutes) return;
                                updateExerciseField('minutes', minutes.padStart(2, 0));
                            }}
                        />

                        <DivideTimerDots>:</DivideTimerDots>
                        <Input
                            className={'timer-input'}
                            placeholder={'seconds'}
                            min='0' max='59' type={'number'}
                            value={exerciseData.seconds ?? ''}
                            onChange={(e) => {
                                const seconds = e.target.value
                                if (seconds.length > 2) {
                                    toast.error('Please enter no more than 2 digits for seconds');
                                    return;
                                } updateExerciseField('seconds', seconds);
                            }}
                            onBlur={(e) => {
                                const minutes = e.target.value;
                                if (!minutes) return;
                                updateExerciseField('seconds', minutes.padStart(2, 0));
                            }}
                        />
                    </TimerWrapper>

                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: '10px' }}>
                        <Button onClick={() => onScreenChange('ExercisesView')} width={'172px'}>Back</Button>
                        <Button onClick={handleExercise} width={'172px'}>{editModeStatus ? 'Save' : 'Add'}</Button>
                    </div>
                </LoadWrapper>}
        </ExerciseDetailsWrapper >
    );
}

function returnRestTime(minutes, seconds) {
    const formatedMinutes = minutes?.length > 1 ? minutes : 0 + minutes;
    const formatedSeconds = seconds?.length > 1 ? seconds : 0 + seconds;
    return `${formatedMinutes}:${formatedSeconds}`
}

export default ExerciseDetails;