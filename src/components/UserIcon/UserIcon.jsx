import React from "react";
import { StyledUserIcon } from './UserIcon.styled'

import ProfileIcon from "../../assets/icons/Main/userProfile";

function UserIcon({ onClick }) {
    return (
        <StyledUserIcon
            onClick={onClick}
        >
            <ProfileIcon />
        </StyledUserIcon>
    )
}

export default UserIcon;