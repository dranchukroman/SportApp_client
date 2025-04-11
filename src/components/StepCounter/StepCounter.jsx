import React from "react";
import { StepCounterWrapper, StepWrapper, StepRing, StepLine, RingContainer } from './StepCounter.styled'
import Heading from "../Headings/Heading";

function StepCounter({ stepCount = 1, width, headersArray = [], activeStep = 1 }) {

    const fetchSteps = () => {
        const steps = []
        for (var i = 0; i < stepCount; i++) {
            const countIndex = i + 1;
            const active = activeStep === countIndex;
            const previous = activeStep != countIndex && countIndex < activeStep
            steps.push(
                <RingContainer>
                    <StepRing active={active} previous={previous}>
                        <Heading>{countIndex}</Heading>
                    </StepRing>
                </RingContainer>)
            if (countIndex != stepCount) {
                steps.push(<StepLine />)
            }
        }
        return steps;
    }

    return (
        <StepCounterWrapper width={width}>
            <StepWrapper>
                {fetchSteps()}
            </StepWrapper>
            <Heading>{headersArray[activeStep - 1] || 'No header to set'}</Heading>
        </StepCounterWrapper>
    );
}

export default StepCounter;