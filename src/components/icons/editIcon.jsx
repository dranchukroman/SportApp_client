import React from "react";
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';
import theme from "../../styles/theme";

// If icon is active change color
function EditIcon({ activeIcon, style, CardStyles, editModeStatus }) {
    return (
        <div
            style={!CardStyles
                ? style
                : {
                    ...style,
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    zIndex: '100',
                    cursor: 'pointer',
                    opacity: editModeStatus ? '1' : '0',
                    pointerEvents: editModeStatus ? 'auto' : 'none',
                    transition: '0.3s opacity ease'
                }
            }
        >
            <Edit color={activeIcon ? theme.colors.darkBackground : theme.colors.whiteText}/>
        </div>
    )
}

export default EditIcon;




