// import styled from "styled-components";
// import theme from "../../styles/theme";

// export const ScrollerWrapper = styled.div`

// `
// export const ScrollerButtons = styled.div`

// `


import styled from "styled-components";

export const ScrollerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #000;
    color: #fff;
    font-family: Arial, sans-serif;
`;

export const TimerWheel = styled.div`
    position: relative;
    width: 100px;
    height: 150px;
    overflow-y: scroll;
    text-align: center;
    margin: 10px;
    background-color: #111;
    border-radius: 10px;

    /* Ховаємо скролбар */
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const TimerLabel = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    font-size: 14px;
    color: #aaa;
    z-index: 2;
`;

export const TimerItem = styled.div`
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    color: #fff;
    transition: transform 0.2s, color 0.2s;
`;

export const ScrollerButtons = styled.div`
    display: flex;
    margin-top: 20px;

    button {
        background-color: #333;
        color: #fff;
        border: none;
        padding: 10px 20px;
        margin: 0 10px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #555;
        }
    }
`;
