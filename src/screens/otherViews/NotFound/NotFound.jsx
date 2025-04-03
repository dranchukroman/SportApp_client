import React from "react";
import StyledNotFoundPage from './NotFound.styled';
import Heading from "../../../components/Headings/Heading";
import Button from "../../../components/Buttons/Button";

function NotFound({children, onScreenChange, setErrorMessage}){
    const handleGoToDashboard = () =>{
        onScreenChange('Dashboard');
    }

    return(
        <StyledNotFoundPage>
            <div
                style={{
                    padding: '30px 0 10px 0'
                }}
            >
                <Heading

                    fontSize={'23px'}
                >
                    Not found 404
                </Heading>
            </div>
            <Button
                onClick={handleGoToDashboard}
            >
                Go to Dashboard
            </Button>
            {children}
        </StyledNotFoundPage>
    )
}

export default NotFound;