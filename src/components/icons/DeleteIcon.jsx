import React from "react";
import {ReactComponent as TrashIcon} from '../../assets/icons/trash.svg';
import theme from "../../styles/theme";

function DeleteIcon({activeIcon, style, onClick, editModeStatus, CardStyles }) {
    return (
        <div
            style={!CardStyles 
                ? style
                : {
                    position: 'absolute',
                    left: 7,
                    top: 4,
                    zIndex: '100',
                    opacity: editModeStatus ? '1' : '0',
                    pointerEvents: editModeStatus ? 'auto' : 'none',
                    transition: '0.3s opacity ease',
                    cursor: 'pointer',
                    ...style,
                }
            }
            onClick={onClick}
        >
            <TrashIcon color={activeIcon ? theme.colors.darkBackground : theme.colors.whiteText}/>
        </div>
    )
}

export default DeleteIcon;

// To work with