import React from "react";
import { StyledFunctionalBar, FunctionalBarWrapper } from './FunctionalBar.styled'

import Calendar from "../Calendar/Calendar";
import DivideLine from '../Dividers/DivideLine'

function FunctionalBar({ style, children, trainingPlans }) {
    return (
        <StyledFunctionalBar style={style}>
            <FunctionalBarWrapper>
                <Calendar currentPlan={trainingPlans?.find(plan => plan.is_current_plan === true)} />
                <DivideLine marginTop={'0'} marginBottom={'10px'} />
                {children}
            </FunctionalBarWrapper>
        </StyledFunctionalBar>
    )
}

export default FunctionalBar;