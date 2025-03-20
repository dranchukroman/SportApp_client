import React, { useState, useEffect } from "react";
import axios from "axios";

import Heading from "../../../../components/Headings/Heading";
import Input from "../../../../components/Inputs/Input";
import Button from "../../../../components/Buttons/Button";
import ErrorToast from "../../../../components/popUps/ErrorToast";

function ExerciseDetails({ token, onScreenChange, traininDayId, editModeStatus, trainingExerciseId }) {
    const [exerciseList, setExerciseList] = useState([]);
    const muscleGroupList = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];

    const [exercise, setExercise] = useState({ name: '', exerciseId: '' });
    const [muscleGroup, setMuscleGroup] = useState('Chest');
    const [series, setSeries] = useState('');
    const [weight, setWeight] = useState('');
    const [times, setTimes] = useState('');
    const [description, setDescription] = useState('');
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const [fieldsStatus, setFieldsStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    // Fetch exercises from library based on selected muscle group
    useEffect(() => {
        const fetchExercisesFromLibrary = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/getAllExercises`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { muscle_group: muscleGroup }
                });

                if (response.status === 200) {
                    setExerciseList(response.data.data);
                    const firstExercise = response.data.data[0] || {};
                    setExercise({ name: firstExercise.name || '', exerciseId: firstExercise.exercise_id || '' });
                }
            } catch (error) {
                setErrorMessage(error.response?.data?.message);
            }
        };
        fetchExercisesFromLibrary();
    }, [muscleGroup, token, editModeStatus]);

    // Fetch exercise data to edit
    useEffect(() => {
        const fetchExerciseData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/exercise`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { exerciseId: trainingExerciseId }
                });

                if (response.status === 200 && response.data.data) {
                    const exerciseData = response.data.data;
                    setExercise({ exerciseId: exerciseData.exercise_id, name: exerciseData.name });
                    setMuscleGroup(exerciseData.muscle_group);
                    setSeries(exerciseData.sets);
                    setWeight(exerciseData.weight);
                    setTimes(exerciseData.reps);
                    setDescription(exerciseData.description);
                    const [min, sec] = exerciseData.rest_time.split(':');
                    setMinutes(min);
                    setSeconds(sec);
                }
            } catch (error) {
                setErrorMessage(error.response?.data?.message);
            }
        };
        if (editModeStatus) fetchExerciseData();
    }, [editModeStatus, trainingExerciseId, token]);

    // Generate exercise options for dropdown
    const getList = () => {
        if (exerciseList.length === 0) {
            return <option value="">No exercise to display</option>;
        }
        return exerciseList.map(exercise => (
            <option key={exercise.exercise_id} data-exercise-id={exercise.exercise_id} value={exercise.name}>{exercise.name}</option>
        ));
    };

    // Generate muscle group options for dropdown
    const getMuscleGroup = () => {
        if (muscleGroupList.length === 0) {
            return <option value="">No muscle group to display</option>;
        }
        return muscleGroupList.map(group => (
            <option key={group} value={group}>{group}</option>
        ));
    };

    // Check if required fields are filled
    const checkFields = () => {
        console.log(exercise.name)
        console.log(muscleGroup)
        if (exercise.name && muscleGroup) {
            setFieldsStatus(true);
        } else {
            setErrorMessage('Select muscle group and exercise');
        }
    };

    // Handle adding or updating exercise based on editModeStatus
    useEffect(() => {
        const handleExercise = async () => {
            try {
                const exerciseData = {
                    day_id: traininDayId,
                    exercise_id: exercise.exerciseId,
                    muscle_group: muscleGroup,
                    sets: series,
                    weight: weight,
                    reps: times,
                    description: description,
                    rest_time: `${minutes}:${seconds}`
                };
                if (editModeStatus) exerciseData.day_exercise_id = trainingExerciseId;

                const url = editModeStatus && trainingExerciseId != 0
                    ? `${process.env.REACT_APP_SERVER_LINK}/api/updateDayExercise`
                    : `${process.env.REACT_APP_SERVER_LINK}/api/addDayExercise`;

                await axios({
                    method: editModeStatus && trainingExerciseId != 0 ? 'put' : 'post',
                    url: url,
                    data: exerciseData,
                    headers: { Authorization: `Bearer ${token}` }
                });

                onScreenChange('ExercisesView');
            } catch (error) {
                setErrorMessage(error.response?.data?.message);
            }
        };
        if (fieldsStatus) handleExercise();
    }, [fieldsStatus, exercise, traininDayId, muscleGroup, series, weight, times, description, minutes, seconds, token, onScreenChange, editModeStatus, trainingExerciseId]);

    return (
        <div>
            <Heading>Muscle group</Heading>
            <select id="muscleGroupDropdown" value={muscleGroup} onChange={(e) => setMuscleGroup(e.target.value)}>
                {getMuscleGroup()}
            </select>

            <Heading>Exercise</Heading>
            <select
                id="exerciseDropdown"
                value={exercise.name}
                onChange={(e) => {
                    const selectedOption = e.target.options[e.target.selectedIndex];
                    setExercise({ name: e.target.value, exerciseId: selectedOption.getAttribute('data-exercise-id') });
                }}
            >
                {getList()}
            </select>

            <Heading>Exercise details</Heading>
            <Input placeholder={'Series'} value={series} onChange={(e) => setSeries(e.target.value)} />
            <Input placeholder={'Weight'} value={weight} onChange={(e) => setWeight(e.target.value)} />
            <Input placeholder={'Times'} value={times} onChange={(e) => setTimes(e.target.value)} />
            <Input placeholder={'Description'} value={description} onChange={(e) => setDescription(e.target.value)} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Input
                    placeholder={0}
                    style={{ width: '145px', height: '70px' }}
                    type={'number'}
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                />
                <Heading>:</Heading>
                <Input
                    placeholder={0}
                    style={{ width: '145px', height: '70px' }}
                    type={'number'}
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: '10px' }}>
                <Button onClick={() => onScreenChange('ExercisesView')} width={'172px'}>Back</Button>
                <Button onClick={checkFields} width={'172px'}>{editModeStatus ? 'Save' : 'Add'}</Button>
            </div>

            <ErrorToast message={errorMessage} setErrorMessage={setErrorMessage} />
        </div>
    );
}

export default ExerciseDetails;