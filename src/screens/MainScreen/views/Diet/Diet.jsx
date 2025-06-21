import React, { useEffect, useState } from "react";
import StyledDiet from './Diet.styled'
import Heading from "../../../../components/Headings/Heading";
import Button from "../../../../components/Buttons/Button";
import FunctionalBarLoader from '../../../../components/Loaders/FunctionalBarLoader/FunctionalBarLoader';
import { LoadWrapper } from "../../../../components/Loaders/SingleLoader/SingleLoader.styled";
import { useNavigate } from "react-router-dom";

function Diet({ children }) {
    const handleGoToDashboard = () => navigate('/dashboard');

    const [loading,] = useState(false);
    const [afterLoad, setAfterLoad] = useState(0);
    const navigate = useNavigate();
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
                            onClick={handleGoToDashboard}
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