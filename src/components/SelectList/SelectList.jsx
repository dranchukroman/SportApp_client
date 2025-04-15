import React from "react";
import { StyledSelect } from "./SelectList.styled";

function SelectList({ children, onChange, style, value }) {  
    return (
        <StyledSelect 
            value={value} 
            onChange={onChange}
            style={style}
        >
            {children}
        </StyledSelect>
    )
}

export default SelectList;