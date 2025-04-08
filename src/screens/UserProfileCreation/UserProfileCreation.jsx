import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { StyledCreateProfile, CreateProfileContainer, StyledSelect } from './UserProfileCreation.styled'
import Input from '../../components/Inputs/Input';
import Heading from '../../components/Headings/Heading';
import Button from '../../components/Buttons/Button';
import { toast } from 'sonner';


function UserProfileCreation({ setErrorMessage }) {
    const navigate = useNavigate();

    // Check if profile exist
    useEffect(() => {
        const checkIfProfileExist = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/profile`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });
                if (response.status === 200 && response.data.length > 0) {
                    navigate('/dashboard');
                }
            } catch (error) {
                if (error.response.status === 403) {
                    localStorage.removeItem('authToken');
                    navigate('/login');
                    return;
                }
                console.log('Error while checking profile existing: ', error);
            }
        }
        checkIfProfileExist();
    })

    // User data
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


    const handleCreateProfile = async () => {
        const fieldsValidation = () => {
            if (
                userData.name !== '' &&
                userData.surname !== '' &&
                userData.height !== 0 &&
                userData.weight !== 0 &&
                userData.age !== 0
            ) return true;
            return false
        }

        if (!fieldsValidation()) {
            toast.error('All fields should be filled');
            return;
        }

        const profileData = {
            first_name: userData.name,
            last_name: userData.surname,
            height: userData.height,
            weight: userData.weight,
            age: userData.age,
            gender: userData.gender,
            goal: userData.goal,
            activity_level: userData.activityLevel,
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/createProfile`, profileData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });

            if (response.status === 201) {
                window.location.href = '/dashboard';
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Something went wrong');
        }
    }

    return (
        <CreateProfileContainer>
            <StyledCreateProfile>
                <Heading>Create profile</Heading>
                <p>Fill your data to fully use application</p>
                <Input value={userData.name} placeholder={'Name'}
                    onChange={(e) => setUserData((prev) => ({
                        ...prev,
                        name: e.target.value
                    }))}
                />

                <Input value={userData.surname} placeholder={'Surname'}
                    onChange={(e) => setUserData((prev) => ({
                        ...prev,
                        surname: e.target.value
                    }))}
                />

                <Input type="number" value={userData.height}
                    placeholder={'Height'}
                    onChange={(e) => setUserData((prev) => ({
                        ...prev,
                        height: e.target.value
                    }))}
                />

                <Input type="number" value={userData.weight}
                    placeholder={'Weight'}
                    onChange={(e) => setUserData((prev) => ({
                        ...prev,
                        weight: e.target.value
                    }))}
                />

                <Input value={userData.age} type="number"
                    placeholder={'Age'}
                    onChange={(e) => setUserData((prev) => ({
                        ...prev,
                        age: e.target.value
                    }))}
                />
                <StyledSelect value={userData.gender}
                    onChange={(e) => setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value
                    }))}
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
                <StyledSelect value={userData.activityLevel}
                    onChange={(e) => setUserData((prev) => ({
                        ...prev,
                        activity_level: e.target.value
                    }))}
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

                <Input placeholder={'Your goal'} value={userData.goal}
                    onChange={(e) => setUserData((prev) => ({
                        ...prev,
                        goal: e.target.value
                    }))}
                />
                <Button onClick={handleCreateProfile}>Create</Button>
            </StyledCreateProfile>
        </CreateProfileContainer>
    )
}

export default UserProfileCreation;