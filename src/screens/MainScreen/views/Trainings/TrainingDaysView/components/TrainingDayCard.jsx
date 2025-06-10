import React from "react";
import { CardDeleteIcon, CardEditIcon, FormatedCard, Paragraph, CardHeading } from "../TrainingDaysView.styled";

function TrainingDayCard({ dayData, onSelect, onEdit, onDelete }) {
    const { day_id, name, description } = dayData;
    return (
        <FormatedCard onClick={() => onSelect(day_id)}>
            <CardHeading>{name}</CardHeading>
            <Paragraph>{description}</Paragraph>
            {!!onEdit && <CardEditIcon
                onClick={(e) => {
                    e.stopPropagation();
                    onEdit(day_id);
                }}
            />}
            {!!onDelete && <CardDeleteIcon
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(day_id);
                }}
            />}
        </FormatedCard>
    )
}

export default TrainingDayCard;

