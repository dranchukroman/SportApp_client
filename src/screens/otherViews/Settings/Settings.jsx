import React from "react";
import { toast } from 'sonner';

import { SettingScreen, ButtonsGroup, Button, SettingInput } from "./Settings.styled";
import theme from "../../../styles/theme";
import DivideLine from "../../../components/Dividers/DivideLine";
import { deleteAccoutn } from "../../../api/user/profile";
import { useNavigate } from "react-router-dom";


function Settings({ userData, setUserData, visiblePartOfScreen, setIsDataChanged }) {
    const navigate = useNavigate(); // Create navigation object

    async function deleteAccount() {
        try {
            const response = await deleteAccoutn();

            if (response.success) {
                localStorage.removeItem('authToken');
                navigate('/login')
                return;
            } else toast.error(response?.message || 'Account has not been deleted');
        } catch (error) {
            toast.error(error.response?.message || 'Deleting account failed');
        }
    }

    async function logOut() {
        if (localStorage.getItem('authToken')) {
            localStorage.removeItem('authToken');
        }
        window.location.href = '/login';
    }

    return (
        <SettingScreen>
            <div
                className='no-scrollbar'
                style={{
                    height: visiblePartOfScreen - 305 + "px",
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                }}
            >
                {/* Persolnal information */}
                <ButtonsGroup>
                    <Button>
                        <SettingInput
                            placeholder={'Name'}
                            onChange={(e) => {
                                setUserData((prevState) => ({
                                    ...prevState,
                                    name: e.target.value
                                }));
                                setIsDataChanged(true);
                            }}
                            value={userData.name}

                        />
                    </Button>
                    <Button>
                        <SettingInput
                            placeholder={'Surname'}
                            onChange={(e) => {
                                setUserData((prevState) => ({
                                    ...prevState,
                                    surname: e.target.value
                                }));
                                setIsDataChanged(true);
                            }}
                            value={userData.surname}

                        />
                    </Button>
                    <Button>
                        <SettingInput
                            placeholder={'Height'}
                            onChange={(e) => {
                                setUserData((prevState) => ({
                                    ...prevState,
                                    height: e.target.value
                                }));
                                setIsDataChanged(true);
                            }}
                            value={userData.height}
                            type="number"
                        />
                    </Button>
                    <Button>
                        <SettingInput
                            placeholder={'Weight'}
                            onChange={(e) => {
                                setUserData((prevState) => ({
                                    ...prevState,
                                    weight: e.target.value
                                }));
                                setIsDataChanged(true);
                            }}
                            value={userData.weight}
                            type="number"
                        />
                    </Button>
                    <Button>
                        <SettingInput
                            placeholder={'Age'}
                            onChange={(e) => {
                                setUserData((prevState) => ({
                                    ...prevState,
                                    age: e.target.value
                                }));
                                setIsDataChanged(true);
                            }}
                            value={userData.age}
                            type="number"
                        />
                    </Button>
                    <Button
                        style={{
                            display: 'flex',
                            justifyContent: 'left'
                        }}
                    >
                        <div
                            style={{
                                fontSize: theme.fontSizes.largeParagraph,
                                color: theme.colors.whiteText,
                                marginRight: '10px',
                            }}
                        >
                            Gender:
                        </div>
                        <select
                            onChange={(e) => {
                                setUserData((prevState) => ({
                                    ...prevState,
                                    gender: e.target.value
                                }));
                                setIsDataChanged(true);
                            }}
                            value={userData.gender}
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: theme.colors.whiteText,
                                fontSize: theme.fontSizes.largeParagraph
                            }}
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
                        </select>
                    </Button>
                    <Button
                        style={{
                            display: 'flex',
                            justifyContent: 'left',
                        }}
                    >
                        <div
                            style={{
                                fontSize: theme.fontSizes.largeParagraph,
                                color: theme.colors.whiteText,
                                marginRight: '10px',
                            }}
                        >
                            Activity level:
                        </div>
                        <select
                            onChange={(e) => {
                                console.log(e);
                                setUserData((prevState) => ({
                                    ...prevState,
                                    activity_level: e.target.value
                                }));
                                setIsDataChanged(true);
                            }}
                            value={userData.activity_level}
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: theme.colors.whiteText,
                                fontSize: theme.fontSizes.largeParagraph
                            }}
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

                        </select>
                    </Button>
                    <Button
                        style={{
                            border: 'none'
                        }}
                    >
                        <SettingInput
                            placeholder={'Your goal'}
                            onChange={(e) => {
                                setUserData((prevState) => ({
                                    ...prevState,
                                    goal: e.target.value
                                }));
                                setIsDataChanged(true);
                            }}
                            value={userData.goal}
                        />
                    </Button>
                </ButtonsGroup>
                <DivideLine />

                {/* Other */}
                <ButtonsGroup
                    style={{
                        marginBottom: '20px'
                    }}
                >
                    <Button
                        style={{
                            justifyContent: 'center'
                        }}
                    >
                        <div>
                            <p
                                style={{
                                    fontSize: theme.fontSizes.largeParagraph,
                                    fontWeight: theme.fontWeights.largeHeader,
                                    color: theme.colors.whiteText,
                                    margin: 0,
                                    padding: 0
                                }}
                            >
                                Support
                            </p>
                        </div>
                    </Button>
                    <Button
                        style={{
                            justifyContent: 'center'
                        }}
                    >
                        <div>
                            <p
                                style={{
                                    fontSize: theme.fontSizes.largeParagraph,
                                    fontWeight: theme.fontWeights.largeHeader,
                                    color: theme.colors.whiteText,
                                    margin: 0,
                                    padding: 0
                                }}
                            >
                                Web-site
                            </p>
                        </div>
                    </Button>
                    <Button
                        style={{
                            justifyContent: 'center',
                            border: 'none'

                        }}
                    >
                        <div>
                            <p
                                style={{
                                    fontSize: theme.fontSizes.largeParagraph,
                                    fontWeight: theme.fontWeights.largeHeader,
                                    color: theme.colors.whiteText,
                                    margin: 0,
                                    padding: 0
                                }}
                            >
                                Share
                            </p>
                        </div>
                    </Button>

                </ButtonsGroup>
                <DivideLine />

                {/* Danger zone */}
                <ButtonsGroup
                    style={{
                        marginBottom: '20px'
                    }}
                >
                    <Button
                        style={{
                            justifyContent: 'center'
                        }}

                        onClick={logOut}
                    >
                        <div>
                            <p
                                style={{
                                    fontSize: theme.fontSizes.largeParagraph,
                                    fontWeight: theme.fontWeights.largeHeader,
                                    color: theme.colors.whiteText,
                                    margin: 0,
                                    padding: 0
                                }}
                            >
                                Log out
                            </p>
                        </div>
                    </Button>
                    <Button
                        style={{
                            justifyContent: 'center',
                            border: 'none'
                        }}

                        onClick={deleteAccount}
                    >
                        <div>
                            <p
                                style={{
                                    fontSize: theme.fontSizes.largeParagraph,
                                    fontWeight: theme.fontWeights.largeHeader,
                                    color: 'red',
                                    margin: 0,
                                    padding: 0
                                }}
                            >
                                Delete account
                            </p>
                        </div>
                    </Button>
                </ButtonsGroup>
            </div>
        </SettingScreen>
    )
}

export default Settings;