import React, { useEffect, useState } from "react";
import StyledDiet from './Diet.styled'
import Heading from "../../../components/Headings/Heading";
import Button from "../../../components/Buttons/Button";
import FunctionalBarLoader from '../../../components/Loaders/FunctionalBarLoader/FunctionalBarLoader';
import { LoadWrapper } from "../../../components/Loaders/SingleLoader/SingleLoader.styled";

function Diet({ children, onScreenChange }) {
    const handleGoToDashboard = () => {
        onScreenChange('Dashboard');
    }

    const [loading,] = useState(false);
    const [afterLoad, setAfterLoad] = useState(0);

    useEffect(() => setAfterLoad(1), [])

    return (
        <StyledDiet>
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
                            Functionality is not available
                        </Heading>
                    </div>
                    <Button
                        onClick={handleGoToDashboard}
                    >
                        Go to Dashboard
                    </Button>
                    {children}
                </LoadWrapper>}
        </StyledDiet>
    )
}

export default Diet;