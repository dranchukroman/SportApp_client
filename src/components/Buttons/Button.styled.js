import styled from "styled-components";
import theme from "../../styles/theme";

export const StyledButton = styled.button`
    /* Form */
    width: ${({ width }) => width || '100%'};
    height: ${({ height }) => height || '45px'};
    border-radius: 7px;
    border: none;

    /* Color */
    background-color: ${({ bgColor }) => bgColor || theme.colors.gradientBase};
    background-image: ${({ bgColor }) => bgColor ? 'none': theme.colors.gradient};

    /* Fonts */
    color: ${theme.colors.whiteText};
    font-size: ${theme.fontSizes.ButtonCTA};
    font-weight: ${theme.fontWeights.ButtonCTA};

    /* Other */
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    ${theme.shadows.mainShadows};

    &:hover{
        /* here should be hover */
    }
`;