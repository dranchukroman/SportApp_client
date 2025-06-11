import React from "react";
import { NoRecordsWrapper, EmptyStateHeading } from './EmptyFunctionalBar.styled'
import ControlButtonsGroup from "../../ui/ControllButtonsGroup/ControlButtonsGroup";

function EmptyFunctionalBar({ headerText, buttonText, onButtonClick, backButtonText, onBackButtonClick }) {
    return (
        <NoRecordsWrapper>
            <EmptyStateHeading>{headerText}</EmptyStateHeading>
            <ControlButtonsGroup
                firstButtonText={backButtonText}
                onFirstButtonClick={onBackButtonClick}
                secondButtonText={buttonText}
                onSecondButtonClick={onButtonClick}
            />
        </NoRecordsWrapper>
    )

}

export default EmptyFunctionalBar;