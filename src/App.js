import React, { useEffect } from 'react';
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
import { getMobileOS, getBrowserName } from './utils/deviceUtils';
import Download from './screens/downloadPWA/Download';
import AppProvider from './providers/AppProvider';

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

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppProvider>
        <Routes>
          <Route
            path='/'
            element={<Navigate to='/dashboard' replace />}
          />
          <Route
            path='/dashboard'
            element={
              <PageWithBackground $bgColor='#EEE'>
                <MainScreen/>
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
        <ModalPopUp/>
      </AppProvider>
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

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.$bgColor};
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
`;

export default App;