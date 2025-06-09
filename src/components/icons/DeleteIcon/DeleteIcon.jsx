import React from "react";
import { ReactComponent as TrashIcon } from '../../../assets/icons/trash.svg';
import theme from "../../../styles/theme";

function DeleteIcon({ activeIcon, onClick, className }) {
    return (
        <TrashIcon
            color={activeIcon ? theme.colors.darkBackground : theme.colors.whiteText}
            className={className}
            onClick={onClick}
        />
    )
}

export default DeleteIcon;