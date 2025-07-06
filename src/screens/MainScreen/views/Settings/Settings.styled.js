import styled from "styled-components";
import theme from "../../../../styles/theme";

export const SettingWrapper = styled.div`
    width: 360px;
    margin: 0 auto;
`;

export const ScrollWrapper = styled.div`
    height: ${({ height }) => (height + 'px')};
    overflow: scroll;
    padding-right: 10px;
`

export const CtaWrapper = styled.div`
    background-color: transparent;
    width: 345px;
    display: flex;
    justify-content: center;
    border: none;
    border-bottom: ${theme.colors.whiteText} 2px solid;
    padding: 11px 0;
    cursor: pointer;

    &:last-child {
        border: none;
    }
`

export const Section = styled.div`
    width: 100%;
    border-radius: 10px;
    background-color: ${theme.colors.gradientBase};
    background-image: ${theme.colors.gradient};
    box-shadow: ${theme.shadows.mainShadows};

    &:first-of-type {
        ${CtaWrapper} {
            justify-content: flex-start;
            margin-left: 5px;
        }
    }

    &:last-of-type {
        background: #C84B31;
        background: linear-gradient(180deg,rgba(200, 75, 49, 1) 0%, rgba(158, 12, 14, 1) 66%, rgba(63, 0, 1, 1) 100%);
    }
`;

export const SettingInput = styled.input`
    background: transparent;
    width: 100%;
    height: 30px;
    border: none;
    margin-right: 15px;
    font-size: ${theme.fontSizes.largeParagraph};
    color: ${theme.colors.whiteText};

    &::placeholder {
        color: rgba(250, 250, 250, 0.7);
    }
    &:focus {
        outline: none;
    }
`;

export const SelectForm = styled.div`
    display: flex;
    justify-content: left;
    gap: 10px;
`

export const SelectLabel = styled.div`
    font-size: ${theme.fontSizes.largeParagraph};
    color: ${theme.colors.whiteText};
`

export const SelectList = styled.select`
    background-color: transparent;
    border: none;
    color: ${theme.colors.whiteText};
    font-size: ${theme.fontSizes.largeParagraph};
`

export const Paragraf = styled.p`
    font-size: ${theme.fontSizes.largeParagraph};
    font-weight: ${theme.fontWeights.mediumHeader}; //
    color: ${theme.colors.whiteText};
    margin: 0;
    padding: 0;
`