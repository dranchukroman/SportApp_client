import styled from "styled-components";
import theme from "../../../styles/theme";

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(3px); /* Блюр */
`

export const PopUp = styled.div`
    width: 300px;
    color: ${theme.colors.whiteText};
    padding: 30px 30px 15px 30px;

    background-image: 
        linear-gradient(
            ${theme.colors.darkBackground}, 
            ${theme.colors.darkBackground}
            ), 
        ${theme.colors.gradient};
    background-origin: border-box;
    background-clip: padding-box, border-box;
    box-shadow: ${theme.shadows.mainShadows};
    border: 2px solid transparent; /* Прозорі бордери */
    border-radius: 7px; /* Заокруглені кути */

    h1 {
        text-align: center;
    }
`

export const ButtonsWrapper = styled.div`
    margin-top: 30px;

    button {
        margin-top: 10px;
    }
`