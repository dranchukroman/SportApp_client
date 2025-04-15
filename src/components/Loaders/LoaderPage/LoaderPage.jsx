import React from "react";
import { LoaderPageWrapper } from "./LoaderPage.styled";
import SingleLoader from "../SingleLoader/SingleLoader";


function LoaderPage({ isActive }){

    return (
        <LoaderPageWrapper style={{display: isActive ? 'auto' : 'none'}}>
            <SingleLoader/>
        </LoaderPageWrapper>
    )
}

export default LoaderPage;