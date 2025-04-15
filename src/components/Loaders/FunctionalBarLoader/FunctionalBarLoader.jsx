import React from "react";
import { Loader } from "../SingleLoader/SingleLoader.styled";
import { LoaderWrapper } from "./FunctionalBarLoader.styled";

function FunctionalBarLoader({}){
    return (
        <LoaderWrapper>
            <Loader/>
        </LoaderWrapper>
    )
}

export default FunctionalBarLoader;