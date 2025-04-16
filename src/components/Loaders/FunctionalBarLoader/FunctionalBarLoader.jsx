import React from "react";
import SingleLoader from "../SingleLoader/SingleLoader";
import { LoaderWrapper } from "./FunctionalBarLoader.styled";

function FunctionalBarLoader(){
    return (
        <LoaderWrapper>
            <SingleLoader/>
        </LoaderWrapper>
    )
}

export default FunctionalBarLoader;