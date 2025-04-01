import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";

function CrossIcon({ width = '30px', color = theme.colors.whiteText, onClick }) {
    return (
        <CrossWrapper width={width} onClick={onClick}>
            <VerticalElement width={width} color={color} />
            <HorizontalElement width={width} color={color} />
        </CrossWrapper>
    );
}

const CrossWrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.width};
    position: relative;
    cursor: pointer;
`;

const VerticalElement = styled.div`
    position: absolute;
    width: calc(${props => props.width} * 0.10);
    height: ${props => props.width};
    background-color: ${props => props.color || theme.colors.whiteText};
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    border-radius: 3px;
`;

const HorizontalElement = styled.div`
    position: absolute;
    width: ${props => props.width};
    height: calc(${props => props.width} * 0.10);
    background-color: ${props => props.color || theme.colors.whiteText};
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    border-radius: 3px;
`;

export default CrossIcon;