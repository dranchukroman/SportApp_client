import React from "react";
import theme from "../../styles/theme";

function CheckMark() {

    return (
        <svg width="23" height="30" viewBox="0 0 31 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.7251 3.74457L17.2251 26.2446C15.6076 29.1571 11.2351 26.7296 12.8551 23.8146L25.3551 1.31457C26.9726 -1.59793 31.3451 0.829572 29.7251 3.74457Z" fill={theme.colors.whiteText} />
            <path d="M4.10259 13.0796L16.6026 23.0796C19.2026 25.1596 16.0801 29.0646 13.4776 26.9796L0.977588 16.9796C-1.62241 14.8996 1.50009 10.9946 4.10259 13.0796Z" fill={theme.colors.whiteText} />
        </svg>
    )
}

export default CheckMark;