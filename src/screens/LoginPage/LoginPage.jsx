import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyledLoginPage, LoginPageContainer } from './LoginPage.styled'

import Headeing from '../../components/Headings/Heading';
import Input from '../../components/Inputs/Input';
import Button from '../../components/Buttons/Button';
import GoogleIcon from '../../assets/icons/LoginPage/google';

function LoginPage(){
    // Redirect if authToken exist
    if(localStorage.getItem('authToken')){
        window.location.href = '/dashboard';
    }

    const [email, setEmail] = useState('test2');
    const [password, setPassword] = useState('test2');
    const [password2, setPassword2] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isRegistration, setIsRegistration] = useState(false);

    useEffect(() => {
        const userLocation = window.location.href;
        if (userLocation.includes('/registration')) {
            setIsRegistration(true);
        } else {
            setIsRegistration(false);
        }
    }, []);

    const handleLogin = async () =>{
        try {
            // Check if email and password exist
            if(email !== '' && password !== ''){
                // const response = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/login`, { email, password });
                const response = await axios.post(`https://sportappserver-production.up.railway.app/api/login`, { email, password });

                // Check if token exist
                if(response?.data.token){
                    localStorage.setItem('authToken', response.data.token);
                    window.location.href = '/dashboard'
                } else{
                    setErrorMessage(response.data.message);
                }
            } else{
                setErrorMessage(`Email and password are required`);
            }
        } catch (error) {
            console.log(`Error during login: `, error);
            setErrorMessage(error.response?.data?.message);
        }
    }

    const handleRegistration = async () =>{
        try {
            // Check if email and password exist
            if(email !== '' && password !== ''){       
                if(password !== '' && password2 !== '' && password === password2){
                    // const registerResponse = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/register`, { email, password });
                    const registerResponse = await axios.post(`https://sportappserver-production.up.railway.app/api/register`, { email, password });

            
                    // Check status code
                    if(registerResponse.status === 201){
                        try {
                            const loginResponse = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/login`, { email, password });
    
                            if(loginResponse?.data.token){
                                localStorage.setItem('authToken', loginResponse.data.token);
                                window.location.href = '/dashboard'
                            } else{
                                window.location.href = '/login'
                                setErrorMessage(loginResponse.data.message);
                            }
                        } catch (error) {
                            window.location.href = '/login'
                            setErrorMessage(`Try to login again`);
                        }
                    } else{
                        setErrorMessage(registerResponse.data.message);
                    }
                } else{
                    setErrorMessage(`Passwords in both fields should be the same`);
                }
            } else{
                setErrorMessage(`Email and password are required`);
            }
        } catch (error) {
            console.log(`Error during registration: `, error);
            setErrorMessage(error.response?.data?.message);
        }
    };

    const logInByGoogle = async () => {
        console.log(process.env.REACT_APP_SERVER_LINK);
        console.log('Hello')
    }

    // Change text and redirect for button below login form
    function LoginOrRegistrationButton(){
        const [button, setButtonText] = useState(null);
      
        // Change based on user location
        useEffect(() => {
          const userLocation = window.location.href;
      
          if (userLocation.includes('/login')) {
            setButtonText({
                text: "Log In",
                loginMethod: handleLogin
            })
          } else if (userLocation.includes('/registration')) {
            setButtonText({
                text: 'Sing Up',
                loginMethod: handleRegistration
            })
          } else {
            setButtonText({
                text: 'Log In',
                loginMethod: handleLogin
            })
          }
        }, []);
      
        // Check if button exist
        if (!button) return null;
      
        // Return changed button
        return (
            <Button
                onClick={button.loginMethod}
            >
                {button.text}
            </Button>
        );
    }

    // Change info below login buttons 
    function LoginOrRegistrationLink() {
        const [link, setLink] = useState(null);
      
        // Change based on location
        useEffect(() => {
          const userLocation = window.location.href;
      
          if (userLocation.includes('/login')) {
            setLink({
              href: '/registration',
              text: "Don't have an account yet? Click here",
            });
          } else if (userLocation.includes('/registration')) {
            setLink({
              href: '/login',
              text: 'Do you already have an account? Click here',
            });
          } else {
            setLink({
              href: '/login',
              text: 'Click here if you want to log in',
            });
          }
        }, []);
      
        // Check if link exist
        if (!link) return null;
      
        // Retunr formated link
        return (
            <a 
            href={link.href}
            style={{
                borderBottom: 'white'
            }}
            >
                <p>{link.text}</p>
            </a>
        );
    }

    return (
        <LoginPageContainer>
            <StyledLoginPage>
                {/* App name */}
                <Headeing>
                    Sport App
                </Headeing>
                {/* Description for motivation */}
                <p>
                    Dream big, work hard, stay focused.
                </p>

                {/* Email input */}
                <Input 
                    placeholder='Email'
                    value={email}
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        margin: '100px 0 10px 0'
                    }}
                />
                    
                {/* Password input */}
                <Input
                    className='password1'
                    placeholder='Password'
                    value={password}
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        marginBottom: '10px'
                    }}
                />
                

                {/* Repeat Password input for registration */}
                {isRegistration && (
                    <Input
                        className='password2'
                        placeholder='Repeat password'
                        value={password2}
                        type='password'
                        onChange={(e) => setPassword2(e.target.value)}
                        style={{
                            marginBottom: '10px'
                        }}
                    />
                )}
                
                {/* Button with margin for login or registration */}
                <div
                    style={{
                        marginBottom: '20px'
                    }}
                >
                    <LoginOrRegistrationButton/>
                </div>

                {/* Login by Google button */}
                <Button
                    // style={{display: 'none'}}
                    onClick={logInByGoogle}
                >
                    <div 
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            width: '100%',
                        }}
                    >
                        <div 
                            style={{
                                position: 'absolute',
                                left: '29px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <GoogleIcon />
                        </div>
                        <p 
                            style={{ 
                                margin: 0 
                            }}
                        >
                            Log in by Google
                        </p>
                    </div>
                </Button>

                {/* Formated info link */}
                <LoginOrRegistrationLink />

                {/* Error message if exist */}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </StyledLoginPage>
        </LoginPageContainer>
    );
}

export default LoginPage;