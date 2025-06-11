import styled from "styled-components";
import theme from "../../../../../styles/theme";
import EditIcon from "../../../../../components/icons/EditIcon/EditIcon";
import DeleteIcon from "../../../../../components/icons/DeleteIcon/DeleteIcon";
import Card from "../../../../../components/Cards/InfoCard";
import Heading from "../../../../../components/Headings/Heading";
import { fadeInAnimation } from "../../../../../styles/animation";

export const FormattedCard = styled(Card)`
    margin-bottom: 14px;
    position: relative;
    padding: 20px 0;
    text-align: left;
    color: ${theme.colors.whiteText}
`

export const ExerciseDataWrapper = styled.div`
    margin-left: 20px;
`
export const ExerciseHeader = styled(Heading)`
    font-size: ${theme.fontSizes.smallHeader};
    text-align: left;
    margin: 0;
`
export const ExerciseParagraph = styled.p`
    font-size: ${theme.fontSizes.largeParagraph};
    margin: 0;
`

export const CardDeleteIcon = styled(DeleteIcon)`
    position: absolute;
    right: 7px;
    bottom: 4px;
    z-index: 2;
    cursor: pointer;
    ${fadeInAnimation}
`
export const CardEditIcon = styled(EditIcon)`
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
    cursor: pointer;
    ${fadeInAnimation}
`