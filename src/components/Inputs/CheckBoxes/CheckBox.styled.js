import styled from "styled-components";
import theme from "../../../styles/theme";

export const StyledCheckboxWrapper = styled.div`
  display: inline-block;
  position: relative;
  height: 20px;
`;

export const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  position: absolute;
  left: 0;
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin: 0;

  &:checked + span {
    background-color: #EEE;
  }

  &:checked + span::after {
    display: block;
  }
`;

export const StyledCheckboxLabel = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: 1px solid #EEE;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    display: none;
    left: 7px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid #000;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

export const TextCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid ${theme.colors.gradientBase};
  background: ${({ isActive }) => isActive ? theme.colors.gradient : 'transparent'};
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
    background: ${({ isActive }) => isActive ? theme.colors.gradientBase : 'transparent'};
    z-index: -1;
    border-radius: 5px;
  }
`;