import React from "react";
import StyledDiet from './Diet.styled'
import Heading from "../../../components/Headings/Heading";
import Button from "../../../components/Buttons/Button";

function Diet({children, onScreenChange, setErrorMessage}){
    const handleGoToDashboard = () =>{
        onScreenChange('Dashboard');
    }

    return(
        <StyledDiet>
            <div
                style={{
                    padding: '30px 0 10px 0'
                }}
            >
                <Heading

                    fontSize={'23px'}
                >
                    Functionality is not available
                </Heading>
            </div>
            <Button
                onClick={handleGoToDashboard}
            >
                Go to Dashboard
            </Button>
            {children}
        </StyledDiet>
    )
}

export default Diet;