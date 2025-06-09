import React from "react";
import { NoRecordsWrapper, EmptyStateHeading } from './EmptyFunctionalBar.styled'
import theme from "../../../styles/theme";
import Button from "../../Buttons/Button";

function EmptyFunctionalBar({ headerText, buttonText, onButtonClick }) {
    return (
        <NoRecordsWrapper>
            <EmptyStateHeading fontSize={theme.fontSizes.mediumHeader}>
                {headerText}
            </EmptyStateHeading>
            <Button onClick={onButtonClick}>
                {buttonText}
            </Button>
        </NoRecordsWrapper>
    )

}

export default EmptyFunctionalBar;