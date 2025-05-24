import React from "react";
import theme from "../../../styles/theme";

function Android3dots() {
    return (
            <div style={{
                width: 35, 
                height: 35,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <div style={{ height: 8, width: 8, marginBottom: 4, backgroundColor: theme.colors.whiteText, borderRadius: "50%"}}/>
                <div style={{ height: 8, width: 8, marginBottom: 4, backgroundColor: theme.colors.whiteText, borderRadius: "50%"}}/>
                <div style={{ height: 8, width: 8, backgroundColor: theme.colors.whiteText, borderRadius: "50%"}}/>
            </div>
    )
}

export default Android3dots;