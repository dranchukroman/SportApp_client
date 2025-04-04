import styled from "styled-components";
import theme from "../../styles/theme";

export const StyledHeader = styled.h1`
    // Fonts
    font-size: ${({ fontSize }) => fontSize || theme.fontSizes.largeHeader};
    font-weight: ${({ fontWeight }) => fontWeight || theme.fontWeights.largeHeader};

    // Color
    color: ${({ color }) => color || theme.colors.whiteText};

    // Other
    text-align: center;
    margin: 0;
    padding: 0;
`;