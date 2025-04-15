import React from "react";
import { StyledCheckbox, StyledCheckboxWrapper, StyledCheckboxLabel } from './CheckBox.styled';


function CheckBox({ onClick, style, checked }) {
    return (
        <StyledCheckboxWrapper 
            style={style}
            onClick={onClick}>
            <StyledCheckbox
                checked={checked}
            />
            <StyledCheckboxLabel />
        </StyledCheckboxWrapper>
    );
}

export default CheckBox;