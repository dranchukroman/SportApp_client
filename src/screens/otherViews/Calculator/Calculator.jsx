import React from "react";
import StyledCalculator from './Calculator.styled'
import Heading from "../../../components/Headings/Heading";
import Button from "../../../components/Buttons/Button";

function Calculator({children, onScreenChange, errorMessage, setErrorMessage}){
    const handleGoToDashboard = () =>{
        onScreenChange('Dashboard');
    }

    return(
        <StyledCalculator>
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
        </StyledCalculator>
    )
}

export default Calculator;