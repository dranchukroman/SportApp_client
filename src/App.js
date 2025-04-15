import React, { useState } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import theme from './styles/theme';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './screens/LoginPage/LoginPage';
import MainScreen from './screens/MainScreen/MainScreen';
import UserProfileCreation from './screens/UserProfileCreation/UserProfileCreation'
import { Toaster } from 'sonner';
import ModalPopUp from './components/ModalPopUp/ModalPopUp';
import LoaderPage from './components/Loaders/LoaderPage/LoaderPage';

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.$bgColor};
`;

function App() {
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
  const [pageLoading,] = useState(false);

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
                <MainScreen setModalParams={setModalParams} />
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
      <Toaster richColors position="bottom-center"/>
      <ModalPopUp modalParams={modalParams}/>
      <LoaderPage isActive={pageLoading}/>
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