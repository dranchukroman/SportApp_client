import React from "react";
import { StyledButton } from './Button.styled'

function Button({ children = 'Set button text', width, height, bgColor, onClick, style }) {
    return (
        <StyledButton
            width={width}
            bgColor={bgColor}
            onClick={onClick}
            style={style}
            height={height}
        >
            {children}
        </StyledButton>
    );
}

export default Button;