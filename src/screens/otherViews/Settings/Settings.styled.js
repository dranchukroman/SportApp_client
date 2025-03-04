import styled from "styled-components";
import theme from "../../../styles/theme";

export const SettingScreen = styled.div`
    width: 360px;
    margin: 0 auto;
`

export const ButtonsGroup = styled.div`
    // Form
    width: 100%;
    border-radius: 10px;

    // Colors
    background-color: ${theme.colors.gradientBase};
    background-image: ${theme.colors.gradient};

    // Other
    box-shadow: ${theme.shadows.mainShadows};
`

// export const Button = styled.div`
//     width: 345px;
//     border-bottom: ${theme.colors.whiteText} 2px solid;
//     margin: 0 0 0 auto;
//     display: flex;
//     justify-content: space-between;
//     padding: 11px 0;
//     cursor: pointer
// `

export const Button = styled.button`
    background-color: transparent;
    width: 345px;
    display: flex;
    justify-content: space-between;
    border: none;
    border-bottom: ${theme.colors.whiteText} 2px solid;
    padding: 11px 0;
    margin: 0 0 0 auto;
    cursor: pointer
`