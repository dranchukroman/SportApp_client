import styled from "styled-components";
import theme from "../../styles/theme";

export const StyledInput = styled.input`
    // Form
    width: 100%;
    max-width: 336px;
    height: 41px;
    padding: 0 10px;

    // Fonts
    font-size: ${theme.fontSizes.largeParagraph};
    color: ${theme.colors.whiteText};
    border: 2px solid transparent; /* Прозорі бордери */
    border-radius: 7px; /* Заокруглені кути */

    // Colors
    background-image: 
        linear-gradient(
            ${theme.colors.darkBackground}, 
            ${theme.colors.darkBackground}
            ), 
        ${theme.colors.gradient};
    background-origin: border-box;
    background-clip: padding-box, border-box;
    box-shadow: ${theme.shadows.mainShadows};

    // Other
    &::placeholder {
        color: rgba(250, 250, 250, 0.7);
    }
    &:focus {
        outline: none;
        // background-image: linear-gradient(${theme.colors.darkBackground}, ${theme.colors.darkBackground}), 
        // ${theme.colors.gradient};
    }
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Для Firefox */
    &[type="number"] {
        -moz-appearance: textfield;
    }
`;