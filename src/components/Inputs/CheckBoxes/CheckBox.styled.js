import styled from "styled-components";
import theme from "../../../styles/theme";



export const CheckBoxWrapper = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;

  border: 2px solid transparent; /* Прозорі бордери */
  background-image: 
      linear-gradient(
          ${theme.colors.darkBackground}, 
          ${theme.colors.darkBackground}
          ), 
      ${theme.colors.gradient};
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: ${theme.shadows.mainShadows};
  cursor: pointer;
`