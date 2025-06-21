import React, { useState, useEffect} from "react";
import { toast } from 'sonner';

import { SettingScreen, ButtonsGroup, Button, SettingInput } from "./Settings.styled";
import theme from "../../../../styles/theme";
import DivideLine from "../../../../components/Dividers/DivideLine";
import { useAuth } from "../../../../providers/AuthProvider";


function Settings({ formData, setFormData, visiblePartOfScreen, setIsDataChanged }) {

    const { user, logout, deleteAccount } = useAuth();


    // Додаємо useEffect, щоб оновити форму, якщо глобальний user зміниться
    useEffect(() => {
        setFormData(user);
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setIsDataChanged(true);
    };

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
                            onChange={(e) => handleInputChange(e)}
                            name="first_name"
                            value={formData.first_name}

                        />
                    </Button>
                    <Button>
                        <SettingInput
                            placeholder={'Surname'}
                            onChange={(e) => handleInputChange(e)}
                            name="last_name"
                            value={formData.last_name}

                        />
                    </Button>
                    <Button>
                        <SettingInput
                            placeholder={'Height'}
                            onChange={(e) => handleInputChange(e)}
                            name="height"
                            value={formData.height}
                            type="number"
                        />
                    </Button>
                    <Button>
                        <SettingInput
                            placeholder={'Weight'}
                            onChange={(e) => handleInputChange(e)}
                            name="weight"
                            value={formData.weight}
                            type="number"
                        />
                    </Button>
                    <Button>
                        <SettingInput
                            placeholder={'Age'}
                            onChange={(e) => handleInputChange(e)}
                            name="age"
                            value={formData.age}
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
                            onChange={(e) => handleInputChange(e)}
                            name="gender"
                            value={formData.gender}
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
                            onChange={(e) => handleInputChange(e)}
                            name="activity_level"
                            value={formData.activity_level}
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
                            onChange={(e) => handleInputChange(e)}
                            name="goal"
                            value={formData.goal}
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

                        onClick={logout}
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