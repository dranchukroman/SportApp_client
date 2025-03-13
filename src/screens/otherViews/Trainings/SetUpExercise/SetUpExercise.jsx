import React, { useState, useEffect } from "react";
import axios from "axios";

import Heading from "../../../../components/Headings/Heading";
import Input from "../../../../components/Inputs/Input";
import Button from "../../../../components/Buttons/Button";
import ChooseImageIcon from "../../../../assets/icons/ChooseImageIcon";

function SetUpExercise({ token, onScreenChange, traininDayId }) {
    const [exerciseList, setExerciseList] = useState([]);
    const [exercise, setExercise] = useState({ name: '', exerciseId: '' });
    const [muscleGroupList, setMuscleGroupList] = useState(['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core']);
    const [muscleGroup, setMuscleGroup] = useState('Chest');

    const [series, setSeries] = useState(null);
    const [weight, setWeight] = useState(null);
    const [times, setTimes] = useState(null);
    const [description, setDescription] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [seconds, setSeconds] = useState(null);

    const [fieldsStatus, setFieldsStatus] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/getAllExercises`, 
                    {   
                        headers: {
                            Authorization: `Bearer ${token}`
                        }, 
                        params: {
                            muscle_group: muscleGroup
                        }
                    }
                );

                if (response.status === 200) {
                    setExerciseList(response.data.data);
                    setExercise({ name: response.data.data[0]?.name || '', exerciseId: response.data.data[0]?.exercise_id || '' });
                }
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };
        fetchData();
    }, [muscleGroup, token]);

    function getList() {
        if (exerciseList.length === 0) {
            return <option value="">No exercise to display</option>;
        }

        return exerciseList.map(exercise => (
            <option key={exercise.exercise_id} data-exercise-id={exercise.exercise_id} value={exercise.name}>{exercise.name}</option>
        ));
    }

    function getMuscleGroup() {
        if (muscleGroupList.length === 0) {
            return <option value="">No muscle group to display</option>;
        }

        return muscleGroupList.map(group => (
            <option key={group} value={group}>{group}</option>
        ));
    }

    function checkFields(){
        if(exercise.name !== '' && muscleGroup !== ''){
            setFieldsStatus(true);
            return;
        } 
        setErrorMessage('Select muscle group and exercise');
    }

    useEffect(() => {
        const addExercise = async () => {
            const addExercise = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/addDayExercise`,
                {
                    day_id: traininDayId,
                    exercise_id: exercise.exerciseId,
                    muscle_group: muscleGroup,
                    sets: series, 
                    weight: weight,
                    reps: times,
                    description: description,
                    rest_time: `${minutes}:${seconds}`
                },
                {   
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            onScreenChange('SetUpExercises');
        }
        if(fieldsStatus) addExercise();
    }, [fieldsStatus]);

    return (
        <div>
            <Heading>
                Muscle group
            </Heading>
            <select id="muscleGroupDropdown" value={muscleGroup} onChange={(e) => setMuscleGroup(e.target.value)}>
                {getMuscleGroup()}
            </select>

            <Heading>
                Exercise
            </Heading>
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

            <Heading>
                Exercise details
            </Heading>

            <Input
                placeholder={'Series'}
                value={series}
                onChange={(e) => setSeries(e.target.value)}
            />
            <Input
                placeholder={'Weight'}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
            />
            <Input
                placeholder={'Times'}
                value={times}
                onChange={(e) => setTimes(e.target.value)}
            />
            <Input
                placeholder={'Description'}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Input
                    placeholder={0}
                    style={{
                        width: '145px',
                        height: '70px'
                    }}
                    type={'number'}
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                />
                <Heading>
                    :
                </Heading>
                <Input
                    placeholder={0}
                    style={{
                        width: '145px',
                        height: '70px'
                    }}
                    type={'number'}
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                />
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
                    onClick={() => onScreenChange('SetUpExercises')}
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
    );
}

export default SetUpExercise;