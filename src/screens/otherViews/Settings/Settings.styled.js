import styled from "styled-components";
import theme from "../../../styles/theme";

export const SettingScreen = styled.div`
    width: 360px;
    margin: 0 auto;
`;

export const ButtonsGroup = styled.div`
    width: 100%;
    border-radius: 10px;
    background-color: ${theme.colors.gradientBase};
    background-image: ${theme.colors.gradient};
    box-shadow: ${theme.shadows.mainShadows};
`;

export const Button = styled.button`
    background-color: transparent;
    width: 345px;
    display: flex;
    justify-content: space-between;
    border: none;
    border-bottom: ${theme.colors.whiteText} 2px solid;
    padding: 11px 0;
    margin: 0 0 0 auto;
    cursor: pointer;
`;

export const SettingInput = styled.input`
    background: transparent;
    width: 100%;
    height: 30px;
    border: none;
    margin-right: 15px;
    font-size: ${theme.fontSizes.largeParagraph};
    color: ${theme.colors.whiteText};

    &::placeholder {
        color: rgba(250, 250, 250, 0.7);
    }
    &:focus {
        outline: none;
    }
`;