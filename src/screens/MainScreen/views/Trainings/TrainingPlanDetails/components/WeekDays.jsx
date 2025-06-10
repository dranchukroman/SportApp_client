import React from "react";
import { TrainingDaysWrapper } from "../TrainingPlanDetails.styled";
import TextCheckBox from "./TextCheckBox";

function WeekDays({ activeWeekDays, onWeekDayClick }) {
    const weekDaysList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return (
        <TrainingDaysWrapper>
            {weekDaysList.map((day) => (
                <TextCheckBox
                    key={day}
                    isActive={activeWeekDays.includes(day)}
                    onClick={() => onWeekDayClick(day)}
                >
                    {day}
                </TextCheckBox>
            ))}
        </TrainingDaysWrapper>
    )
}

export default WeekDays;