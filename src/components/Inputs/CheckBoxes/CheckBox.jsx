import React from "react";
import { CheckBoxWrapper1 } from './CheckBox.styled';
import {ReactComponent as CheckMark} from '../../../assets/icons/check-mark.svg'

function CheckBox({ onClick, active = false}) {
    return (
        <CheckBoxWrapper1
            onClick={onClick}
        >
            {active && <CheckMark/>}
        </CheckBoxWrapper1>
    );
}

export default CheckBox;