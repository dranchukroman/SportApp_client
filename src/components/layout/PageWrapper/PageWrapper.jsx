import React from "react";
import { StyledPageWrapper } from './PageWrapper.styled'

function PageWrapper({ children, className }) {
    return (
        <StyledPageWrapper className={className}>
            {children}
        </StyledPageWrapper>
    )
}

export default PageWrapper;