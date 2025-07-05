import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${({$bgColor}) => $bgColor};
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
`;