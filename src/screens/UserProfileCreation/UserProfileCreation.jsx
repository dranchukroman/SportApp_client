import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { StyledCreateProfile, CreateProfileContainer, UserDataWrapper } from './UserProfileCreation.styled';
import Input from '../../components/Inputs/Input';
import Button from '../../components/Buttons/Button';
import StepCounter from '../../components/StepCounter/StepCounter';
import SelectList from '../../components/SelectList/SelectList';
import { LoadWrapper } from '../../components/Loaders/SingleLoader/SingleLoader.styled';
import { createProfile, getProfileData } from '../../api/user/profile';

function UserProfileCreation() {
    const navigate = useNavigate();

    // Check if profile exist
    useEffect(() => {
        const checkIfProfileExist = async () => {
            try {
                const userExisting = await getProfileData();
                if (userExisting.data.profile) {
                    navigate('/dashboard');
                }
            } catch (error) {
                if (error?.response?.status === 403) {
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
            activity_level: userData.activity_level,
        }

        try {
            const createProfileData = await createProfile(profileData)
            if (!createProfileData.success) {
                console.log(profileData)
                return toast.error(createProfileData?.message || 'Getting profile data failed');
            }
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong during creating profile');
            console.error(error);
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

    const changeStepValidation = (step) => {
        switch (step) {
            case 1:
                if (
                    userData.name === '' ||
                    userData.surname === '' ||
                    userData.height === '' ||
                    userData.weight === '' ||
                    userData.age === '' ||
                    userData.gender === ''
                ) {
                    toast.error('All fields should be filled1');
                    return false;
                }
                break;
            case 2:
                if (
                    userData.goal === '' ||
                    userData.activity_level === ''
                ) {
                    toast.error('All fields should be filled2');
                    return false;
                }
                break;
            default:
                toast.error('Something went wrong');
                return false;
        }
        return true;
    }


    const animateStepChange = () => {
        setAfterLoad(0); // Почати анімацію зникнення
        setTimeout(() => {
            setStep(prev => prev + 1); // Змінити крок після анімації
            setAfterLoad(1); // Показати з анімацією
        }, 300); // Затримка має відповідати transition з CSS (0.3s = 300ms)
    }

    const animateStepBack = () => {
        setAfterLoad(0); // Почати анімацію зникнення
        setTimeout(() => {
            setStep(prev => prev - 1); // Змінити крок після анімації
            setAfterLoad(1); // Показати з анімацією
        }, 300); // Затримка має відповідати transition з CSS (0.3s = 300ms)
    }


    const [afterLoad, setAfterLoad] = useState(0);

    useEffect(() => {
        setAfterLoad(1)
    }, [step]);

    return (
        <div>
            <StepCounter stepCount={maxStep} width={'360px'} activeStep={step} headersArray={stepHeaders} />
            <CreateProfileContainer>
                <LoadWrapper opacity={afterLoad}>
                    <StyledCreateProfile>
                        {renderStep()}

                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                            <Button
                                onClick={() => animateStepBack()} width={"172px"}
                                style={{ display: step === 1 ? 'none' : 'block' }}
                            >
                                Back
                            </Button>
                            <Button
                                onClick={() => {
                                    if (step === maxStep) {
                                        handleCreateProfile();
                                    } else {
                                        const isValid = changeStepValidation(step);
                                        if (isValid) animateStepChange();
                                    }
                                }}
                                width={step === 1 ? '100%' : '172px'}
                            >
                                {step === maxStep ? 'Create' : 'Next'}
                            </Button>
                        </div>
                        {step === 1
                            ? (
                                <Button
                                    style={{ marginTop: 10 }}
                                    onClick={() => {
                                        if (localStorage.getItem('authToken')) {
                                            localStorage.removeItem('authToken');
                                        }
                                        navigate('/login');
                                    }}
                                >
                                    Log out
                                </Button>
                            )
                            : null
                        }
                    </StyledCreateProfile>
                </LoadWrapper>
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
            <SelectList
                value={userData.gender}
                onChange={(e) => setUserData((prev) => ({
                    ...prev,
                    gender: e.target.value
                }))}
            >
                <option value="" disabled hidden>Gender</option>
                <option value="male">
                    Male
                </option>
                <option value="female">
                    Female
                </option>
                <option value="other">
                    Other
                </option>
            </SelectList>
        </div>
    );
}
function Step2({ userData, setUserData }) {
    return (
        <div>
            <p>
                This data will be used in the future<br /> to improve your experience and to generate <br />AI-based training plans.
            </p>
            <SelectList value={userData.activityLevel}
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
            </SelectList>

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
                    <span>Weight:</span> {userData.weight}
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