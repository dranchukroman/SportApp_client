import React from "react";
import { CheckBoxWrapper1 } from './CheckBox.styled';
import CheckMark from '../../../assets/icons/CheckMark'

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