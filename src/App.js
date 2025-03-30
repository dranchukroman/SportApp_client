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

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.$bgColor};
`;

function App() {
  const [errorMessage, setErrorMessage] = useState('');

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
                <MainScreen setErrorMessage={setErrorMessage} />
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