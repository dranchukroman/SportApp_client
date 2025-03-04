import styled from 'styled-components';
import theme from '../../styles/theme';

export const StyledLoginPage = styled.div`
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
`;

export const LoginPageContainer = styled.div`
    text-align: center;
    max-width: 360px;
    margin: 0 auto;
    padding-top: 75px;
`;