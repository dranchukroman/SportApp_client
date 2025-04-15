import styled from "styled-components";
import theme from "../../../../styles/theme";

export const TrainingDetailsWrapper = styled.div`
    input {
        margin-top: 10px;
    }
    h1:not(:first-of-type) {
        margin-top: 10px;
    }
    h1 {
        font-size: ${theme.fontSizes.mediumHeader};
    }
`

export const IsCurrentPlanWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`

export const Paragraph = styled.div`
    color: ${theme.colors.whiteText};
    margin-right: 10px;
    fontSize: ${theme.fontSizes.largeParagraph};
    width: 188px;
`

export const TrainingDaysWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`