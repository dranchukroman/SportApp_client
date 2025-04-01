import styled from "styled-components";
import theme from "../../../../styles/theme";

export const ExerciseFrame = styled.div`
    width: 338px;
    padding: 14px 9px;

    background-image: 
        linear-gradient(
            ${theme.colors.darkBackground}, 
            ${theme.colors.darkBackground}
            ), 
        ${theme.colors.gradient};
    background-origin: border-box;
    background-clip: padding-box, border-box;
    box-shadow: ${theme.shadows.mainShadows};

    color: ${theme.colors.whiteText};
    border: 2px solid transparent; /* Прозорі бордери */
    border-radius: 7px; /* Заокруглені кути */
`

export const FlexItems = styled.div`
    display: flex;
    justify-content: space-between;
`

export const ExerciseInfoFrame = styled.div`
    text-align: left
`

export const ExerciseName = styled.div`
    font-size: ${theme.fontSizes.smallHeader}
`

export const ExerciseParagraf = styled.div`
    font-size: ${theme.fontSizes.mediumParagraph};
    margin-top: 4px;
`

export const ControllPanel = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100px;
`

export const ExerciseHistory = styled.div`
    width: 334px;
    margin-top: 15px;
    color: ${theme.colors.whiteText};
    text-align: ${props => props.textPosition || 'center'};
    border-top: 2px solid ${theme.colors.gradientBase};
`

export const HistoryRecord = styled.div`
    font-size: ${theme.fontSizes.largeParagraph};
    padding: 5px 0 5px 7px ;
    margin: 0;
    border-bottom: 2px solid ${theme.colors.gradientBase};
`

export const RecordInfo = styled.div`
    text-align: left;
`

export const RecordDate = styled.div`
    text-align: right;
    display: flex;
`