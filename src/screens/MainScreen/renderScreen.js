// Maing pages/views
import Dashboard from '../otherViews/Dashboard/Dashboard';
import Diet from '../otherViews/Diet/Diet';
import Calculator from '../otherViews/Calculator/Calculator';
import NotFound from '../otherViews/NotFound/NotFound';

// Trainings
import TrainingPlansView from '../otherViews/Trainings/TrainingPlansView/TrainingPlansView.jsx';
import TrainingPlanDetails from '../otherViews/Trainings/TrainingPlanDetails/TrainingPlanDetails.jsx';
import TrainingDaysView from '../otherViews/Trainings/TrainingDaysView/TrainingDaysView.jsx';
import TrainingDaysDetails from '../otherViews/Trainings/TrainingDaysDetails/TrainingDaysDetails.jsx';
import ExercisesView from '../otherViews/Trainings/ExercisesView/ExercisesView.jsx';
import ExerciseDetails from '../otherViews/Trainings/ExerciseDetails/ExerciseDetails.jsx';
import Exercising from '../otherViews/Trainings/Exercising/Exercising.jsx';


const renderScreen = ({
    currentScreen,
    setCurrentScreen,
    trainingPlans,
    token,
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
            return <Dashboard onScreenChange={setCurrentScreen} trainingPlans={trainingPlans} />
        case 'Trainings':
            return <TrainingPlansView token={token} onScreenChange={setCurrentScreen} setControllTrainings={setControllTrainings} editModeStatus={editModeStatus} setEditModeStatus={setEditModeStatus} setLoader={setLoader}/>
        case 'TrainingPlanDetails':
            return <TrainingPlanDetails token={token} onScreenChange={setCurrentScreen} setControllTrainings={setControllTrainings} editModeStatus={editModeStatus} trainingPlanId={controllTrainings.trainingPlanId} />
        case 'TrainingDaysView':
            return <TrainingDaysView token={token} onScreenChange={setCurrentScreen} trainingPlanId={controllTrainings.trainingPlanId} editModeStatus={editModeStatus} setControllTrainings={setControllTrainings} setExercisingStatus={setExercisingStatus} />
        case 'TrainingDaysDetails':
            return <TrainingDaysDetails token={token} onScreenChange={setCurrentScreen} trainingPlanId={controllTrainings.trainingPlanId} trainingDayId={controllTrainings.trainingDayId} editModeStatus={editModeStatus} />
        case 'ExercisesView':
            return <ExercisesView token={token} onScreenChange={setCurrentScreen} trainingDayId={controllTrainings.trainingDayId} trainingPlanId={controllTrainings.trainingPlanId} setControllTrainings={setControllTrainings} editModeStatus={editModeStatus} exercisingStatus={exercisingStatus} setModalParams={setModalParams} setExercisingStatus={setExercisingStatus} setTrainingProgress={setTrainingProgress} trainingProgress={trainingProgress}/>
        case 'ExerciseDetails':
            return <ExerciseDetails token={token} onScreenChange={setCurrentScreen} trainingDayId={controllTrainings.trainingDayId} trainingExerciseId={controllTrainings.trainingExerciseId} editModeStatus={editModeStatus} />
        case 'Exercising':
            return <Exercising token={token} onScreenChange={setCurrentScreen} trainingExerciseId={controllTrainings.trainingExerciseId} setTrainingProgress={setTrainingProgress} trainingProgress={trainingProgress} trainingPlanId={controllTrainings.trainingPlanId} trainingDayId={controllTrainings.trainingDayId} />
        case 'Diet':
            return <Diet token={token} onScreenChange={setCurrentScreen} />
        case 'Calculator':
            return <Calculator token={token} onScreenChange={setCurrentScreen} />
        default:
            return <NotFound onScreenChange={setCurrentScreen} />
    }
}

export default renderScreen;