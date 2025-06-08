import React from "react";
import { StyledHeader } from './Heading.styled'

function Heading({ children = 'Set header text', className, fontSize, fontWeight, color, style, onClick, padding, margin, textAlign }) {
    return (
        <StyledHeader
            className={className}
            fontSize={fontSize}
            fontWeight={fontWeight}
            color={color}
            padding={padding}
            margin={margin}
            textAlign={textAlign}
            onClick={onClick}
            style={style}
        >
            {children}
        </StyledHeader>
    );
}

export default Heading;