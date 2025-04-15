import styled from "styled-components";
import theme from "../../../../styles/theme";
import Heading from "../../../../components/Headings/Heading";

export const ExerciseDetailsWrapper = styled.div`
    h1 {
        font-size: ${theme.fontSizes.mediumHeader};
    }
    h1:not(:first-of-type) {
        margin-top: 10px;
    }
    input, select {
        margin-top: 10px;
    }

    .timer-input {
        width: 145px;
        height: 70px;
        text-align: center;
    }
`

export const DivideTimerDots = styled(Heading)`

`

export const TimerWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`