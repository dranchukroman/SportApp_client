import React, { useState, useEffect } from "react";
import StyledNotFoundPage from './NotFound.styled';
import Heading from "../../../components/Headings/Heading";
import Button from "../../../components/Buttons/Button";
import FunctionalBarLoader from '../../../components/Loaders/FunctionalBarLoader/FunctionalBarLoader';
import { LoadWrapper } from "../../../components/Loaders/SingleLoader/SingleLoader.styled";

function NotFound({ children, onScreenChange }) {
    const handleGoToDashboard = () => {
        onScreenChange('Dashboard');
    }


    const [loading,] = useState(false);
    const [afterLoad, setAfterLoad] = useState(0);

    useEffect(() => setAfterLoad(1), [])

    return (
        <StyledNotFoundPage>
            {loading ? <FunctionalBarLoader /> :
                <LoadWrapper opacity={afterLoad}>
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
                </LoadWrapper>}
        </StyledNotFoundPage>
    )
}

export default NotFound;