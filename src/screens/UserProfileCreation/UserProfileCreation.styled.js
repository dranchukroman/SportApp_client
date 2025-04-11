

import styled from 'styled-components';
import theme from '../../styles/theme';

export const StyledCreateProfile = styled.div`
    backgroun-color: ${theme.colors.darkBackground};

    p {
        color: ${theme.colors.whiteText};
    }

    a {
        color: ${theme.colors.primary}; /* Колір тексту посилання */
        text-decoration: none; /* Прибирає підкреслення */
        cursor: pointer;

        &:hover {
            text-decoration: underline; /* Підкреслення при наведенні */
            color: ${theme.colors.gradientBase}; /* Зміна кольору при наведенні */
        }
    }
    
    input, select {
        margin-bottom: 10px;
    }
`;

export const CreateProfileContainer = styled.div`
    text-align: center;
    max-width: 360px;
    margin: 0 auto;
    padding-top: 75px;
`;

export const StyledSelect = styled.select`
    // Form
    width: 100%;
    max-width: 360px;
    height: 45px;
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
`;

export const UserDataWrapper = styled.div`
    display: flex;
    justify-content: center;

    margin: 0 auto;

    div {
        // text-align: left;
    }

    p {
        padding-bottom: 5px;
    }

    span {
        font-weight: ${theme.fontWeights.mediumHeader};
        font-size: ${theme.fontSizes.smallHeader}
    }
`