import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyledCreateProfile, CreateProfileContainer, StyledSelect } from './UserProfileCreation.styled'
import Input from '../../components/Inputs/Input';
import Heading from '../../components/Headings/Heading';
import Button from '../../components/Buttons/Button';
import ErrorToast from '../../components/popUps/ErrorToast';

function UserProfileCreation() {
    const [userName, setUserName] = useState('');
    const [userSurname, setUserSurname] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('Male');
    const [goal, setGoal] = useState('');
    const [activityLevel, setActivityLevel] = useState('Low');

    const [fieldsStatus, setFieldsStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const checkFields = () => {
        if (userName !== '' && userSurname !== '' && height !== '' && weight !== '' && age !== '' && gender !== '' && goal !== '' && activityLevel !== '') {
            setFieldsStatus(true);
        } else {
            setErrorMessage('All fields should be filled');
        }
    }

    useEffect(() => {
        const checkIfProfileExist = async () => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/profile`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            if(response.status === 200){
                window.location.href = '/dashboard';
            }
        }
        checkIfProfileExist();
    })

    useEffect(() => {
        const createProfile = async () => {
            try {
                const profileData = {
                    first_name: userName,
                    last_name: userSurname,
                    height: height,
                    weight: weight,
                    age: age,
                    gender: gender.toLowerCase(),
                    goal: goal,
                    activity_level: activityLevel.toLowerCase(),
                }
                const response = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/createProfile`, profileData, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });

                if(response.status === 201){
                    window.location.href = '/dashboard';
                } else{
                    setErrorMessage(response.data.message);
                    setFieldsStatus(false);
                }
            } catch (error) {
                setErrorMessage(error.response?.data?.message);
            }
        }
        if(fieldsStatus) createProfile();
    }, [fieldsStatus]);

    return (
        <CreateProfileContainer>
            <StyledCreateProfile>
                <Heading>
                    Create profile
                </Heading>
                <p>
                    Fill your data to fully use application
                </p>
                <Input
                    placeholder={'Name'}
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    style={{
                        marginBottom: '10px'
                    }}
                />

                <Input
                    placeholder={'Surname'}
                    onChange={(e) => setUserSurname(e.target.value)}
                    value={userSurname}
                    style={{
                        marginBottom: '10px'
                    }}
                />

                <Input
                    placeholder={'Height'}
                    onChange={(e) => setHeight(e.target.value)}
                    value={height}
                    style={{
                        marginBottom: '10px'
                    }}
                    type="number"
                />

                <Input
                    placeholder={'Weight'}
                    onChange={(e) => setWeight(e.target.value)}
                    value={weight}
                    style={{
                        marginBottom: '10px'
                    }}
                    type="number"
                />

                <Input
                    placeholder={'Age'}
                    onChange={(e) => setAge(e.target.value)}
                    value={age}
                    style={{
                        marginBottom: '10px'
                    }}
                    type="number"
                />
                <StyledSelect
                    style={{
                        marginBottom: '10px'
                    }}
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                >
                    <option value="Male">
                        Male
                    </option>
                    <option value="Female">
                        Female
                    </option>
                    <option value="Other">
                        Other
                    </option>
                </StyledSelect>
                <StyledSelect
                    style={{
                        marginBottom: '10px'
                    }}
                    onChange={(e) => setActivityLevel(e.target.value)}
                    value={activityLevel}
                >
                    <option value="Low">
                        Low
                    </option>
                    <option value="Medium">
                        Medium
                    </option>
                    <option value="High">
                        High
                    </option>
                </StyledSelect>

                <Input
                    placeholder={'Your goal'}
                    onChange={(e) => setGoal(e.target.value)}
                    value={goal}
                    style={{
                        marginBottom: '10px'
                    }}
                />
                <Button
                    onClick={checkFields}
                >
                    Create
                </Button>
            </StyledCreateProfile>
            <ErrorToast message={errorMessage} setErrorMessage={setErrorMessage} />
        </CreateProfileContainer>
    )
}

export default UserProfileCreation;