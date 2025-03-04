import React from "react";
import { StyledFunctionalBar, FunctionalBarWrapper } from './FunctionalBar.styled'

import Calendar from "../Calendar/Calendar";
import DivideLine from '../Dividers/DivideLine'


function FunctionalBar({style, children}){   
    return(
        <StyledFunctionalBar 
            style={style}
        >
            <FunctionalBarWrapper>
                <Calendar/>
                <DivideLine 
                    marginTop={'0'}
                    marginBottom={'10px'}
                />
                {children}
            </FunctionalBarWrapper>
        </StyledFunctionalBar>
    )
}

export default FunctionalBar;