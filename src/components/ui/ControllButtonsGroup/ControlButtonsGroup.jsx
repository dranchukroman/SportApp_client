import React from "react";
import Button from "../../Buttons/Button";
import { ButtonsWrapper, ControlButton } from "./ControlButtonsGroup.styled";
function ControlButtonsGroup({ firstButtonText, onFirstButtonClick, secondButtonText, onSecondButtonClick }) {

    return (
        <ButtonsWrapper $isTwoButtons={!!onFirstButtonClick} >
            {onFirstButtonClick &&
                <ControlButton onClick={onFirstButtonClick}>
                    {firstButtonText}
                </ControlButton>
            }
            <ControlButton onClick={onSecondButtonClick}>
                {secondButtonText}
            </ControlButton>
        </ButtonsWrapper>
    )
}

export default ControlButtonsGroup