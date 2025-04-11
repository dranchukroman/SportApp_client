import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { StyledCreateProfile, CreateProfileContainer, StyledSelect, UserDataWrapper } from './UserProfileCreation.styled'
import Input from '../../components/Inputs/Input';
import Button from '../../components/Buttons/Button';
import StepCounter from '../../components/StepCounter/StepCounter';
import { toast } from 'sonner';


function UserProfileCreation() {
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
    }, [navigate])

    // User data
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        height: '',
        weight: '',
        age: '',
        gender: '',
        goal: '',
        activity_level: ''
    })

    const [step, setStep] = useState(1);
    const [maxStep,] = useState(3);
    const stepHeaders = ['Fill your data', 'Training data', 'Check your data'];

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
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    }

    const renderStep = () => {
        switch (step) {
            case 1: return <Step1 userData={userData} setUserData={setUserData} />
            case 2: return <Step2 userData={userData} setUserData={setUserData} />
            case 3: return <Step3 userData={userData} setUserData={setUserData} />
            default: return <Step1 userData={userData} setUserData={setUserData} />
        }
    }

    const changeStep = (step) => {
        switch (step) {
            case 1:
                if (
                    userData.name === '' ||
                    userData.surname === '' ||
                    userData.height === '' ||
                    userData.weight === '' ||
                    userData.age === '' ||
                    userData.gender === ''
                ) return toast.error('All fields should be filled1');
                break;
            case 2:
                if (
                    userData.goal === '' ||
                    userData.activity_level === ''
                ) return toast.error('All fields should be filled2');
                break;
            default: return toast.error('Something went wrong');
        }
        setStep(step + 1);
    }

    return (
        <div>
            <StepCounter stepCount={maxStep} width={'360px'} activeStep={step} headersArray={stepHeaders} />
            <CreateProfileContainer>
                <StyledCreateProfile>
                    {renderStep()}

                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                        <Button
                            onClick={() => setStep(step - 1)} width={"172px"}
                            style={{ display: step === 1 ? 'none' : 'block' }}
                        >
                            Back
                        </Button>
                        <Button onClick={() => {
                            step === maxStep ? handleCreateProfile() : changeStep(step);
                        }}
                            width={step === 1 ? '100%' : '172px'}
                        >
                            {step === maxStep ? 'Create' : 'Next'}
                        </Button>
                    </div>
                </StyledCreateProfile>
            </CreateProfileContainer>
        </div>
    )
}

export default UserProfileCreation;

function Step1({ userData, setUserData }) {
    return (
        <div>
            <Input value={userData?.name} placeholder={'Name'}
                onChange={(e) => setUserData((prev) => ({
                    ...prev,
                    name: e.target.value
                }))}
            />

            <Input value={userData?.surname} placeholder={'Surname'}
                onChange={(e) => setUserData((prev) => ({
                    ...prev,
                    surname: e.target.value
                }))}
            />

            <Input type="number" value={userData?.height}
                placeholder={'Height'}
                onChange={(e) => setUserData((prev) => ({
                    ...prev,
                    height: e.target.value
                }))}
            />

            <Input type="number" value={userData?.weight}
                placeholder={'Weight'}
                onChange={(e) => setUserData((prev) => ({
                    ...prev,
                    weight: e.target.value
                }))}
            />

            <Input value={userData?.age} type="number"
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
                <option value="" disabled selected hidden>Gender</option>
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
        </div>
    );
}
function Step2({ userData, setUserData }) {
    return (
        <div>
            <StyledSelect value={userData.activityLevel}
                onChange={(e) => setUserData((prev) => ({
                    ...prev,
                    activity_level: e.target.value
                }))}
            >
                <option value="" disabled selected hidden>Activity level</option>
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
        </div>
    );
}
function Step3({ userData }) {

    return (
        <UserDataWrapper>
            <div>
                <p>
                    <span>Name:</span> {userData.name}
                </p>
                <p>
                    <span>Surname:</span> {userData.surname}
                </p>
                <p>
                    <span>Age:</span> {userData.age}
                </p>
                <p>
                    <span>Height:</span> {userData.height}
                </p>
                <p>
                    <span>Width:</span> {userData.width}
                </p>
                <p>
                    <span>Gender:</span> {userData.gender}
                </p>
                <p>
                    <span>Goal:</span> {userData.goal}
                </p>
                <p>
                    <span>Activity level:</span> {userData.activity_level}
                </p>
            </div>
        </UserDataWrapper >
    );
}