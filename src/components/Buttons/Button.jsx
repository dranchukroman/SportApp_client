import React from "react";
import { StyledButton } from './Button.styled'

function Button({ children = 'Set button text', width, bgColor, onClick, style }) {
    return (
        <div
            style={style}
        >
            <StyledButton
                width={width}
                bgColor={bgColor}
                onClick={onClick}
            >
                {children}
            </StyledButton>
        </div>
    );
}

export default Button;