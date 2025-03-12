import React from "react";
import { StyledHeader } from './Heading.styled'

function Heading({children = 'Set header text', fontSize, fontWeight, color, style, onClick}){
    return (
        <StyledHeader 
            style={style}
            fontSize={fontSize}
            fontWeight={fontWeight}
            color={color}
            onClick={onClick}
        >
            {children}
        </StyledHeader>
    );
}

export default Heading;