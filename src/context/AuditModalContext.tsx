import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuditModalContextType {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const AuditModalContext = createContext<AuditModalContextType | undefined>(undefined);

export const AuditModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <AuditModalContext.Provider value={{ isOpen, openModal, closeModal }}>
            {children}
        </AuditModalContext.Provider>
    );
};

export const useAuditModal = () => {
    const context = useContext(AuditModalContext);
    if (context === undefined) {
        throw new Error("useAuditModal must be used within an AuditModalProvider");
    }
    return context;
};
