import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyledLoginPage, LoginPageContainer } from './LoginPage.styled'

import Headeing from '../../components/Headings/Heading';
import Input from '../../components/Inputs/Input';
import Button from '../../components/Buttons/Button';
import GoogleIcon from '../../assets/icons/LoginPage/google';
import ErrorToast from '../../components/popUps/ErrorToast'

function LoginPage(){
    const token = localStorage.getItem('authToken') || '';
    sessionStorage.removeItem('userView');

    
    useEffect(() => {
        const checkIfTokenValid = async () => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/api/checkToken`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status === 200){
                window.location.href = '/dashboard';
            }
        }
        if(token !== '') checkIfTokenValid()
    }, [token]);

    const [email, setEmail] = useState('test21');
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
            if(email !== '' && password !== ''){
                const response = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/login`, { email, password });

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
            if(email !== '' && password !== ''){       
                if(password !== '' && password2 !== '' && password === password2){
                    const registerResponse = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/register`, { email, password });
            
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
    }

    function LoginOrRegistrationButton(){
        const [button, setButtonText] = useState(null);
      
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
      
        if (!button) return null;
      
        return (
            <Button
                onClick={button.loginMethod}
            >
                {button.text}
            </Button>
        );
    }

    function LoginOrRegistrationLink() {
        const [link, setLink] = useState(null);
      
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
      
        if (!link) return null;
      
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
                <Headeing>
                    Sport App
                </Headeing>
                <p>
                    Dream big, work hard, stay focused.
                </p>

                <Input 
                    placeholder='Email'
                    value={email}
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        margin: '100px 0 10px 0'
                    }}
                />
                    
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

                <div style={{ marginBottom: '20px' }}>
                    <LoginOrRegistrationButton/>
                </div>

                <Button style={{display: 'none'}} onClick={logInByGoogle}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        width: '100%',
                    }}>
                        <div style={{
                            position: 'absolute',
                            left: '29px',
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <GoogleIcon />
                        </div>
                        <p style={{ margin: 0 }}>Log in by Google</p>
                    </div>
                </Button>

                <LoginOrRegistrationLink />

                <ErrorToast message={errorMessage} setErrorMessage={setErrorMessage}/>
            </StyledLoginPage>
        </LoginPageContainer>
    );
}

export default LoginPage;
