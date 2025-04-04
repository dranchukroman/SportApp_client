import React from "react";
import { StyledFunctionalBar, FunctionalBarWrapper } from './FunctionalBar.styled'

import Calendar from "../Calendar/Calendar";
import DivideLine from '../Dividers/DivideLine'


function FunctionalBar({style, children, trainingDays}){   
    return(
        <StyledFunctionalBar 
            style={style}
        >
            <FunctionalBarWrapper>
                <Calendar trainingDays={trainingDays}/>
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