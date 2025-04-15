import React from "react";

// If icon is active change color
function EditIcon ({activeIcon, onClick, style, CardStyles, editModeStatus}){
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
            <svg width="45" height="45" viewBox="0 0 45 45" fill='none' xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
                <path d="M12.7058 14.9409H10.9706C10.0501 14.9409 9.16736 15.3066 8.51651 15.9574C7.86565 16.6083 7.5 17.491 7.5 18.4115V34.029C7.5 34.9495 7.86565 35.8322 8.51651 36.4831C9.16736 37.134 10.0501 37.4996 10.9706 37.4996H26.5881C27.5086 37.4996 28.3913 37.134 29.0422 36.4831C29.693 35.8322 30.0587 34.9495 30.0587 34.029V32.2937" stroke={activeIcon ? '#181818' : '#EEE'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M28.3234 11.4708L33.5293 16.6766M35.9326 14.2212C36.6161 13.5377 37 12.6108 37 11.6443C37 10.6778 36.6161 9.75082 35.9326 9.06738C35.2492 8.38395 34.3222 8 33.3557 8C32.3892 8 31.4623 8.38395 30.7788 9.06738L16.1764 23.6177V28.8236H21.3823L35.9326 14.2212Z" stroke={activeIcon ? '#181818' : '#EEE'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
    )
}

export default EditIcon;





