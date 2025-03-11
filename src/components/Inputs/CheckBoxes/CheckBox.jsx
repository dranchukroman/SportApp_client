import React from "react";
import { StyledCheckbox, StyledCheckboxWrapper, StyledCheckboxLabel } from './CheckBox.styled';


function CheckBox( onChange, style, ischecked = false){
    return (
        <StyledCheckboxWrapper style={style}>
            <StyledCheckbox
                ischecked={ischecked}
                onChange={onChange}
            />
            <StyledCheckboxLabel />
        </StyledCheckboxWrapper>
    );    
}

export default CheckBox;