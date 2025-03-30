import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { StyledCreateProfile, CreateProfileContainer, StyledSelect } from './UserProfileCreation.styled'
import Input from '../../components/Inputs/Input';
import Heading from '../../components/Headings/Heading';
import Button from '../../components/Buttons/Button';
import ErrorToast from '../../components/popUps/ErrorToast';

function UserProfileCreation({ errorMessage, setErrorMessage }) {
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        height: 0,
        weight: 0,
        age: 0,
        gender: 'other',
        goal: '',
        activity_level: 'low'
    })

    const [fieldsStatus, setFieldsStatus] = useState(false);

    const checkFields = () => {
        if (userData.name !== '' && userData.surname !== '' && userData.height !== '' && userData.weight !== '' && userData.age !== '' && userData.gender !== '' && userData.goal !== '' && userData.activityLevel !== '') {
            setFieldsStatus(true);
        } else {
            setErrorMessage('All fields should be filled');
        }
    }

    useEffect(() => {
        const checkIfProfileExist = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/profile`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });
                if (response.status === 200 && response.data.length > 0) {
                    window.location.href = '/dashboard';
                }
            } catch (error) {
                console.log('Profile doesn\'t exist');
            }
        }
        checkIfProfileExist();
    })

    const profileData = useMemo(() => ({
        first_name: userData.name,
        last_name: userData.surname,
        height: userData.height,
        weight: userData.weight,
        age: userData.age,
        gender: userData.gender,
        goal: userData.goal,
        activity_level: userData.activityLevel,
    }), [userData]);
    useEffect(() => {
        const createProfile = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/createProfile`, profileData, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });

                if (response.status === 201) {
                    window.location.href = '/dashboard';
                } else {
                    setErrorMessage(response.data.message);
                    setFieldsStatus(false);
                }
            } catch (error) {
                setErrorMessage(error.response?.data?.message);
            }
        }
        if (fieldsStatus) createProfile();
    }, [fieldsStatus, profileData, setErrorMessage]);

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
                    onChange={(e) => setUserData((prev) => ({
                        ...prev,
                        name: e.target.value
                    }))}
                    value={userData.name}
                    style={{
                        marginBottom: '10px'
                    }}
                />

                <Input
                    placeholder={'Surname'}
                    onChange={(e) => setUserData((prev) => ({
                        ...prev,
                        surname: e.target.value
                    }))}
                    value={userData.surname}
                    style={{
                        marginBottom: '10px'
                    }}
                />

                <Input
                    placeholder={'Height'}
                    onChange={(e) => setUserData((prev) => ({
                        ...prev,
                        height: e.target.value
                    }))}
                    value={userData.height}
                    style={{
                        marginBottom: '10px'
                    }}
                    type="number"
                />

                <Input
                    placeholder={'Weight'}
                    onChange={(e) => setUserData((prev) => ({
                        ...prev,
                        weight: e.target.value
                    }))}
                    value={userData.weight}
                    style={{
                        marginBottom: '10px'
                    }}
                    type="number"
                />

                <Input
                    placeholder={'Age'}
                    onChange={(e) => setUserData((prev) => ({
                        ...prev,
                        age: e.target.value
                    }))}
                    value={userData.age}
                    style={{
                        marginBottom: '10px'
                    }}
                    type="number"
                />
                <StyledSelect
                    style={{
                        marginBottom: '10px'
                    }}
                    onChange={(e) => setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value
                    }))}
                    value={userData.gender}
                >
                    <option value="male">
                        Male
                    </option>
                    <option value="female">
                        Female
                    </option>
                    <option value="other">
                        Other
                    </option>
                </StyledSelect>
                <StyledSelect
                    style={{
                        marginBottom: '10px'
                    }}
                    onChange={(e) => setUserData((prev) => ({
                        ...prev,
                        activity_level: e.target.value
                    }))}
                    value={userData.activityLevel}
                >
                    <option value="low">
                        Low
                    </option>
                    <option value="medium">
                        Medium
                    </option>
                    <option value="high">
                        High
                    </option>
                </StyledSelect>

                <Input
                    placeholder={'Your goal'}
                    onChange={(e) => setUserData((prev) => ({
                        ...prev,
                        goal: e.target.value
                    }))}
                    value={userData.goal}
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