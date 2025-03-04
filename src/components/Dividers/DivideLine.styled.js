import styled from "styled-components";
import theme from "../../styles/theme";

export const StyledLine = styled.div`
    // Form
    width: 100%;
    height: 4px;
    border-radius: 2px;
    margin: 15px auto;

    // Color
    background-color: ${theme.colors.gradientBase};
    background-image: ${theme.colors.gradient};
    
    // Other
    box-shadow: ${theme.shadows.mainShadows};
`;