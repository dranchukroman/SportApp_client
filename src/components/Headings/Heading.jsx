import React from "react";
import { StyledHeader } from './Heading.styled'

function Heading({children = 'Set header text', fontSize, fontWeight, color, style}){
    return (
        <StyledHeader 
            style={style}
            fontSize={fontSize}
            fontWeight={fontWeight}
            color={color}
        >
            {children}
        </StyledHeader>
    );
}

export default Heading;