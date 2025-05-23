import styled from "styled-components";
import theme from "../../../styles/theme";

export const TextCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid ${theme.colors.gradientBase};
  background: ${({ $isActive }) => $isActive ? theme.colors.gradient : 'transparent'};
  cursor: pointer;
  position: relative;
  color: ${theme.colors.whiteText};
  font-size: 14px;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: ${({ $isActive }) => $isActive ? theme.colors.gradientBase : 'transparent'};
    z-index: -1;
    border-radius: 5px;
  }
`;


export const CheckBoxWrapper1 = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;

  border: 2px solid transparent; /* Прозорі бордери */
  background-image: 
      linear-gradient(
          ${theme.colors.darkBackground}, 
          ${theme.colors.darkBackground}
          ), 
      ${theme.colors.gradient};
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: ${theme.shadows.mainShadows};
`