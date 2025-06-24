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
  overflow: hidden; // 👈 Дуже важливо, щоб приховати контент, коли max-height=0

  // ✅ Плавний перехід для висоти
  transition: max-height 0.3s ease-in-out;

  // ✅ Встановлюємо max-height в залежності від пропса $isOpen
  max-height: ${({ $isOpen }) => ($isOpen ? '500px' : '0')};
`;