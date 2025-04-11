import styled, { keyframes } from 'styled-components';
import theme from "../../styles/theme";

// Анімація для плавного зникання
const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  80% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
    display: none;  // Повне приховування елемента
  }
`;

export const ToastPopUp = styled.div`
  background-color: ${theme.colors.errorBackGround};
  min-width: 200px;
  max-width: 300px;
  padding: 5px 30px 5px 30px;
  border-radius: 50px;
  text-align: center;
  color: ${theme.colors.whiteText};
  position: absolute;
  z-index: 100;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0,5;  // Початкова прозорість
  animation: ${fadeOut} 5s ease-in-out forwards;  // Анімація на 4 секунди
`;
