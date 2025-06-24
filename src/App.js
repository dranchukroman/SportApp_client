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
import Dashboard from './screens/MainScreen/views/Dashboard/Dashboard';
import TrainingPlansView from './screens/MainScreen/views/Trainings/TrainingPlansView';
import Diet from './screens/MainScreen/views/Diet/Diet';
import Calculator from './screens/MainScreen/views/Calculator/Calculator';
import TrainingPlanDetails from './screens/MainScreen/views/Trainings/TrainingPlanDetails';
import TrainingDaysView from './screens/MainScreen/views/Trainings/TrainingDaysView';
import TrainingDaysDetails from './screens/MainScreen/views/Trainings/TrainingDaysDetails';
import ExerciseDetails from './screens/MainScreen/views/Trainings/ExerciseDetails/ExerciseDetails';
import ExercisesView from './screens/MainScreen/views/Trainings/ExercisesView';
import Exercising from './screens/MainScreen/views/Trainings/Exercising/Exercising';
import ExercisingHistory from './screens/MainScreen/views/Trainings/ExercisingHistory';
import NotFound from './screens/MainScreen/views/NotFound/NotFound';
import TrainingsLayout from './screens/MainScreen/views/Trainings/TrainingLayout';

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
					{/* --- Публічні та сервісні роути --- */}
					{/* Ці роути не мають спільної оболонки MainScreen */}
					<Route path="/login" element={<PageWithBackground $bgColor={theme.colors.darkBackground}><LoginPage /></PageWithBackground>} />
					<Route path="/registration" element={<PageWithBackground $bgColor={theme.colors.darkBackground}><LoginPage /></PageWithBackground>} />
					<Route path="/createProfile" element={<PageWithBackground $bgColor={theme.colors.darkBackground}><UserProfileCreation /></PageWithBackground>} />
					<Route path="/download" element={<PageWithBackground $bgColor={theme.colors.darkBackground}><Download /></PageWithBackground>} />

					{/* --- Основний додаток (для авторизованих користувачів) --- */}
					{/* Всі ці роути будуть рендеритись всередині <MainScreen> */}
					<Route element={<PageWithBackground $bgColor='#EEE'><MainScreen /></PageWithBackground>}>
						<Route path="/trainings" element={<TrainingsLayout />}>
							{/* Редірект, щоб /trainings вів на список планів */}
							<Route index element={<Navigate to="plans" replace />} />
							{/* Роути тренувань */}
							<Route path="plans" element={<TrainingPlansView />} />
							<Route path="plans/new" element={<TrainingPlanDetails />} />
							<Route path="plans/:planId/edit" element={<TrainingPlanDetails />} />
							<Route path="plans/:planId/days" element={<TrainingDaysView />} />
							<Route path="plans/:planId/days/new" element={<TrainingDaysDetails />} />
							<Route path="days/:dayId/edit" element={<TrainingDaysDetails />} />
							<Route path="days/:dayId/exercises" element={<ExercisesView />} />
							<Route path="days/:dayId/exercises/new" element={<ExerciseDetails />} />
							<Route path="exercises/:exerciseId/edit" element={<ExerciseDetails />} />
							<Route path="exercises/:exerciseId/history" element={<ExercisingHistory />} />
							<Route path="workout/:exerciseId" element={<Exercising />} />
						</Route>

						{/* Головний роут та редірект з кореня */}
						<Route path="/" element={<Navigate to="/dashboard" replace />} />
						<Route path="/dashboard" element={<Dashboard />} />

						{/* Інші роути основного додатку */}
						<Route path="/diet" element={<Diet />} />
						<Route path="/calculator" element={<Calculator />} />

						{/* Роут для неіснуючих сторінок всередині основного додатку */}
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
				<Toaster richColors position="bottom-center" />
				<ModalPopUp />
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