import React from "react";
import { StyledLine } from "./DivideLine.styled";

function DivideLine({marginTop, marginBottom, width}){
    return(
        <StyledLine 
            style={{
                marginTop: marginTop, 
                marginBottom: marginBottom,
                width: width
            }}/>
    );
};

export default DivideLine;