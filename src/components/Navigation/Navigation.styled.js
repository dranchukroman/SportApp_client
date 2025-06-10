import styled from "styled-components";
import theme from "../../styles/theme";
import { ReactComponent as Dashboard } from "../../assets/icons/dashboard.svg";
import { ReactComponent as Training } from "../../assets/icons/trainings.svg";
import { ReactComponent as Diet } from "../../assets/icons/diet.svg";
import { ReactComponent as Calculator } from "../../assets/icons/calculator.svg";

export const StyledNavigation = styled.div`
    // Color
    background-image: ${theme.colors.gradient};

    // Form
    padding: 8px 0;
    border-radius: 40px 40px 0 0;
    width: 100%;

    // Position
    text-align: center;
`;

export const IconsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 360px;
    margin: 0 auto;
`;

export const NavigationWrapper = styled.div`
    // Color
    background-color: ${theme.colors.darkBackground};

    // Position
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 20;

    // Form
    width: 100%;
`;

export const DashboardIcon = styled(Dashboard)`
    color: ${({ $active }) => ($active ? theme.colors.darkBackground : theme.colors.whiteText)};
    transition: color ease 0.3s;
`
export const TrainingIcon = styled(Training)`
    color: ${({ $active }) => ($active ? theme.colors.darkBackground : theme.colors.whiteText)};
    transition: color ease 0.3s;
`
export const DietIcon = styled(Diet)`
    color: ${({ $active }) => ($active ? theme.colors.darkBackground : theme.colors.whiteText)};
    transition: color ease 0.3s;
`
export const CalculatorIcon = styled(Calculator)`
    color: ${({ $active }) => ($active ? theme.colors.darkBackground : theme.colors.whiteText)};
    transition: color ease 0.3s;
`