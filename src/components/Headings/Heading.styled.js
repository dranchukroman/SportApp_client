import styled from "styled-components";
import theme from "../../styles/theme";

export const StyledHeader = styled.h1`
    font-size: ${({ fontSize }) => fontSize || theme.fontSizes.largeHeader};
    font-weight: ${({ fontWeight }) => fontWeight || theme.fontWeights.largeHeader};
    color: ${({ color }) => color || theme.colors.whiteText};
    text-align: ${({ textAlign }) => textAlign || 'center'};
    margin: ${({ margin }) => margin || 0};
    padding: ${({ padding }) => padding || 0};
`;