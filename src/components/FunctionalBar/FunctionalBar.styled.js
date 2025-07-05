import styled from "styled-components";
import theme from '../../styles/theme'

export const StyledFunctionalBar = styled.div`
    width: 100%;
    height: ${({ $height }) => ($height + 'px')};
    border-radius: 40px 40px 0 0;
    padding-bottom: 60px;
    position: absolute;
    top: ${({ $top }) => ($top + 'px')};
    transition: top 0.3s ease-in-out;
    z-index: 1;

    background-color: ${theme.colors.darkBackground}
`

export const FunctionalBarWrapper = styled.div`
    text-align: center;
    max-width: 360px;
    margin: 0 auto;
`

export const ScrollContainer = styled.div`
    height: ${({ $scrollHeight }) => ($scrollHeight + 'px')};
    overflow-y: scroll;
    overflow-x: hidden;
`

export const ChildrenContainer = styled.div`
    margin: 10px 0;
`

