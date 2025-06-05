import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import theme from './styles/theme';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './screens/LoginPage/LoginPage';
import MainScreen from './screens/MainScreen/MainScreen';
import UserProfileCreation from './screens/UserProfileCreation/UserProfileCreation'
import { Toaster } from 'sonner';
import ModalPopUp from './components/ModalPopUp/ModalPopUp';
import LoaderPage from './components/Loaders/LoaderPage/LoaderPage';
import { getMobileOS, getBrowserName } from './utils/usePwaTool';
import Download from './screens/downloadPWA/Download';

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.$bgColor};
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
`;

function App() {
  //Function to make user use PWA on mobile
  const navigate = useNavigate();
  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isStandaloneIOS = window.navigator.standalone === true;
    const mobileOS = getMobileOS();

    const isMobile = mobileOS === 'Android' || mobileOS === 'iOS';

    if (isMobile && !(isStandalone || isStandaloneIOS)) {
      const browser = getBrowserName();

      // Передамо info в query, щоб показати браузер в інструкції
      if (mobileOS) {
        navigate(`/download?browser=${browser}&mobileOS=${mobileOS}`, { replace: true });
      } else {
        // Для невідомих ОС, можливо, загальна сторінка
        navigate(`/download`, { replace: true });
      }
    }

  }, [navigate])


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
        <Route
          path='/download'
          element={
            <PageWithBackground $bgColor="#181818">
              <Download />
            </PageWithBackground>
          }
        />
      </Routes>
      <Toaster richColors position="bottom-center" />
      <ModalPopUp modalParams={modalParams} />
      <LoaderPage isActive={pageLoading} />
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