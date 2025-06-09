import React from "react";
import { StyledUserIcon } from './UserIcon.styled'

import { ReactComponent as ProfileIcon } from "../../assets/icons/user-profile.svg";

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