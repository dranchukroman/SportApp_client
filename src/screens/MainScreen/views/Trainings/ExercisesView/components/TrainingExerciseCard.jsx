import React from "react";
import { CardDeleteIcon, CardEditIcon, FormattedCard, ExerciseDataWrapper, ExerciseHeader, ExerciseParagraph } from "../ExercisesView.styled";


function TrainingExerciseCard({ exerciseData, onSelect, onEdit, onDelete }) {
    const { day_exercise_id, exercise_name, reps, weight, sets, rest_time, description } = exerciseData;
    return (
        <FormattedCard onClick={() => onSelect(day_exercise_id)}>
            <ExerciseDataWrapper>
                <ExerciseHeader>{exercise_name}</ExerciseHeader>
                {reps &&
                    <ExerciseParagraph>
                        Reps - {reps}
                    </ExerciseParagraph>}
                {weight &&
                    <ExerciseParagraph>
                        Weight - {weight}
                    </ExerciseParagraph>}
                {sets &&
                    <ExerciseParagraph>
                        Sets - {sets}
                    </ExerciseParagraph>}
                {rest_time &&
                    <ExerciseParagraph>
                        Rest - {rest_time}
                    </ExerciseParagraph>}
                {description &&
                    <ExerciseParagraph>
                        Description - {description}
                    </ExerciseParagraph>}
            </ExerciseDataWrapper>
            {!!onEdit && <CardEditIcon
                onClick={(e) => {
                    e.stopPropagation();
                    onEdit(day_exercise_id);
                }}
            />}
            {!!onDelete && <CardDeleteIcon
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(day_exercise_id);
                }}
            />}
        </FormattedCard>
    )
}

export default TrainingExerciseCard;