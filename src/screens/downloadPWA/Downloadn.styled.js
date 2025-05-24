import styled from "styled-components";
import theme from "../../styles/theme";

export const DownloadWrapper = styled.div`
    color: ${theme.colors.whiteText};
    text-align: center;
    max-width: 360px;
    margin: 0 auto;
    padding-top: 75px;
`

export const InfoContainer = styled.div`
    margin-top: 50px;
`

export const StepSection = styled.div`
    width: 336px;
    padding: 16px 12px;
    margin-bottom: 15px;

    color: ${theme.colors.whiteText};
    font-size: ${theme.fontSizes.ButtonCTA};
    font-weight: ${theme.fontWeights.ButtonCTA};

    background-color: ${theme.colors.gradientBase};
    background-image: ${theme.colors.gradient};
    border-radius: 16px;

    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const RingContainer = styled.div`
    min-width: 35px;
    min-height: 35px;
    border-radius: 50%;
    border: ${theme.colors.whiteText} 2px solid;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const IconWrapper = styled.div`
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center
`