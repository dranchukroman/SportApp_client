import styled from "styled-components";

export const LoaderPageWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
    top: 0;
    backdrop-filter: blur(2px);
`