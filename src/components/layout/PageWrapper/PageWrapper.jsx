import React from "react";
import { StyledPageWrapper } from './PageWrapper.styled'
import { Wrapper } from "../PageWithBackground/PageWithBackground.styled";

function PageWrapper({ children, className, $bgColor }) {
    return (
        <Wrapper $bgColor={$bgColor}>
            <StyledPageWrapper className={className}>
                {children}
            </StyledPageWrapper>
        </Wrapper>
    )
}

export default PageWrapper;