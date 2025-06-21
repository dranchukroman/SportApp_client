import React from "react";
import { ModalProvider } from "./ModalProvider";
import { AuthProvider } from "./AuthProvider";

function AppProvider({ children }) {
    return (
        <AuthProvider>
            <ModalProvider>
                {children}
            </ModalProvider>
        </AuthProvider>
    )
}

export default AppProvider;