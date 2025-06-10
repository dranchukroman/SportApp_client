import styled from "styled-components";
import theme from "../../../../../styles/theme";
import Heading from "../../../../../components/Headings/Heading";
import Input from "../../../../../components/Inputs/Input";
import CheckBox from "../../../../../components/Inputs/CheckBoxes/CheckBox";

export const IsCurrentPlanSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`

export const Paragraph = styled.div`
    color: ${theme.colors.whiteText};
    margin-right: 10px;
    fontSize: ${theme.fontSizes.largeParagraph};
    width: 188px;
`

export const TrainingDaysWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`

export const ViewHeading = styled(Heading)`
    font-size: ${theme.fontSizes.mediumHeader};

    &:not(:first-of-type) {
        margin-top: 10px;
    }
`
export const ViewInput = styled(Input)`
    margin-top: 10px;
`
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

export const StyledCheckBox = styled(CheckBox)`
    height: 20px;
`
