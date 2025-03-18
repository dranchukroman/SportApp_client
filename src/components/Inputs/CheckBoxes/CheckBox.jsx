import React from "react";
import { StyledCheckbox, StyledCheckboxWrapper, StyledCheckboxLabel } from './CheckBox.styled';


function CheckBox({ onClick, style, checked }){
    return (
        <StyledCheckboxWrapper style={style}>
            <StyledCheckbox
                checked={checked}
                onClick={onClick}
            />
            <StyledCheckboxLabel />
        </StyledCheckboxWrapper>
    );    
}

export default CheckBox;