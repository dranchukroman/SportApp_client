const getPageTitles = (userName) => {
    return {
        Dashboard: `Hi, ${userName || 'Friend'}`,
        Trainings: 'Trainings',
        TrainingPlanDetails: 'New training plan',
        TrainingDaysView: 'Set up training days',
        TrainingDaysDetails: 'Set up training days',
        ExercisesView: 'Set up exercises',
        ExerciseDetails: 'Set up exercise',
        Exercising: 'Training',
        Diet: 'Diet',
        Calculator: 'Calculator'
    }
};

export default getPageTitles