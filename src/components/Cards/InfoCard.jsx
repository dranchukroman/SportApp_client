import React from "react";
import { StyledCard } from './InfoCard.styled'

function Card({ style, children, onClick, paddingTop, paddingBottom, className }) {
    return (
        <StyledCard
            style={style}
            onClick={onClick}
            $paddingTop={paddingTop}
            $paddingBottom={paddingBottom}
            className={className}
        >
            {children}
        </StyledCard>
    );
};

export default Card;