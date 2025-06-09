import React from "react";
import { ReactComponent as Edit } from '../../../assets/icons/edit.svg';
import theme from "../../../styles/theme";

// If icon is active change color
function EditIcon({ activeIcon, onClick, className }) {
    return (
        <Edit
            color={activeIcon ? theme.colors.darkBackground : theme.colors.whiteText}
            className={className}
            onClick={onClick}
        />
    )
}

export default EditIcon;