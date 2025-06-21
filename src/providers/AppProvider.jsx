import React from "react";
import { ModalProvider } from "./ModalProvider";
import { AuthProvider } from "./AuthProvider";
import { TrainingProvider } from "./TrainingProvider";

function AppProvider({ children }) {
  return (
    <AuthProvider>
      <TrainingProvider>
        <ModalProvider>{children}</ModalProvider>
      </TrainingProvider>
    </AuthProvider>
  );
}

export default AppProvider;