import React from "react";
import { StyledCard } from './InfoCard.styled'

function Card({ style, children, onClick, paddingTop, paddingBottom }) {
    return (
        <StyledCard
            style={style}
            onClick={onClick}
            $paddingTop={paddingTop}
            $paddingBottom={paddingBottom}
        >
            <div>
                {children}
            </div>
        </StyledCard>
    );
};

export default Card;