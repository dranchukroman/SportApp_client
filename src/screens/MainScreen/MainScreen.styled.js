import styled from 'styled-components'
import { StyledHeader } from '../../components/Headings/Heading.styled'
import theme from '../../styles/theme'

export const MainScreenWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    text-align: center;
`

export const InfoBarWrapper = styled.div`
    display: flex;
    width: 360px;
    margin: 10px auto;
    justify-content: space-between;
    align-items: flex-end;
`

export const ScreenTitle = styled(StyledHeader)`
    color: ${theme.colors.darkBackground};
    font-size: ${theme.fontSizes.largeHeader};
`

export const SettingsContainer = styled.div`
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  max-height: ${({ $isOpen }) => ($isOpen ? '631px' : '0')};
`;