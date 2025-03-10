import React from "react";
import { StyledCheckbox, StyledCheckboxWrapper, StyledCheckboxLabel } from './CheckBox.styled';


function CheckBox( onChange, style, isChecked = false){
    return (
        <StyledCheckboxWrapper style={style}>
            <StyledCheckbox
                isChecked={isChecked}
                onChange={onChange}
            />
            <StyledCheckboxLabel />
        </StyledCheckboxWrapper>
    );    
}

export default CheckBox;