import React, { useState } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import theme from './styles/theme';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './screens/LoginPage/LoginPage';
import MainScreen from './screens/MainScreen/MainScreen';
import UserProfileCreation from './screens/UserProfileCreation/UserProfileCreation'
import ErrorToast from './components/popUps/ErrorToast';
import ModalPopUp from './components/popUps/ModalPopUp/ModalPopUp';

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.$bgColor};
`;

function App() {
  const [errorMessage, setErrorMessage] = useState('');
  const [modalParams, setModalParams] = useState({
    mainText: 'Set up PopUp text',
    btn1Text: 'Set null to delete',
    btn2Text: 'Set null to delete',
    btn3Text: 'Set null to delete',
    btn1Color: null,
    btn2Color: null,
    btn3Color: null,
    btn1Method: null,
    btn2Method: null,
    btn3Method: null,
    isVisible: false,
  })

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route
            path='/'
            element={<Navigate to='/dashboard' replace />}
          />
          <Route
            path='/dashboard'
            element={
              <PageWithBackground $bgColor='#EEE'>
                <MainScreen setErrorMessage={setErrorMessage} setModalParams={setModalParams} />
              </PageWithBackground>
            }
          />
          <Route
            path='/login'
            element={
              <PageWithBackground $bgColor="#181818">
                <LoginPage setErrorMessage={setErrorMessage} />
              </PageWithBackground>
            }
          />
          <Route
            path='/registration'
            element={
              <PageWithBackground $bgColor="#181818">
                <LoginPage setErrorMessage={setErrorMessage} />
              </PageWithBackground>
            }
          />
          <Route
            path='/createProfile'
            element={
              <PageWithBackground $bgColor="#181818">
                <UserProfileCreation setErrorMessage={setErrorMessage} />
              </PageWithBackground>
            }
          />
        </Routes>
      </Router>
      <ErrorToast message={errorMessage} setErrorMessage={setErrorMessage}/>
      <ModalPopUp modalParams={modalParams}/>
    </ThemeProvider>
  );
}

const PageWithBackground = ({ $bgColor, children }) => {
  return (
    <PageWrapper $bgColor={$bgColor}>
      {children}
    </PageWrapper>
  );
};

export default App;