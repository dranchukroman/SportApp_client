import styled from "styled-components";
import theme from "../../../../../styles/theme";
import Card from "../../../../../components/Cards/InfoCard";
import EditIcon from "../../../../../components/icons/EditIcon/EditIcon";
import DeleteIcon from "../../../../../components/icons/DeleteIcon/DeleteIcon";
import { fadeInAnimation } from "../../../../../styles/animation";

export const FormatedCard = styled(Card)`
    margin-bottom: 14px;
    position: relative;
`
export const Paragraph = styled.p`
    margin: 0;
    padding: 0;
    opacity: 0.7;
    color: ${theme.colors.whiteText};
    font-size: ${theme.fontSizes.largeParagraph};
`

export const CardDeleteIcon = styled(DeleteIcon)`
    position: absolute;
    left: 7px;
    top: 4px;
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