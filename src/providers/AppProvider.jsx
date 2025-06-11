import React from "react";
import { ModalProvider } from "./ModalProvider";

function AppProvider({ children }) {
    return (
        <ModalProvider>
            {children}
        </ModalProvider>
    )
}

export default AppProvider;