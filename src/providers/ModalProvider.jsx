import React, { useState, useContext } from "react";
import { createContext } from "react";

export const ModalContext = createContext(null)

export function ModalProvider({ children }) {
    const [modalConfig, setModalConfig] = useState({ isVisible: false });

    const showModal = (config) => setModalConfig({ ...config, isVisible: true });
    const hideModal = () => setModalConfig(prev => ({ ...prev, isVisible: false }));
    const value = { modalConfig, showModal, hideModal };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};