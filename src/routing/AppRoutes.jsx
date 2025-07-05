import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../screens/LoginPage/LoginPage';
import UserProfileCreation from '../screens/UserProfileCreation/UserProfileCreation';
import Download from '../screens/downloadPWA/Download';
import MainScreen from '../screens/MainScreen/MainScreen';
import TrainingsLayout from '../screens/MainScreen/views/Trainings/TrainingLayout';
import TrainingPlansView from '../screens/MainScreen/views/Trainings/TrainingPlansView';
import TrainingPlanDetails from '../screens/MainScreen/views/Trainings/TrainingPlanDetails';
import TrainingDaysView from '../screens/MainScreen/views/Trainings/TrainingDaysView';
import TrainingDaysDetails from '../screens/MainScreen/views/Trainings/TrainingDaysDetails';
import ExercisesView from '../screens/MainScreen/views/Trainings/ExercisesView';
import ExerciseDetails from '../screens/MainScreen/views/Trainings/ExerciseDetails/ExerciseDetails';
import Exercising from '../screens/MainScreen/views/Trainings/Exercising/Exercising';
import ExercisingHistory from '../screens/MainScreen/views/Trainings/ExercisingHistory';
import NotFound from '../screens/MainScreen/views/NotFound/NotFound';
import Dashboard from '../screens/MainScreen/views/Dashboard/Dashboard';
import Diet from '../screens/MainScreen/views/Diet/Diet';
import Calculator from '../screens/MainScreen/views/Calculator/Calculator';
import PageWithBackground from '../components/layout/PageWithBackground';
import theme from '../styles/theme';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<PageWithBackground bgColor={theme.colors.darkBackground}><LoginPage /></PageWithBackground>} />
            <Route path="/registration" element={<PageWithBackground bgColor={theme.colors.darkBackground}><LoginPage /></PageWithBackground>} />
            <Route path="/createProfile" element={<PageWithBackground bgColor={theme.colors.darkBackground}><UserProfileCreation /></PageWithBackground>} />
            <Route path="/download" element={<PageWithBackground bgColor={theme.colors.darkBackground}><Download /></PageWithBackground>} />

            <Route element={<PageWithBackground bgColor='#EEE'><MainScreen /></PageWithBackground>}>
                <Route path="/trainings" element={<TrainingsLayout />}>
                    <Route index element={<Navigate to="plans" replace />} />
                    <Route path="plans" element={<TrainingPlansView />} />
                    <Route path="plans/new" element={<TrainingPlanDetails />} />
                    <Route path="plans/:planId/edit" element={<TrainingPlanDetails />} />
                    <Route path="plans/:planId/days" element={<TrainingDaysView />} />
                    <Route path="plans/:planId/days/new" element={<TrainingDaysDetails />} />
                    <Route path="plans/:planId/days/:dayId/edit" element={<TrainingDaysDetails />} />
                    <Route path="plans/:planId/days/:dayId/exercises/" element={<ExercisesView />} />
                    <Route path="plans/:planId/days/:dayId/exercises/new" element={<ExerciseDetails />} />
                    <Route path="plans/:planId/days/:dayId/exercises/:exerciseId/edit" element={<ExerciseDetails />} />
                    <Route path="exercises/:exerciseId/history" element={<ExercisingHistory />} />
                    <Route path="plans/:planId/days/:dayId/exercises/:exerciseId/workout" element={<Exercising />} />
                </Route>

                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/diet" element={<Diet />} />
                
                <Route path="/calculator" element={<Calculator />} />

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;