import React from "react";
import { StyledFunctionalBar, FunctionalBarWrapper, ScrollContainer, ChildrenContainer } from './FunctionalBar.styled'
import Calendar from "../Calendar/Calendar";
import DivideLine from '../Dividers/DivideLine'

import useCurrentTrainingPlan from "../../hooks/useCurrentTrainingPlan";

function FunctionalBar({ children, height, topPosition, scrollHeight }) {
    const currentPlan = useCurrentTrainingPlan();
    
    return (
        <StyledFunctionalBar $height={height} $top={topPosition}>
            <FunctionalBarWrapper>
                <Calendar currentPlan={currentPlan} />
                <DivideLine marginTop={'0'} marginBottom={'0px'} />
                <ScrollContainer $scrollHeight={scrollHeight}>
                    <ChildrenContainer>
                        {children}
                    </ChildrenContainer>
                </ScrollContainer>
            </FunctionalBarWrapper>
        </StyledFunctionalBar>
    )
}

export default FunctionalBar;