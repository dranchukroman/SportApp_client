import React from "react";
import { CardDeleteIcon, CardEditIcon, FormatedCard, Paragraph } from "../TrainingPlansView.styled";
import theme from "../../../../../../styles/theme";
import Heading from "../../../../../../components/Headings/Heading";

function TrainingPlanCard({ planData, onSelect, onEdit, onDelete }) {
    const { plan_id, name, description } = planData
    return (
        <FormatedCard onClick={() => onSelect(plan_id)}>
            <Heading fontSize={theme.fontSizes.smallHeader}>{name}</Heading>
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