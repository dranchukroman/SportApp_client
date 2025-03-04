import React from "react";

// If icon is active change color
function CalculatorIcon ({activeIcon, onClick}){
    return (
        <div>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
                <path d="M9 15.4C9 13.7026 9.67428 12.0747 10.8745 10.8745C12.0747 9.67428 13.7026 9 15.4 9H34.6C36.2974 9 37.9252 9.67428 39.1255 10.8745C40.3257 12.0747 41 13.7026 41 15.4V23.4H9V15.4Z" stroke={activeIcon ? '#181818' : '#EEE'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M35.4 32.2002H30.6" stroke={activeIcon ? '#181818' : '#EEE'} strokeWidth="3" strokeLinecap="round"/>
                <path d="M25 23.3999H41V34.5999C41 36.2973 40.3257 37.9252 39.1255 39.1254C37.9252 40.3256 36.2974 40.9999 34.6 40.9999H25M25 23.3999V40.9999M25 23.3999H9V34.5999C9 36.2973 9.67428 37.9252 10.8745 39.1254C12.0747 40.3256 13.7026 40.9999 15.4 40.9999H25" stroke={activeIcon ? '#181818' : '#EEE'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.6 34.5998L17 32.1998M17 32.1998L19.4 29.7998M17 32.1998L19.4 34.5998M17 32.1998L14.6 29.7998" stroke={activeIcon ? '#181818' : '#EEE'} strokeWidth="3" strokeLinecap="round"/>
            </svg>
        </div>
    )
}

export default CalculatorIcon;