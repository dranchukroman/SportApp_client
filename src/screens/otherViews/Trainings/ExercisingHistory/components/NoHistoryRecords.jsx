import React from "react";
import theme from "../../../../../styles/theme";
import Button from "../../../../../components/Buttons/Button";
import { NoRecordsWrapper } from "../ExercisingHistory.styled";
import { EmptyStateHeading } from "../ExercisingHistory.styled";

function NoHistoryRecords({ onScreenChange }) {
    return (
        <NoRecordsWrapper>
            <EmptyStateHeading style={{ padding: "30px 0 20px 0" }} fontSize={theme.fontSizes.mediumHeader}>
                No records to display
            </EmptyStateHeading>
            <Button onClick={() => onScreenChange('Exercising')}>
                Back
            </Button>
        </NoRecordsWrapper>
    )
}

export default NoHistoryRecords;