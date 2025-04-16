import styled from "styled-components";
import theme from "../../../styles/theme";

export const Loader = styled.div`
    width: 40px;
    padding: 8px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: ${theme.colors.gradientBase};
    --_m: 
      conic-gradient(#0000 10%,#000),
      linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
            mask: var(--_m);
    -webkit-mask-composite: source-out;
            mask-composite: subtract;
    animation: l3 1s infinite linear;

  @keyframes l3 {to{transform: rotate(1turn)}}
`

export const LoadWrapper = styled.div`
  opacity: ${(props) => props.opacity ?? 1};
  transition: opacity 0.3s ease;
`
