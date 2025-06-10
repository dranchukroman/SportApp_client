import React from "react";
import { NoRecordsWrapper, EmptyStateHeading } from './EmptyFunctionalBar.styled'
import theme from "../../../styles/theme";
import Button from "../../Buttons/Button";
import ControlButtonsGroup from "../../ui/ControllButtonsGroup/ControlButtonsGroup";

function EmptyFunctionalBar({ headerText, buttonText, onButtonClick, backButtonText, onBackButtonClick }) {
    return (
        <NoRecordsWrapper>
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