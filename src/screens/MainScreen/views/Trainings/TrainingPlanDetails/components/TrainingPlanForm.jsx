import React from "react";
import PageWrapper from "../../../../../../components/layout/PageWrapper/PageWrapper";
import { ViewHeading, ViewInput, IsCurrentPlanSection, Paragraph } from "../TrainingPlanDetails.styled";
import WeekDays from "./WeekDays";
import CheckBox from "../../../../../../components/Inputs/CheckBoxes/CheckBox";
import ControlButtonsGroup from "../../../../../../components/ui/ControllButtonsGroup/ControlButtonsGroup";

function TrainingPlanForm({ formData, onInput, onCheckBox, onSubmit, onBack, onWeekDayClick, isEditing, isSubmitting }) {
    const { name, description, is_current_plan, days_per_week } = formData;
    return (
        <PageWrapper>
            <ViewHeading>Training plan details</ViewHeading>
            <ViewInput
                name='name'
                placeholder={'Plan name'}
                value={name}
                onChange={(e) => onInput(e.target.name, e.target.value)}
            />
            <ViewInput
                name='name'
                placeholder={'Description'}
                value={description}
                onChange={(e) => onInput(e.target.name, e.target.value)}
            />

            <ViewHeading>Training days</ViewHeading>
            <WeekDays activeWeekDays={days_per_week} onWeekDayClick={onWeekDayClick} />

            <ViewHeading>Current training plan</ViewHeading>
            <IsCurrentPlanSection>
                <Paragraph>You will see your training plan on dashboard</Paragraph>
                <CheckBox
                    active={is_current_plan}
                    onClick={() => onCheckBox('is_current_plan')}
                />
            </IsCurrentPlanSection>

            <ControlButtonsGroup
                firstButtonText={'Back'}
                onFirstButtonClick={onBack}
                secondButtonText={isEditing ? 'Save' : 'Next'}
                onSecondButtonClick={isSubmitting ? null : onSubmit}
            />
        </PageWrapper>
    )
}

export default TrainingPlanForm;