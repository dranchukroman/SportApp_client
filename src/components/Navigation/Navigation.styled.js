import styled from "styled-components";
import theme from "../../styles/theme";

export const StyledNavigation = styled.div`
    // Color
    background-image: ${theme.colors.gradient};

    // Form
    padding: 8px 0;
    border-radius: 40px 40px 0 0;
    width: 100%;

    // Position
    text-align: center;
`;

export const IconsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 360px;
    margin: 0 auto;
`;

export const NavigationWrapper = styled.div`
    // Color
    background-color: ${theme.colors.darkBackground};

    // Position
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 20;

    // Form
    width: 100%;
`;