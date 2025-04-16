import styled from "styled-components";

export const LoaderPageWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
    top: 0;
    backdrop-filter: blur(2px);
`