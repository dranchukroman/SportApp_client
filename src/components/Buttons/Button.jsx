import React from "react";
import { StyledButton } from './Button.styled'

function Button({ children = 'Set button text', width, height, bgColor, onClick, style }) {
    return (
        <div
            style={style}
            height={height}
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