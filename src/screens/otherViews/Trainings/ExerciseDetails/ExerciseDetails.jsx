import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

import Heading from "../../../../components/Headings/Heading";
import Input from "../../../../components/Inputs/Input";
import Button from "../../../../components/Buttons/Button";
import { ExerciseDetailsWrapper, DivideTimerDots, TimerWrapper } from './ExerciseDetails.styled';
import SelectList from '../../../../components/SelectList/SelectList';
import { parseRestTime } from "../../../../utils/stringHelpers";
import FunctionalBarLoader from '../../../../components/Loaders/FunctionalBarLoader/FunctionalBarLoader';
import { LoadWrapper } from "../../../../components/Loaders/SingleLoader/SingleLoader.styled";

function ExerciseDetails({ token, onScreenChange, trainingDayId, editModeStatus, trainingExerciseId }) {
    const [exerciseList, setExerciseList] = useState([]);
    const muscleGroupList = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];

    const [exerciseData, setExerciseData] = useState({
        exerciseId: '',
        name: '',
        muscleGroup: 'Chest',
        series: '',
        weight: '',
        times: '',
        description: '',
        minutes: 0,
        seconds: 0,
    })

    const [loading, setLoading] = useState(false);
    const [afterLoad, setAfterLoad] = useState(0);

    // Fetch exercises from library based on selected muscle group
    useEffect(() => {
        const fetchExercisesFromLibrary = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/getAllExercises`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { muscle_group: exerciseData.muscleGroup }
                });

                if (response.status === 200) {
                    setExerciseList(response.data.data);
                    const firstExercise = response.data.data[0] || {};
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
                toast.error(error.response?.data?.message);
            }
        };
        fetchExercisesFromLibrary();
    }, [token, editModeStatus, exerciseData.muscleGroup]);

    // Fetch exercise data to edit
    useEffect(() => {
        const fetchExerciseData = async () => {
            try {
                setLoading(true);
                setAfterLoad(0);
                const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/exercise`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { exerciseId: trainingExerciseId }
                });

                if (response.status === 200 && response.data.data) {
                    const exerciseData = response.data.data;
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
    }, [editModeStatus, trainingExerciseId, token,]);

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
                rest_time: `${exerciseData.minutes}:${exerciseData.seconds}`
            };

            const endpoint = editing ? 'updateDayExercise' : 'addDayExercise';
            const method = editing ? axios.put : axios.post;
            const dataToSend = editing ? { ...exerciseToSave, day_exercise_id: trainingExerciseId } : exerciseToSave
            await method(`${process.env.REACT_APP_SERVER_LINK}/api/${endpoint}`, dataToSend, {
                headers: { Authorization: `Bearer ${token}` }
            })
            onScreenChange('ExercisesView');
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
                            <option key={group} value={group}>{group}</option>
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
                        <Input className={'timer-input'} placeholder={0} type={'number'} value={exerciseData.minutes} onChange={(e) => updateExerciseField('minutes', e.target.value)} />
                        <DivideTimerDots>:</DivideTimerDots>
                        <Input className={'timer-input'} placeholder={0} type={'number'} value={exerciseData.seconds} onChange={(e) => updateExerciseField('seconds', e.target.value)} />
                    </TimerWrapper>

                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: '10px' }}>
                        <Button onClick={() => onScreenChange('ExercisesView')} width={'172px'}>Back</Button>
                        <Button onClick={handleExercise} width={'172px'}>{editModeStatus ? 'Save' : 'Add'}</Button>
                    </div>
                </LoadWrapper>}
        </ExerciseDetailsWrapper >
    );
}

export default ExerciseDetails;