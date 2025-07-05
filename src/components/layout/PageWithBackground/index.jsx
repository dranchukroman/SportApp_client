import React from "react";
import { Wrapper } from "./PageWithBackground.styled";

function PageWithBackground({ bgColor, children }) {
    return (
        <Wrapper $bgColor={bgColor}>
            {children}
        </Wrapper>
    )
}

export default PageWithBackground;