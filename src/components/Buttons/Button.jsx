import React from "react";
import { StyledButton } from './Button.styled'

function Button({children = 'Set button text', width, bgColor, onClick}){
    return (
        <StyledButton 
            width={width} 
            bgColor={bgColor}
            onClick={onClick}
        >
            {children}
        </StyledButton>
    );
}

export default Button;