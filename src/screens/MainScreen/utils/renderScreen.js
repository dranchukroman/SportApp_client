// Maing pages/views
import Dashboard from '../views/Dashboard/Dashboard.jsx';
import Diet from '../views/Diet/Diet.jsx';
import Calculator from '../views/Calculator/Calculator.jsx';
import NotFound from '../views/NotFound/NotFound.jsx';

// Trainings
import TrainingPlansView from '../views/Trainings/TrainingPlansView/';
import TrainingPlanDetails from '../views/Trainings/TrainingPlanDetails/';
import TrainingDaysView from '../views/Trainings/TrainingDaysView/';
import TrainingDaysDetails from '../views/Trainings/TrainingDaysDetails/TrainingDaysDetails.jsx';
import ExercisesView from '../views/Trainings/ExercisesView/ExercisesView.jsx';
import ExerciseDetails from '../views/Trainings/ExerciseDetails/ExerciseDetails.jsx';
import Exercising from '../views/Trainings/Exercising/Exercising.jsx';
import ExercisingHistory from '../views/Trainings/ExercisingHistory/index.jsx';


const renderScreen = ({
    currentScreen,
    setCurrentScreen,
    trainingPlans,
    setControllTrainings,
    editModeStatus,
    setEditModeStatus,
    controllTrainings,
    setExercisingStatus,
    exercisingStatus,
    setModalParams,
    setTrainingProgress,
    trainingProgress,
    setLoader,    
  }) => {
    switch (currentScreen) {
        case 'Dashboard':
            return <Dashboard onScreenChange={setCurrentScreen} trainingPlans={trainingPlans} setControllTrainings={setControllTrainings}/>
        case 'Trainings':
            return <TrainingPlansView onScreenChange={setCurrentScreen} setControllTrainings={setControllTrainings} editModeStatus={editModeStatus} setEditModeStatus={setEditModeStatus}/>
        case 'TrainingPlanDetails':
            return <TrainingPlanDetails onScreenChange={setCurrentScreen} setControllTrainings={setControllTrainings} editModeStatus={editModeStatus} trainingPlanId={controllTrainings.trainingPlanId} />
        case 'TrainingDaysView':
            return <TrainingDaysView onScreenChange={setCurrentScreen} trainingPlanId={controllTrainings.trainingPlanId} editModeStatus={editModeStatus} setControllTrainings={setControllTrainings} setExercisingStatus={setExercisingStatus} />
        case 'TrainingDaysDetails':
            return <TrainingDaysDetails onScreenChange={setCurrentScreen} trainingPlanId={controllTrainings.trainingPlanId} trainingDayId={controllTrainings.trainingDayId} editModeStatus={editModeStatus} />
        case 'ExercisesView':
            return <ExercisesView onScreenChange={setCurrentScreen} trainingDayId={controllTrainings.trainingDayId} trainingPlanId={controllTrainings.trainingPlanId} setControllTrainings={setControllTrainings} editModeStatus={editModeStatus} exercisingStatus={exercisingStatus} setModalParams={setModalParams} setExercisingStatus={setExercisingStatus} setTrainingProgress={setTrainingProgress} trainingProgress={trainingProgress}/>
        case 'ExerciseDetails':
            return <ExerciseDetails onScreenChange={setCurrentScreen} trainingDayId={controllTrainings.trainingDayId} trainingExerciseId={controllTrainings.trainingExerciseId} editModeStatus={editModeStatus} />
        case 'Exercising':
            return <Exercising onScreenChange={setCurrentScreen} trainingExerciseId={controllTrainings.trainingExerciseId} setTrainingProgress={setTrainingProgress} trainingProgress={trainingProgress} trainingPlanId={controllTrainings.trainingPlanId} trainingDayId={controllTrainings.trainingDayId} />
        case 'ExercisingHistory':
            return <ExercisingHistory exerciseId={controllTrainings.trainingExerciseId} onScreenChange={setCurrentScreen}/>
        case 'Diet':
            return <Diet onScreenChange={setCurrentScreen} />
        case 'Calculator':
            return <Calculator onScreenChange={setCurrentScreen} />
        default:
            return <NotFound onScreenChange={setCurrentScreen} />
    }
}

export default renderScreen;