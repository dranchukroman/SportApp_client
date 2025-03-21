import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import theme from './styles/theme';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './screens/LoginPage/LoginPage';
import MainScreen from './screens/MainScreen/MainScreen';
import UserProfileCreation from './screens/UserProfileCreation/UserProfileCreation'

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.$bgColor};
`;

// Clean code and use templates

function App() {
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
                <MainScreen />
              </PageWithBackground>
            }
          />
          <Route
            path='/login'
            element={
              <PageWithBackground $bgColor="#181818">
                <LoginPage />
              </PageWithBackground>
            }
          />
          <Route
            path='/registration'
            element={
              <PageWithBackground $bgColor="#181818">
                <LoginPage />
              </PageWithBackground>
            }
          />
          <Route
            path='/createProfile'
            element={
              <PageWithBackground $bgColor="#181818">
                <UserProfileCreation />
              </PageWithBackground>
            }
          />
        </Routes>
      </Router>
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