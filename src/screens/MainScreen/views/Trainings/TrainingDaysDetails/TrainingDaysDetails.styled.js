import styled from "styled-components";
import theme from "../../../../../styles/theme";
import Heading from "../../../../../components/Headings/Heading";
import Input from "../../../../../components/Inputs/Input";

export const ViewHeading = styled(Heading)`
    font-size: ${theme.fontSizes.mediumHeader};

    &:not(:first-of-type) {
        margin-top: 10px;
    }
`

export const ViewInput = styled(Input)`
    margin-top: 10px;
`