import styled from "styled-components";
import theme from "../../styles/theme";

export const StyledCard = styled.div`
    /* Form */
    width: 100%;
    padding-top: ${(props) => props.$paddingTop || '40px'};
    padding-bottom: ${(props) => props.$paddingBottom || '40px'};
    border-radius: 16px;

    /* Position */
    text-align: center;
    margin: 0 auto;

    /* Color */
    background-color: ${theme.colors.gradientBase};
    background-image: ${theme.colors.gradient};
    font-size: ${theme.fontSizes.smallHeader};

    /* Other */
    box-shadow: ${theme.shadows.mainShadows};
`;