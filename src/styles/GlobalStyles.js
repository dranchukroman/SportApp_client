import { createGlobalStyle } from 'styled-components';
import theme from './theme';

export const GlobalStyles = createGlobalStyle`
  body {
    /* Fonts !!!not working!!! */
    font-family: ${theme.fonts.primaryFont}
    
  }
`;