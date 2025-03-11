import React from "react";
import axios from "axios";

import Heading from "../../../../components/Headings/Heading";
import Input from "../../../../components/Inputs/Input";
import Button from "../../../../components/Buttons/Button";
import ChooseImageIcon from "../../../../assets/icons/ChooseImageIcon";

function SetUpTrainingDays({ token, onScreenChange}){

    return (
        <div>
            <Heading>
                SetUpTrainingDays
            </Heading>
        </div>
    );
}

export default SetUpTrainingDays;