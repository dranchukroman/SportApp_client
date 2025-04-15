

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