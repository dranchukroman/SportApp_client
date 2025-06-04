import styled from "styled-components";
import theme from "../../styles/theme";

export const StepCounterWrapper = styled.div`
    width: ${({width}) => width || '100%'};
    margin: 0 auto;
    padding-top: 20px;
`

export const StepWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    margin-bottom: 10px;
`

export const RingContainer = styled.div`
    height: 57px;
    min-width: 57px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom:
`

export const StepRing = styled.div`
    min-width: ${({ $active }) => $active ? '55px' : '35px'};
    height: ${({ $active }) => $active ? '55px' : '35px'};
    color: ${theme.colors.whiteText};
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid transparent;
    border-radius: 50%;

    transition: all 0.3s ease;

    ${({ $previous }) => $previous ? `
        background-color: ${theme.colors.gradientBase};
        background-image: ${theme.colors.gradient};
    ` : `
        background-image: 
        linear-gradient(${theme.colors.darkBackground}, ${theme.colors.darkBackground}), 
        ${theme.colors.gradient};
        background-clip: padding-box, border-box;
    `}

    background-origin: border-box;
`

export const StepLine = styled.div`
    height: 5px;
    width: 100%;
    margin: 0 2%;
    border-radius: 3px;
    background-color: ${theme.colors.gradientBase};
    background-image: ${theme.colors.gradient};
`