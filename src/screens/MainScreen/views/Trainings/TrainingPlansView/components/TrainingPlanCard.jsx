import React from "react";
import { CardDeleteIcon, CardEditIcon, FormatedCard, Paragraph, CardHeading } from "../TrainingPlansView.styled";

function TrainingPlanCard({ planData, onSelect, onEdit, onDelete }) {
    const { plan_id, name, description } = planData
    return (
        <FormatedCard onClick={() => onSelect(plan_id)}>
            <CardHeading>{name}</CardHeading>
            <Paragraph>{description}</Paragraph>
            {!!onEdit && <CardEditIcon
                onClick={(e) => {
                    e.stopPropagation();
                    onEdit(plan_id);
                }}
            />}
            {!!onDelete && <CardDeleteIcon
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(plan_id);
                }}
            />}
        </FormatedCard>
    )
}

export default TrainingPlanCard;