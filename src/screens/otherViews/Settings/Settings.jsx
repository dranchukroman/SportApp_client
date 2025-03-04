import React from "react";
import axios from "axios";

import { SettingScreen, ButtonsGroup, Button } from "./Settings.styled";
import theme from "../../../styles/theme";
import DivideLine from "../../../components/Dividers/DivideLine";


function Settings (){
    async function deleteAccount(){
        const token = localStorage.getItem('authToken');

        if(!token){
            console.log('Profile can\'t be deleted, because auth token doesn\'t exist');
            localStorage.removeItem('authToken');
            window.location.href = '/login';
            return;
        }

        const user = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/protected`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if(!user){
            console.log('Something went wrong login one more time');
            localStorage.removeItem('authToken');
            window.location.href = '/login';
            return;
        }

        const deleteResponse = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/delete`, { user });

        console.log(deleteResponse);

        if(deleteResponse.status){
            localStorage.removeItem('authToken');
            window.location.href = '/login';
            return;
        }
    }

    async function logOut(){
        if(localStorage.getItem('authToken')){
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        }
    }

    async function setPersonalInformation(){

    }

    async function share(){

    }


    return (
        <SettingScreen>

            {/* Persolnal information */}
            <ButtonsGroup>
                <Button>
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
                            Age
                        </p>
                    </div>  
                    <div>
                        <p
                            style={{
                                fontSize: theme.fontSizes.largeParagraph,
                                fontWeight: theme.fontWeights.largeHeader,
                                color: theme.colors.whiteText,
                                margin: 0,
                                padding: 0,
                                paddingRight: '15px'
                            }}
                        >
                            19 20 21 Years
                        </p>
                    </div>                      
                </Button>
                <Button>
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
                            Height
                        </p>
                    </div>  
                    <div>
                        <p
                            style={{
                                fontSize: theme.fontSizes.largeParagraph,
                                fontWeight: theme.fontWeights.largeHeader,
                                color: theme.colors.whiteText,
                                margin: 0,
                                padding: 0,
                                paddingRight: '15px'
                            }}
                        >
                            174 175 176 Cm
                        </p>
                    </div>                      
                </Button>
                <Button
                    style={{
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
                            Weight
                        </p>
                    </div>  
                    <div>
                        <p
                            style={{
                                fontSize: theme.fontSizes.largeParagraph,
                                fontWeight: theme.fontWeights.largeHeader,
                                color: theme.colors.whiteText,
                                margin: 0,
                                padding: 0,
                                paddingRight: '15px'
                            }}
                        >
                            74 75 76 Kg
                        </p>
                    </div>                      
                </Button>
            </ButtonsGroup>
            <DivideLine/>

            {/* Other information */}
            <ButtonsGroup>
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
            <DivideLine/>

            
            {/* Danger zone */}
            <ButtonsGroup>
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
                                color: theme.colors.whiteText,
                                margin: 0,
                                padding: 0
                            }}
                        >
                            Delete account
                        </p>
                    </div>                   
                </Button>
            </ButtonsGroup>


        </SettingScreen>
    )

}

export default Settings;