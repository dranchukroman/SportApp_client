import styled from "styled-components";
import theme from '../../styles/theme'

export const StyledFunctionalBar = styled.div`
    // Form
    width: 100%;
    border-radius: 40px 40px 0 0;
    padding-bottom: 60px;

    // Color
    background-color: ${theme.colors.darkBackground}
`

export const FunctionalBarWrapper = styled.div`
    text-align: center;
    max-width: 360px;
    margin: 0 auto;
`